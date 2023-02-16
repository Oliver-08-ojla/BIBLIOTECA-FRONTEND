import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/interfaces/Auth';
import { Lend } from 'src/app/interfaces/Lend';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { BookService } from 'src/app/servicios/book.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookLend:Lend[] = [];
  listBookLendAll: Lend[] = [];
  isLoad: boolean = false;

  constructor(
    private bookService: BookService,
    private authService: AutentificacionService,
    private notiService: NotificationsService,
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
    });
  }

  devolverLibro(lend : Lend){
    this.isLoad = true;
    this.listBookLendAll = this.listBookLendAll.filter(l => l.id != lend.id);
    this.bookLend = this.bookLend.filter(l => l.id != lend.id);
    this.bookService.devolverLibro(lend).subscribe({
      next:(res)=>{
        this.notiService.showAlertSuccess(res.message);
        console.log(res);
        this.isLoad = false;
      },
      error:(err) => {
        console.log(err);
        this.isLoad = false;
      }
    });
  }
}
