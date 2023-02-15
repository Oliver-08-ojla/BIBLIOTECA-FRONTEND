import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;
  constructor(
    private autService: AutentificacionService
  ) {
    this.user = this.autService.getUser();
  }

  ngOnInit(): void {
  }

}
