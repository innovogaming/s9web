import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  private apiUrl = 'http://innovogaming.com/api/validate.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  validate(idPromocion: number, idUsuario: number, rut: string): Observable<any> {
    return this.http.post(this.apiUrl, { idPromocion, idUsuario, rut });
  }
}
