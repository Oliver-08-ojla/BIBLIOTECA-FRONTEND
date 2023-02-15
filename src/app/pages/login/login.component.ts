import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';
import { ResAuth } from '../../interfaces/Auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fl: FormGroup;
  isLoad: boolean = false;
  constructor(
    private fb: FormBuilder,
    private autService: AutentificacionService,
    private notifyService: NotificationsService,
    private route: Router
  ) {
    this.fl = this.inicializarFormulario();
  }
  inicializarFormulario() {
    return this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (!this.fl.valid) return alert("Correo o contraseña requerida");
    this.isLoad = true;
    this.autService.login(this.fl.value).subscribe({
      next: (res: ResAuth) => {
        this.isLoad = false;
        if (!res.access_token) return this.notifyService.showAlertError(res.message);
        this.autService.saveToken(res);
        this.route.navigate(['/home']);
        this.notifyService.showAlertSuccess(res.message);
      },
      error: (err) => {
        this.notifyService.showAlertError(err.message);
      }
    });
  }

}
