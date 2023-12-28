import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { CompleteuserPage } from '../completeuser/completeuser.page';
import { CompleteuserService } from '../completeuser.service';
import { GetuserService } from '../getuser.service';
import { GetgainService } from '../getgain.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MainPage implements OnInit {

  userState!: UserState;

  showCard: boolean = false;
  conteudoQRCode: string = 'Conteúdo inicial do QR Code';
  tituloCard: string = 'Título Inicial';
  subtitleCard: string = 'Título Inicial';

  constructor(private getGainService:GetgainService, private router: Router,private http: HttpClient,private userStateService: UserStateService, private alertController: AlertController, private modalController: ModalController, private completeUserService: CompleteuserService, private getUserService: GetuserService) 
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

  carregarDados(): void 
  {
    console.log("user:" + this.userState.id);
    this.getGainService.view(this.userState.id).subscribe(response => {
      if (response.status === 'success') 
      {
        console.log("Contas carregadas com sucesso" );
        //this.rows = response.users; 
        /*this.rows = [
          { id: 2, tienda: 'Loja 1', nombre: 'jhkjhkjhkjhkjhkkjh',
            rut: "6576765765", direccion: "dfsdfsdfsdfdsfsfd", telefono: "45453534",
            correo: "sfdsdff@dsdfsfd.com", habilitado: 1, responsable: "lkjlkflkje" },
        ];*/
        console.log(response.users);
        console.log("token:" + response.users.token);
        if( response.users.token )
        {
            console.log("SIM");

          this.showCard = true;
          this.conteudoQRCode = "http://innovogaming.com/api/validatebet.php?token=" + response.users.token;
          this.tituloCard = response.users.nombre + "(" + response.users.tienda + ")"; 
          this.subtitleCard = "Premio: " + response.users.premio;
        }
      } 
      else 
      {
        console.log("ERRO: " + response.reason); 
        //this.loadingIndicator = false;
       
      }
    });    
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
        
      }
      
    });

    
    
  }

  ngOnInit() {
    this.userState = this.userStateService.getCurrentUserState();
    console.log("nombre:", this.userState.nombre);   

    this.carregarDados();
  }

  onLogout() {
    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }

}
