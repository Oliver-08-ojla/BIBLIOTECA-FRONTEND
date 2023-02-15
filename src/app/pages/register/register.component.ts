import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/servicios/autentificacion.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fr: FormGroup;

  constructor(
    private fb: FormBuilder,
    private autService: AutentificacionService,
    private notifyService: NotificationsService,
    private route: Router
  ) {
    this.fr = this.inicializarFormulario();
  }
  inicializarFormulario() {
    return this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  register(){
    if(!this.fr.valid) return alert("Campos requeridos");
    this.autService.register(this.fr.value).subscribe({
      next:(res) => {
        this.notifyService.showAlertSuccess(res.message);
        this.route.navigate(['/home']);       
      },
      error:(err) => {
        this.notifyService.showAlertError(err.message);
      }
    })
  }

}
