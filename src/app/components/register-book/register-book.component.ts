import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/interfaces/book';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})
export class RegisterBookComponent implements OnInit {

  @Output() data = new EventEmitter<Book>();
  @Input() bookSelected!: Book;

  fileSelect: any;
  image!: File;
  formBook: FormGroup;
  isLoad: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notiService: NotificationsService
  ) {
    this.formBook = this.inititalForm();
  }

  ngOnInit(): void {
    this.formBook.patchValue(this.bookSelected);
  }
  inititalForm(){
    return this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
    })
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
    this.data.emit({...this.formBook.value, image: this.image});
    this.formBook.reset();
  }

}
