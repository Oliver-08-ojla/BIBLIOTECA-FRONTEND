import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/servicios/book.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  listBook: Book[] = [];
  fileSelect: any;
  image!: File;
  formBook: FormGroup;
  isLoad: boolean = false;
  isEdit: boolean = false;
  nombreFilter: any;

  constructor(
    private fb: FormBuilder,
    private notiService: NotificationsService,
    private bookService: BookService
  ) {
    this.formBook = this.inititalForm();
  }
  ngOnInit(): void {
    this.getListBook();
  }

  inititalForm(){
    return this.fb.group({
      id:[],
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
    });
  }

  obtenerImagen(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.fileSelect = reader.result;
    };
    this.image = file;
  }

  registerBook(){
    if(!this.formBook.valid) return
    this.isLoad = true;
    if(this.isEdit){
      this.updateBook({...this.formBook.value,image: this.image, url_libro: this.fileSelect });
    }else{
      this.listBook.push({...this.formBook.value,url_libro: this.fileSelect});
      this.bookService.registerBook({...this.formBook.value, image: this.image}).subscribe({
        next:(res) => {
          this.notiService.showAlertSuccess(res.message);
          this.isLoad = false;
          this.formBook.reset();
          this.fileSelect = "";
        },
        error:(err) => {          
          this.notiService.showAlertError(err.message);
          this.isLoad = false;
        }
      });
    }
  }
  getListBook(){
    this.bookService.getBook().subscribe({
      next:(res) => this.listBook = res,
      error:(err) => this.notiService.showAlertError(err.message)
    });
  }
  deleteBook(book: Book){
    this.isLoad = true;
    this.listBook = this.listBook.filter( b => b.id != book.id);
    this.bookService.deleteBook(book.id).subscribe({
      next:(res) => {
        this.notiService.showAlertSuccess(res.message);
        this.isLoad = false;
        this.fileSelect = "";
      },
      error:(err) => {
        this.notiService.showAlertError(err.message);
        this.isLoad = false;
      }
    })
  }
  editBook(book: Book){
    this.formBook.patchValue(book);
    this.fileSelect = book.url_libro;
    this.isEdit = true;
  }
  updateBook(book: Book){
    if(!book.id) return
    this.isLoad = true;
    const index = this.listBook.findIndex(b => b.id == book.id)
    this.listBook[index] = book;
    this.bookService.updateBook(book).subscribe({
      next:(res) => {
        this.notiService.showAlertSuccess(res.message);
        this.isLoad = false;
        this.formBook.reset();
        this.fileSelect = "";
      },
      error:(err) => {
        console.log(err);
        this.notiService.showAlertError(err.message);
        this.isLoad = false;
      }
    });
  }
  cancel(){
    this.formBook.reset();
    this.isLoad = false;
    this.isEdit = false;
    this.fileSelect = "";
  }

}
