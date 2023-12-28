import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private apiUrl = 'http://innovogaming.com/api/purchasesview.php';
  constructor(private userStateService: UserStateService,private http: HttpClient) { }
  view(id: number ): Observable<any> {
    return this.http.post(this.apiUrl, { id });
  }
}
