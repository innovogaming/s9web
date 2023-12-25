import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class EditaccountService {

  private apiUrl = 'http://innovogaming.com/api/editaccount.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  edit(tienda: string, nombre: string, rut: string, mail: string, phone: string, direccion: string): Observable<any> {
    return this.http.post(this.apiUrl, { tienda, nombre, rut, mail, phone, direccion });
  }
}
