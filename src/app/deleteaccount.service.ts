import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteaccountService {

  private apiUrl = 'http://innovogaming.com/api/deleteaccount.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  delete(rut: string): Observable<any> {
    return this.http.post(this.apiUrl, { rut });
  }
}
