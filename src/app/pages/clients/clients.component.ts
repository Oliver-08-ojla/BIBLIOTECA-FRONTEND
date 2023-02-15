import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/interfaces/Clients';
import { ClientsService } from 'src/app/servicios/clients.service';
import { NotificationsService } from 'src/app/servicios/notifications.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  nombreFilter!: string;
  listClients: Client[] = [];
  formClient: FormGroup;
  isLoad: boolean = false;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientsService,
    private notiService: NotificationsService
  ) {
    this.formClient = this.inicializarFormulario();
  }
  inicializarFormulario() {
    return this.fb.group({
      id:[],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      correo: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getClients();
  }
  register(){
    if(!this.formClient.valid) return alert("Campos requeridos");
    if(this.isEdit){
      this.updateClient(this.formClient.value);
    }else{
      this.clientService.registerClient(this.formClient.value).subscribe({
        next:(res) => {
          this.listClients.push(this.formClient.value);
          this.notiService.showAlertSuccess(res.message);
          this.isLoad = false;
          this.formClient.reset();
        },
        error:(err) => {
          this.notiService.showAlertError(err.error.message);
          this.isLoad = false;
        }
      });
    }
  }

  getClients(){
    this.clientService.getClients().subscribe({
      next:(res) => {
        this.listClients = res;
      },
      error:(err) => {
        this.notiService.showAlertError(err.error.message);
      }
    });
  }
  deleteClient(client: Client){
    this.isLoad = true;
    this.listClients = this.listClients.filter( c => c.id != client.id);
    this.clientService.deleteClient(client).subscribe({
      next:(res) => {
        this.notiService.showAlertSuccess(res.message);
        this.isLoad = false;
      },
      error:(err) => {
        this.notiService.showAlertError(err.error.message);
        this.isLoad = false;
      }
    });
  }
  editClient(client: Client){
    this.formClient.patchValue(client);
    this.isEdit = true;
  }

  updateClient(client: Client){
    if(!client)return
    this.isLoad = true;
    const index = this.listClients.findIndex( c => c.id == client.id);
    this.listClients[index] = client;

    this.clientService.updateClient(client).subscribe({
      next:(res) => {
        this.notiService.showAlertSuccess(res.message);
        this.isLoad = false;
        this.formClient.reset();
        this.isEdit = false;
      },
      error:(err) => {
        this.notiService.showAlertError(err.error.message);
        this.isLoad = false;
      }
    });
  }
  cancel(){
    this.formClient.reset();
    this.isEdit = false;
    this.isLoad = false;
    this.formClient.reset();
  }
}
