import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/servicios/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  @Input() listBook!: Book[];
  @Output() _deleteBook = new EventEmitter<Book>();
  @Output() _updateBook = new EventEmitter<Book>();



  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    
  }

  deleteBook(book: Book){
    this._deleteBook.emit(book);
  }
  updateBook(book: Book){
    this._updateBook.emit(book);
  }

}
