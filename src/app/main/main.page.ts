import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { CompleteuserPage } from '../completeuser/completeuser.page';
import { CompleteuserService } from '../completeuser.service';
import { GetuserService } from '../getuser.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainPage implements OnInit {

  userState!: UserState;

  constructor(private router: Router,private http: HttpClient,private userStateService: UserStateService, private alertController: AlertController, private modalController: ModalController, private completeUserService: CompleteuserService, private getUserService: GetuserService) { }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  completar() 
  {
    console.log('completar');

    this.userState = this.userStateService.getCurrentUserState();
    console.log("Id usuario:", this.userState.id); 

    this.getUserService.get(this.userState.id).subscribe( async response => {
      if (response.status === 'success') 
      {
        
        console.log("Detalhes do usuário:");
        console.log("ID:", response.user.id);
        console.log("Nome:", response.user.name);
        console.log("lastname:", response.user.lastname);
        console.log("rut:", response.user.rut);
        console.log("sexo:", response.user.sexo);
        console.log("nacimiento:", response.user.nacimiento);
        console.log("telefono:", response.user.telefono);
        console.log("correo:", response.user.correo);
        console.log("direccion:", response.user.direccion);

        const modal = await this.modalController.create({
          component: CompleteuserPage,
          componentProps: {
            'usuario': response.user // Passa o objeto 'row' inteiro
          },
          breakpoints: [0, 0.2, 0.4, 0.6, 0.8, 0.9, 1],
          initialBreakpoint: 0.9
        });
    
        modal.onDidDismiss().then((dataReturned) => {
          if (dataReturned !== null) 
          {
            const dadosRecebidos = dataReturned.data;
            console.log('name:', dadosRecebidos.name);
            console.log('lastname:', dadosRecebidos.lastname);
            console.log('rut:', dadosRecebidos.rut);
            console.log('mail:', dadosRecebidos.mail);
            console.log('phone:', dadosRecebidos.phone);
            console.log('address:', dadosRecebidos.address);
            console.log('sexo:', dadosRecebidos.sexo);
            console.log('nacimiento:', dadosRecebidos.nacimiento);
            
            this.completeUserService.complete(dadosRecebidos.name,dadosRecebidos.lastname,dadosRecebidos.rut,dadosRecebidos.phone,dadosRecebidos.address,dadosRecebidos.sexo,dadosRecebidos.nacimiento).subscribe(response => {
              if (response.status === 'success') 
              {               
                
                this.presentAlert('Registro exitoso!', '', 'Edición de usuario finalizada.');
    
                //this.carregarDados();
    
              } 
              else 
              {
              
                console.log("NAO: " + response.status);
    
                //this.carregarDados();
              }
              
            }); 
            
          }
        });
    
        await modal.present();

      } 
      else 
      {
      
        console.log("NAO: " + response.status);

        //this.carregarDados();
      }
      
    });

    
    
  }

  ngOnInit() {
    this.userState = this.userStateService.getCurrentUserState();
    console.log("nombre:", this.userState.nombre);   
  }

  onLogout() {
    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }

}
