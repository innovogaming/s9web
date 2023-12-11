import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdduserService } from '../adduser.service';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { HttpClient } from '@angular/common/http';
import { UsersviewService } from '../usersview.service';
import { ModalController } from '@ionic/angular';
import { AdduserPage } from '../adduser/adduser.page';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class UsersPage implements OnInit {

  userState!: UserState;
  formattedDate!: string;
  loadingIndicator: boolean = false;
  public rows: any;
  public alertButtons = ['OK'];

  editar(row: any) {
    console.log('Editar', row);
    console.log('ID do Usuário:', row.id);
  }

  excluir(row: any) {
    console.log('Excluir', row);
    console.log('ID do Usuário:', row.id);
  }

  columns = [
    { name: 'Id Usuario' },
    { name: 'Nombre' },
    { name: 'Apellido' },
    { name: 'Rut' },
    { name: 'Correo' },
    { name: 'Telefono' },
    { name: 'Fecha Creación' }
  ];

  constructor( private adduserService: AdduserService, private alertController: AlertController, private modalController: ModalController, private router: Router, private userStateService: UserStateService, private http: HttpClient, private usersviewService: UsersviewService ) 
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
  
  async adicionar() {
    const modal = await this.modalController.create({
      component: AdduserPage,
      breakpoints: [0, 0.2, 0.4, 0.6, 0.8],
      initialBreakpoint: 0.6
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos);
        
        this.adduserService.insert(dadosRecebidos.name,dadosRecebidos.lastname,dadosRecebidos.rut,dadosRecebidos.mail,dadosRecebidos.phone).subscribe(response => {
          if (response.status === 'success') 
          {
            console.log("Ok");
            this.presentAlert('Registro exitoso!', '', '¡Usuario registrado al sistema!');
            //this.rutValue = '';          
    
          } else {
            console.log("ERRO: " + response.reason);
            this.presentAlert('Error: Usario ya registrado', '', '¡Usario ya registrado en el sistema!');
            //this.rutValue = '';
          }
        });
  
       
        
      }
    });

    return await modal.present();
  }

  

  onSubmit() {
    console.log('Dados do Formulário:');
  }

  ngOnInit() {
    this.loadingIndicator = true;
    this.userState = this.userStateService.getCurrentUserState();
    this.formattedDate = moment(this.userState.fecha).format('DD/MM/YYYY HH:mm');
    console.log("Dados do usuário:", this.userState);

    this.usersviewService.view(this.userState.idStore, this.userState.tipoUsuario).subscribe(response => {
      if (response.status === 'success') 
      {
        console.log("Ok: " + response.user.nombre );
        this.rows = [response.user];
        this.loadingIndicator = false;
      } 
      else 
      {
        console.log("ERRO: " + response.reason); 
        this.loadingIndicator = false;
       
      }
    });
    

  }
}

