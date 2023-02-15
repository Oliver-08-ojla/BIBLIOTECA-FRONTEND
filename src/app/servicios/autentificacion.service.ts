import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth, ResAuth } from '../interfaces/Auth';
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

}
