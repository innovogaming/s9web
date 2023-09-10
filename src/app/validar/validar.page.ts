import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ValidateService } from '../validate.service';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.page.html',
  styleUrls: ['./validar.page.scss'],
})
export class ValidarPage implements OnInit {

  public alertButtons = ['OK'];

  userState!: UserState;

  rutValue: string = '';

  constructor(private router: Router,private alertController: AlertController,private userStateService: UserStateService,private validateService: ValidateService) { }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  ngOnInit() {
    this.userState = this.userStateService.getCurrentUserState();
    console.log("Dados do usuário:", this.userState);

  }

  onValidate()
  {
    console.log("Teste: " + this.rutValue );
    console.log(this.rutValue);  // Aqui, você tem acesso ao valor atual do input
    this.userState = this.userStateService.getCurrentUserState();
    this.rutValue = this.rutValue.replace(/-/g, '');
    console.log("Teste: " + this.rutValue );
    if(validateRut(this.rutValue))
    {
      this.validateService.validate(this.userState.idPromocion,this.userState.idPromocion,this.rutValue).subscribe(response => {
        if (response.status === 'success') 
        {
          console.log("Ok");
          this.presentAlert('Registro exitoso!', '', '¡Cliente registrado para la promoción!');
          this.rutValue = '';          
  
        } else {
          console.log("ERRO: " + response.reason);
          this.presentAlert('Error: Cliente ya registrado', '', '¡Cliente ya registrado para esta promoción.');
          this.rutValue = '';
        }
      });
    }
    else
    {
      console.log("RUT FAIL");
      this.presentAlert('RUT Invalido', '', 'Ingrese un RUT válido.');
    }
    
  }

  onLogout() {
    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }

}
