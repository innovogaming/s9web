import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AddbetService {

  private apiUrl = 'http://innovogaming.com/api/addbet.php';

  constructor(private userStateService: UserStateService,private http: HttpClient) { }

  insert(dataHora:string,descripcion:string, nombre:string, premio:string, valor:string, idStore: number): Observable<any> {
    return this.http.post(this.apiUrl, { dataHora, descripcion, nombre, premio, valor, idStore });
  }
}
