import { ChangeDetectorRef , Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ForgetpassService } from '../forgetpass.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { CreateaccountPage } from '../createaccount/createaccount.page';
import { ModalController } from '@ionic/angular';
import { CreateaccountService } from '../createaccount.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public alertButtons = ['OK'];

  email!: string;
  password!: string;

  constructor(private createAccountService: CreateaccountService, private modalController: ModalController,private userStateService: UserStateService, private router: Router, private alertController: AlertController, private authService: AuthService, private forgetPassService: ForgetpassService) { }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  onLogin() 
  {
    this.authService.login(this.email, this.password).subscribe(response => {
      if (response.status === 'success') {
        console.log("Detalhes do usuário:");
        console.log("ID:", response.user.id);
        console.log("Habilitado:", response.user.habilitado);
        console.log("tipoUsuario:", response.user.tipoUsuario);


        //this.userStateService.setUserState(response.user);
        const newState: UserState = {
          id: response.user.id,
          nombre: response.user.nombre,
          apellido: response.user.apellido,
          idStore: response.user.idStore,
          tienda: response.user.tienda,
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

  onForget() 
  {
    this.forgetPassService.forget(this.email).subscribe(response => {
      if (response.status === 'success') 
      {
        
        //this.router.navigate(['/main']);
        this.presentAlert('Recuperación clave', 'Verifique su correo', 'Un mensaje de recuperación fue enviado a su correo electrónico.');

      } 
      else 
      {
        console.log(this.email);
        console.log(response.status);
        console.log(response.reason);
        this.presentAlert('Error de inicio de sesión', 'Intento de acceso fallido', 'Tus credenciales no son válidas o hubo un problema al iniciar sesión.');

      }
    });
  }

  async createAccount() 
  {
    const modal = await this.modalController.create({
      component: CreateaccountPage,
      breakpoints: [0, 0.2, 0.4,  0.6, 0.8, 1],
      initialBreakpoint: 0.6
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) 
      {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos);
        
        this.createAccountService.insert(dadosRecebidos.name,dadosRecebidos.lastname,dadosRecebidos.rut,dadosRecebidos.mail).subscribe(response => {
          if (response.status === 'success') 
          {
            console.log("Ok");
            this.presentAlert('Registro exitoso!', '', 'Cliente registrado al sistema!');
            //this.carregarDados();          
    
          }          
          else           
          {
            console.log("ERRO: " + response.reason);
            console.log("debug_sql: " + response.debug_sql);
            this.presentAlert('Error!', '', 'El cliente ya está registrado en el sistema.');
          }
        });       
        
      }
    });

    return await modal.present();
  }
}

