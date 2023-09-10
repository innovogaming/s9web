import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipantesService {

  private apiUrl = 'http://innovogaming.com/api/participants.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  verify(idPromocion: number): Observable<any> {
    return this.http.post(this.apiUrl, { idPromocion });
  }
}
