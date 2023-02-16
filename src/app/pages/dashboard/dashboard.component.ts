import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/interfaces/Auth';
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
  listBookLendAll: Lend[] = [];

  constructor(
    private bookService: BookService,
    private authService: AutentificacionService
  ) { }

  rol!: string;
  ngOnInit(): void {
    this.getBookLend()
    this.getBookLendAll();
  }
  getBookLend(){
    const user = this.authService.getUser();
    this.rol = this.authService.getRol();
    this.bookService.getBookLend(user.id).subscribe({
      next:(res)=>{
        this.bookLend = res;
      },
      error:(err) => {
        console.log(err);
      }
    });
  }
  getBookLendAll(){
    this.bookService.getBooksLendAll().subscribe({
      next:(res)=>{
        this.listBookLendAll = res;
        console.log(res);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
