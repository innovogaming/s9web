import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class CompleteuserService {

  private apiUrl = 'http://innovogaming.com/api/completeuser.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }
  complete(nameUser: string, lastUser: string, rut: string, phone: string, address: string, sexo: string, nacimiento: string ): Observable<any> {
    return this.http.post(this.apiUrl, { nameUser, lastUser, rut, phone, address, sexo, nacimiento });
  }
}
