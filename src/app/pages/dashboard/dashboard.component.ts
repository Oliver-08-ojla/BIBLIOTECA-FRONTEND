import { Component, OnInit } from '@angular/core';
import { Lend } from 'src/app/interfaces/Lend';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { BookService } from 'src/app/servicios/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookLend:Lend[] = [];

  constructor(
    private bookService: BookService,
    private authService: AutentificacionService
  ) { }

  ngOnInit(): void {
    this.getBookLend()
  }
  getBookLend(){
    const user = this.authService.getUser();
    this.bookService.bookLend(user.id).subscribe({
      next:(res)=>{
        this.bookLend = res;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
