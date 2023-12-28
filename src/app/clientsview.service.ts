import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class ClientsviewService {

  private apiUrl = 'http://innovogaming.com/api/clientview.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }
  view(idStore: number, idUser: number): Observable<any> {
    return this.http.post(this.apiUrl, { idStore, idUser });
  }
}
