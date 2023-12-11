import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserState } from './user-state.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private userStateSubject: BehaviorSubject<UserState>;
  public userState$: Observable<UserState>;

  constructor() {
    // Ao iniciar o serviço, tenta carregar o estado do usuário do localStorage.
    const storedUserState = localStorage.getItem('userState');
    const initialState = storedUserState ? JSON.parse(storedUserState) : {
      id: -1,
      name: '',
      store: '',
      idStore: -1,
      promocion: '',
      idPromocion: -1,
      premio: '',
      fecha: '',
      habilitado: -1,      
      tipoUsuario: -1,
      isLoggedIn: false
    };
    this.userStateSubject = new BehaviorSubject<UserState>(initialState);
    
    // Inicialize userState$ após userStateSubject
    this.userState$ = this.userStateSubject.asObservable();
  }

  // Método para obter o valor atual do estado do usuário (sem se inscrever para futuras atualizações).
  getCurrentUserState(): UserState {
    return this.userStateSubject.value;
  }

  // Método para definir ou atualizar o estado do usuário.
  setUserState(userState: UserState): void {
    // Atualize o BehaviorSubject com o novo estado.
    this.userStateSubject.next(userState);
    // Salve o novo estado no localStorage.
    localStorage.setItem('userState', JSON.stringify(userState));
  }

  // Método para limpar o estado do usuário (para logout, por exemplo).
  clearUserState(): void {
    const defaultState = {
      id: -1,
      name: '',
      store: '',
      idStore: -1,
      promocion: '',
      idPromocion: -1,
      premio: '',
      fecha: '',
      habilitado: -1,
      tipoUsuario: -1,
      isLoggedIn: false      
    };
    this.userStateSubject.next(defaultState);
    // Limpe o estado no localStorage.
    localStorage.removeItem('userState');
  }
}
