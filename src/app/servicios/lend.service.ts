import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Lend } from '../interfaces/Lend';

@Injectable({
  providedIn: 'root'
})
export class LendService {

  constructor(private http: HttpClient) { }

  registerLend(lend: Lend):Observable<any>{
    console.log(lend);
    const data = new FormData();
    data.append('libro_id', String(lend.libro.id).toString());
    data.append('usuario_id', String(lend.usuario_id).toString());
    data.append('fechaPrestamo', lend.fechaPrestamo);
    data.append('fechaDevolucion', lend.fechaDevolucion);
    return this.http.post<any>(`${environment.apiUrl}/prestamos`,data);
  }
}
