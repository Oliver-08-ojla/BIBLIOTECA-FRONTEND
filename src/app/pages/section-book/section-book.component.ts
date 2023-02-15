import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { BookService } from 'src/app/servicios/book.service';
import { LendService } from 'src/app/servicios/lend.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-section-book',
  templateUrl: './section-book.component.html',
  styleUrls: ['./section-book.component.css']
})
export class SectionBookComponent implements OnInit {

  formLend: FormGroup;
  listBook: Book[] = [];
  nombreFilter: any;
  selectedBook!: Book;
  isLoad: boolean = false;
  closeModal: boolean = false;
  
  constructor(
    private bookService: BookService,
    private fb: FormBuilder,
    private lendService: LendService,
    private notiService: NotificationsService,
    private authService: AutentificacionService
  ) {
    this.formLend = this.initialFormLend();
  }

  ngOnInit(): void {
    this.getListBook();
  }
  initialFormLend(){
    return this.fb.group({
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion:['', Validators.required]
    });
  }
  getListBook(){
    this.bookService.getBook().subscribe({
      next:(res) => this.listBook = res,
      error:(err) => console.log(err)
    })
  }
  lendBook(book: Book){
    this.selectedBook = book;
  }
  register(){
    const usuario = this.authService.getUser();
   
    if(!this.formLend.valid) return this.notiService.showAlertSuccess("campos requeridos");
    this.lendService.registerLend({...this.formLend.value, libro: this.selectedBook,usuario_id:usuario.id }).subscribe({
      next:(res) => {
        this.notiService.showAlertSuccess(res.message);
        this.isLoad = false;
        this.formLend.reset();
        console.log(res);
      },
      error:(err) => {
        console.log(err);
        this.notiService.showAlertError(err.message);
        this.isLoad = false;
      }
    });
    this.closeModal = true;
    
  }
}
