import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Auth, ResAuth } from '../interfaces/Auth';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class AutentificacionService {


  constructor(private http: HttpClient) { }

  login(auth: Auth):Observable<ResAuth>{
    return this.http.post<ResAuth>(`${environment.apiUrl}/login`,auth);
  }
  register(user: User): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/register`,user);
  }
  logout(){
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
  }
  saveToken(user: ResAuth){
    localStorage.setItem('usuario',JSON.stringify(user.usuario))
    localStorage.setItem('rol',JSON.stringify(user.rol.nombre))
  }
  
  getUser(){
    const user = localStorage.getItem('usuario');
    if(!user) return 
    const parse = JSON.parse(user);
    return parse;
  }
  getRol(){
    const rol = localStorage.getItem('rol');
    if(!rol) return 
    const parse = JSON.parse(rol);
    return parse
  }

}
