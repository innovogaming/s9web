import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://innovogaming.com/api/login_user.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl, { username, password });
  }
}
