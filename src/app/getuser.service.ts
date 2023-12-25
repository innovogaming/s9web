import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {

  private apiUrl = 'http://innovogaming.com/api/getuser.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }
  get(id: number ): Observable<any> {
    return this.http.post(this.apiUrl, { id });
  }
}
