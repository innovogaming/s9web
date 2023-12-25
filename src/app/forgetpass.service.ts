import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class ForgetpassService {

  private apiUrl = 'http://innovogaming.com/api/forgot_pass.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  forget(username: string): Observable<any> {
    return this.http.post(this.apiUrl, { username });
  }
}
