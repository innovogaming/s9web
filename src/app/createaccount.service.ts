import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class CreateaccountService {

  private apiUrl = 'http://innovogaming.com/api/createaccount.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  insert(name: string, lastname: string, rut: string, mail: string ): Observable<any> {
    return this.http.post(this.apiUrl, { name, lastname, rut, mail });
  }
}
