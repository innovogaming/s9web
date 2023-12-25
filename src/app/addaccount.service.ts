import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AddaccountService {

  private apiUrl = 'http://innovogaming.com/api/addaccount.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  insert(nameUser: string, razonsocial: string, rut: string, mail: string, phone: string, direccion: string, name_user: string, lastname_user: string, mail_user: string, phone_user: string, rut_user: string ): Observable<any> {
    return this.http.post(this.apiUrl, { nameUser, razonsocial, rut, mail, phone, direccion, name_user, lastname_user, mail_user, phone_user, rut_user });
  }
}
