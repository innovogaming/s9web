import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})

export class AdduserPage implements OnInit {

  formData = {
      name: '',
      lastname: '',
      rut: '',
      mail: '',
      phone: ''
  };
  
  //rutValue: string = '';

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  ngOnInit() {}

  onSubmit() 
  {
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
