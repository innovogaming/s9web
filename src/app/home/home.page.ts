import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public alertButtons = ['OK'];

  email!: string;
  password!: string;

  constructor(private userStateService: UserStateService, private router: Router, private alertController: AlertController, private authService: AuthService) { }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.status === 'success') {
        console.log("Detalhes do usuário:");
        console.log("ID:", response.user.id);
        console.log("Nome:", response.user.name);
        console.log("Tienda:", response.user.store);
        console.log("idStore:", response.user.idStore);
        console.log("Promocion:", response.user.promocion);
        console.log("idPromocion:", response.user.idPromocion);
        console.log("Premio:", response.user.premio);
        console.log("Fecha:", response.user.fecha);
        console.log("Habilitado:", response.user.habilitado);
        console.log("tipoUsuario:", response.user.tipoUsuario);


        //this.userStateService.setUserState(response.user);
        const newState: UserState = {
          id: response.user.id,
          name: response.user.name,
          store: response.user.store,
          idStore: response.user.idStore,
          promocion: response.user.promocion,
          idPromocion: response.user.idPromocion,
          premio: response.user.premio,
          fecha: response.user.fecha,
          habilitado: response.user.habilitado,
          tipoUsuario: response.user.tipoUsuario,
          isLoggedIn: true
        };
        this.userStateService.setUserState(newState);

        this.router.navigate(['/main']);

      } else {
        console.log("ERRO");
        this.presentAlert('Error de inicio de sesión', 'Intento de acceso fallido', 'Tus credenciales no son válidas o hubo un problema al iniciar sesión.');

      }
    });
  }
}

