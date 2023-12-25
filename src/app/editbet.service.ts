import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class EditbetService {

  private apiUrl = 'http://innovogaming.com/api/editbet.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  edit(id:string,dataHora:string, descripcion:string, nombre:string, premio:string, valor: number): Observable<any> {
    return this.http.post(this.apiUrl, { id, dataHora, descripcion, nombre, premio, valor });
  }
}
