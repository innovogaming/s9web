import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-addcuenta',
  templateUrl: './addcuenta.page.html',
  styleUrls: ['./addcuenta.page.scss'],
})
export class AddcuentaPage implements OnInit {

  formData = {
      name: '',
      razonsocial: '',
      rut: '',
      mail: '',
      phone: '',
      direccion: '',
      name_user: '',
      lastname_user: '',
      rut_user: '',
      mail_user: '',
      phone_user: '',
  };

  //rutValue: string = '';
  //rutUserValue: string = '';

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

  onSubmit() 
  {
    this.formData.rut = this.formData.rut.replace(/-/g, '');
    this.formData.rut_user = this.formData.rut_user.replace(/-/g, '');

    //this.rutValue = this.formData.rut.replace(/-/g, '');
    //this.rutUserValue = this.formData.rut_user.replace(/-/g, '');

    if(validateRut(this.formData.rut))
    {
      console.log("RUT EMPRESA OK: " + this.formData.rut );
      if(validateRut(this.formData.rut_user))
      {
        console.log("RUT RESPONSABLE OK: " + this.formData.rut_user );
        this.modalController.dismiss(this.formData);
      }
      else
      {
        console.log("RUT Responsble Invalido: " + this.formData.rut_user );
        this.presentAlert('RUT Responsble Invalido', '', 'Ingrese un RUT válido.');
      }
    }
    else
    {
      console.log("RUT Invalido: " + this.formData.rut );
      this.presentAlert('RUT Empresa Invalido', '', 'Ingrese un RUT válido.');
    }
    
  }

}
