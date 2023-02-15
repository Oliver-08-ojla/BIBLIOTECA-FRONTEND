import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  registerBook(book: Book): Observable<any>{
    const data = new FormData();
    data.append('titulo', book.titulo);
    data.append('autor', book.autor);
    data.append('image',book.image);
    return this.http.post<any>(`${environment.apiUrl}/libros`,data);
  }
  getBook():Observable<Book[]>{
    return this.http.get<Book[]>(`${environment.apiUrl}/libros`);
  }
  deleteBook(id: number):Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/libros/${id}`);
  }
  updateBook(book: Book): Observable<any>{
    const data = new FormData();
    data.append('titulo', book.titulo);
    data.append('autor', book.autor);
    data.append('image',book.image);
    return this.http.put<any>(`${environment.apiUrl}/libros`,data);
  }
  
}
