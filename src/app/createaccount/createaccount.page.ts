import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.page.html',
  styleUrls: ['./createaccount.page.scss'],
})
export class CreateaccountPage implements OnInit {

  formData = {
    name: '',
    lastname: '',
    rut: '',
    mail: '',
    phone: '',
    address: '',
    sexo: '', 
    nacimiento: '' 
  };

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {}

  onCreate()
  {
    console.log("onCreate");
    console.log("Teste: " + this.formData.rut );
    this.formData.rut = this.formData.rut.replace(/-/g, '');
    if(validateRut(this.formData.rut))
    {
      console.log("RUT OK: " + this.formData.rut );
      this.modalController.dismiss(this.formData);
    }
    else
    {
      console.log("RUT Invalido: " + this.formData.rut );
      this.presentAlert('RUT Invalido', '', 'Ingrese un RUT válido.');
    }
  }

}
