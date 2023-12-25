import { Input, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { validateRut } from '@fdograph/rut-utilities';

@Component({
  selector: 'app-completeuser',
  templateUrl: './completeuser.page.html',
  styleUrls: ['./completeuser.page.scss'],
})

export class CompleteuserPage implements OnInit {
  
  @Input() usuario: any;

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

  rutValue: string = '';

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
    if (this.usuario)
    {
      //console.log("nombre: " + this.usuario.nombre );
      //console.log("ID:", this.usuario.id);
      this.formData.name = this.usuario.name;
      this.formData.lastname = this.usuario.lastname;
      this.formData.rut = this.usuario.rut;
      this.formData.mail = this.usuario.correo;
      this.formData.phone = this.usuario.telefono;
      this.formData.address = this.usuario.direccion;

      console.log("sexo:", this.usuario.sexo);
      console.log("nacimiento:", this.usuario.nacimiento);

      this.formData.sexo = this.usuario.sexo; // Atribuindo o sexo
      this.formData.nacimiento = this.usuario.nacimiento;
      
    }
  }

  onEdit() 
  {
    console.log("Teste: " + this.formData.rut );
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
