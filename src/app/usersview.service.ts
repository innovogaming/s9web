import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class UsersviewService {

  private apiUrl = 'http://innovogaming.com/api/userview.php';


  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  view(idTienda: number, userType: number): Observable<any> {
    return this.http.post(this.apiUrl, { idTienda, userType });
  }
}
