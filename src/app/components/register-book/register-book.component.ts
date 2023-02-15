import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/servicios/book.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})
export class RegisterBookComponent implements OnInit {

  @Output() _data = new EventEmitter<Book>();

  fileSelect: any;
  image!: File;
  formBook: FormGroup;
  isLoad: boolean = false;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notiService: NotificationsService,
    private bookService: BookService
  ) {
    this.formBook = this.inititalForm();
  }

  ngOnInit(): void {
    this.bookService.selected$.subscribe((b) =>  {
      this.formBook.patchValue(b); 
      this.fileSelect = b.url_libro;
      this.isEdit = true;
    });
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
    if(!this.formBook.valid) return this.notiService.showAlertError("Campos requeridos");
    if(this.isEdit){
      this._data.emit({...this.formBook.value, image: this.image, url_libro: this.fileSelect,isUpdate:true});
    }else{
      this._data.emit({...this.formBook.value, image: this.image, url_libro: this.fileSelect});
    }
    this.formBook.reset();
  }

}
