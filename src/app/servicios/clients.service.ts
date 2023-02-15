import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/Clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }

  registerClient(client: Client):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/clientes`,client);
  }
  getClients():Observable<Client[]>{
    return this.http.get<Client[]>(`${environment.apiUrl}/clientes`);
  }
  deleteClient(client: Client):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/clientes/${client.id}`);
  }
  updateClient(client: Client):Observable<any>{
    return this.http.put<any>(`${environment.apiUrl}/clientes/${client.id}`,client);
  }
}
