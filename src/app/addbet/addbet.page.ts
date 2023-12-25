import { Input, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addbet',
  templateUrl: './addbet.page.html',
  styleUrls: ['./addbet.page.scss'],
})
export class AddbetPage implements OnInit {

  //public dataHora: string;

  formData = {
    nombre: '',
    premio: '',
    dataHora: '',
    valor: '',
    descripcion: ''
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

  constructor(private alertController: AlertController, private modalController: ModalController) 
  {
    const agora = new Date();
    agora.setHours(15, 0, 0); // Define a hora para 18:00
    this.formData.dataHora = agora.toISOString();
  }

  ngOnInit() 
  {
    //console.log(this.sorteo)
  }

  onSubmit() 
  {   
    this.modalController.dismiss(this.formData);    
  }

}
