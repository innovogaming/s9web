import { Input, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editbet',
  templateUrl: './editbet.page.html',
  styleUrls: ['./editbet.page.scss'],
})
export class EditbetPage implements OnInit {

  @Input() bet: any;

  formData = {
    id: '',
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
      
    }

  ngOnInit() 
  {
    if (this.bet) 
    {
      //const agora = new Date(this.bet.fecha);
      
      this.formData.nombre = this.bet.nombre;
      this.formData.premio = this.bet.premio;
      this.formData.dataHora = this.formatarParaISO8601SemUTC(this.bet.fecha);
      this.formData.valor = this.bet.valor;
      this.formData.descripcion = this.bet.description;
      this.formData.id = this.bet.id;
      
    }
  }

  formatarParaISO8601SemUTC(dataString: string): string {
    const data = new Date(dataString);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
  }

  onSubmit() 
  {   
    this.modalController.dismiss(this.formData);    
  }

}
