import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class EdituserService {

  private apiUrl = 'http://innovogaming.com/api/edituser.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }
  edit(nameUser: string, lastUser: string, rut: string, mail: string, phone: string ): Observable<any> {
    return this.http.post(this.apiUrl, { nameUser, lastUser, rut, mail, phone });
  }
}
