import { Input, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.page.html',
  styleUrls: ['./edituser.page.scss'],
})

export class EdituserPage implements OnInit {

  @Input() usuario: any;

  formData = {
    name: '',
    lastname: '',
    rut: '',
    mail: '',
    phone: ''
  };

  rutValue: string = '';

  constructor( private alertController: AlertController, private modalController: ModalController) 
  {
    //this.usuario = navParams.get('usuario');
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
    if (this.usuario) {
      this.formData.name = this.usuario.nombre;
      this.formData.lastname = this.usuario.apellido;
      this.formData.rut = this.usuario.rut;
      this.formData.mail = this.usuario.correo;
      this.formData.phone = this.usuario.telefono;
    }
  }

  onEdit() 
  {
    //console.log("Teste: " + this.formData.rut );
    this.rutValue = this.formData.rut.replace(/-/g, '');
    if(validateRut(this.rutValue))
    {
      console.log("RUT OK: " + this.rutValue );
      this.modalController.dismiss(this.formData);
    }
    else
    {
      console.log("RUT Invalido: " + this.rutValue );
      this.presentAlert('RUT Invalido', '', 'Ingrese un RUT válido.');
    }
  }

}
