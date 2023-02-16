import { Component, OnInit } from '@angular/core';
import { Lend } from 'src/app/interfaces/Lend';
import { BookService } from 'src/app/servicios/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookLend:Lend[] = [];

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBookLend()
  }
  getBookLend(){
    this.bookService.bookLend(1).subscribe({
      next:(res)=>{
        this.bookLend = res;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
