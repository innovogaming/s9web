import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AdduserService } from '../adduser.service';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { HttpClient } from '@angular/common/http';
import { UsersviewService } from '../usersview.service';
import { ModalController } from '@ionic/angular';
import { AdduserPage } from '../adduser/adduser.page';
import { EdituserPage } from '../edituser/edituser.page';
import { EdituserService } from '../edituser.service';
import { DeleteuserService } from '../deleteuser.service';
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

  excluir(row: any) {
    console.log('Excluir', row);
    console.log('ID do Usuário:', row.id);
    this.deleteUserService.delete(row.id).subscribe(response => {
      if (response.status === 'success') 
      {       
        //this.presentAlert('Recuperación clave', 'Verifique su correo', 'Un mensaje de recuperación fue enviado a su correo electrónico.');
        console.log("SIM: " + response.status);
        this.carregarDados();

      } 
      else 
      {
       
        console.log("NAO: " + response.status);

        this.carregarDados();
      }
    });
  }

  carregarDados(): void {
    this.usersviewService.view(this.userState.idStore, this.userState.tipoUsuario).subscribe(response => {
      if (response.status === 'success') 
      {
        console.log("Usuários carregados com sucesso" );
        this.rows = response.users;
        console.log(this.rows);
        this.loadingIndicator = false;
      } 
      else 
      {
        console.log("ERRO: " + response.reason); 
        this.loadingIndicator = false;
       
      }
    });    
  } 

  columns = [
    { name: 'Id' },
    { name: 'Nombre' },
    { name: 'Apellido' },
    { name: 'Rut' },
    { name: 'Correo' },
    { name: 'Telefono' },
    { name: 'Habilitado' },
    { name: 'Creacion' }
  ];

  constructor( private adduserService: AdduserService, private editUserService: EdituserService, private alertController: AlertController, private modalController: ModalController, private router: Router, private userStateService: UserStateService, private http: HttpClient, private usersviewService: UsersviewService, private deleteUserService: DeleteuserService ) 
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
      breakpoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
      initialBreakpoint: 0.8
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos);
        
        this.adduserService.insert(dadosRecebidos.name,dadosRecebidos.lastname,dadosRecebidos.rut,dadosRecebidos.mail,dadosRecebidos.phone, this.userState.idStore, this.userState.tipoUsuario).subscribe(response => {
          if (response.status === 'success') 
          {
            console.log("Ok");
            this.presentAlert('Registro exitoso!', '', '¡Usuario registrado al sistema!');
            this.carregarDados();          
    
          } else {
            console.log("ERRO: " + response.reason);
            this.presentAlert('Error: Usario ya registrado', '', '¡Usario ya registrado en el sistema!');
            this.carregarDados();
          }
        });
  
       
        
      }
    });

    return await modal.present();
  }

  async editar(row: any) {
      console.log('Editar', row);
      console.log('Nombre:', row.nombre);
      console.log('Apellido:', row.apellido);
      console.log('Correo:', row.correo);
      console.log('Telefono:', row.telefono);
      const modal = await this.modalController.create({
        component: EdituserPage,
        componentProps: {
          'usuario': row // Passa o objeto 'row' inteiro
        },
        breakpoints: [0, 0.2, 0.4, 0.6, 0.8],
        initialBreakpoint: 0.6
      });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos.name);
        
        this.editUserService.edit(dadosRecebidos.name,dadosRecebidos.lastname,dadosRecebidos.rut,dadosRecebidos.mail,dadosRecebidos.phone).subscribe(response => {
          if (response.status === 'success') 
          {
            
            
            this.presentAlert('Registro exitoso!', '', 'Edición de usuario finalizada.');

            this.carregarDados();

          } 
          else 
          {
          
            console.log("NAO: " + response.status);

            this.carregarDados();
          }
          
        });
  
       
        
      }
    });

    await modal.present();
  }

  onSubmit() {
    console.log('Dados do Formulário:');
  }

  ngOnInit() 
  {
    this.loadingIndicator = true;
    this.userState = this.userStateService.getCurrentUserState();
    console.log("Dados do usuário:", this.userState);
    console.log("nombre:", this.userState.nombre);

    this.carregarDados();

  }

  onLogout() {
    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }
}

