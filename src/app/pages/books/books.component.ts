import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/servicios/book.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  listBook: Book [] = [];
  isLoad: boolean = false;
  bookSelectd!: Book;
  
  constructor(
    private bookService: BookService,
    private notiService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.getBook();
  }
  getBook(){
    this.bookService.getBook().subscribe({
      next:(res) => this.listBook = res,
      error:(err) => console.log(err)
    });
  }
  registerBook(book: Book){
    if(!book) return 
    this.listBook.push(book);
    this.isLoad = true;
    this.bookService.registerBook(book).subscribe({
      next:(res) => {
        this.notiService.showAlertSuccess(res.message);
        this.isLoad = false;
      },
      error:(err) => {
        this.notiService.showAlertError(err.error.message);
        this.isLoad = false;
      }
    })
  }
  deleteBook(book: Book){
    if(!book.id) return
    this.listBook = this.listBook.filter( b => b.id != book.id);
    this.bookService.deleteBook(book.id).subscribe({
      next:(res) => this.notiService.showAlertSuccess(res.message),
      error:(err) => this.notiService.showAlertError(err.error.message)
    });
  }
  updateBook(book: Book){
    if(!book.id) return
    this.bookSelectd = book;
    const index = this.listBook.findIndex( b => b.id == book.id);
    const newTodo = [...this.listBook];
    this.listBook[index] = book;
    console.log(this.bookSelectd);
  }

}
