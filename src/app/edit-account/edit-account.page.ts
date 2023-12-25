import { Input, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.page.html',
  styleUrls: ['./edit-account.page.scss'],
})
export class EditAccountPage implements OnInit {

  @Input() cuenta: any;

  formData = {
    tienda: '',
    nombre: '',
    rut: '',
    mail: '',
    direccion: '',
    phone: ''
  };

  constructor( private alertController: AlertController, private modalController: ModalController) 
  {
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  ngOnInit() 
  {
    if (this.cuenta) {
      this.formData.tienda = this.cuenta.tienda;
      this.formData.nombre = this.cuenta.nombre;
      this.formData.rut = this.cuenta.rut;
      this.formData.mail = this.cuenta.correo;
      this.formData.phone = this.cuenta.telefono;
      this.formData.direccion = this.cuenta.direccion;
    }
  }

  onEdit() 
  {
    //console.log("Teste: " + this.formData.rut );
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
