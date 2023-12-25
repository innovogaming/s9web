import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  private apiUrl = 'http://innovogaming.com/api/adduser.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  insert(nameUser: string, lastUser: string, rut: string, mail: string, phone: string, idStore: number, tipoUsuario: number ): Observable<any> {
    return this.http.post(this.apiUrl, { nameUser, lastUser, rut, mail, phone, idStore, tipoUsuario });
  }
}
