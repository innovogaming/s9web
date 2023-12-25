import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteuserService {

  private apiUrl = 'http://innovogaming.com/api/deleteuser.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  delete(id: string): Observable<any> {
    return this.http.post(this.apiUrl, { id });
  }
}
