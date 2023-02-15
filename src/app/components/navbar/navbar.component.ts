import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/User';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() user!: User;

  rol!: string;
  constructor(
    private authService: AutentificacionService,
    private route: Router
  ) {
    
  }

  ngOnInit(): void {
    const r =  this.authService.getRol();
    if(r) this.rol = r;
  }
  logout(){
    this.authService.logout();
    this.route.navigate(['/login']);
  }

}
