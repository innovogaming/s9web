import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AddbetPage } from '../addbet/addbet.page';
import { EditbetPage } from '../editbet/editbet.page';
import { AddbetService } from '../addbet.service';
import { GetbetService } from '../getbet.service';
import { EditbetService } from '../editbet.service';

@Component({
  selector: 'app-bet',
  templateUrl: './bet.page.html',
  styleUrls: ['./bet.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class BetPage implements OnInit {

  userState!: UserState;
  formattedDate!: string;
  loadingIndicator: boolean = false;
  public rows: any;
  public alertButtons = ['OK'];

  carregarDados(): void {
    this.getBetService.view(this.userState.id).subscribe(response => {
      if (response.status === 'success') 
      {
        console.log("Contas carregadas com sucesso" );
        this.rows = response.users; 
        /*this.rows = [
          { id: 2, tienda: 'Loja 1', nombre: 'jhkjhkjhkjhkjhkkjh',
            rut: "6576765765", direccion: "dfsdfsdfsdfdsfsfd", telefono: "45453534",
            correo: "sfdsdff@dsdfsfd.com", habilitado: 1, responsable: "lkjlkflkje" },
        ];*/
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
    { prop: 'idpromocion', name: 'Id' },
    { prop: 'nombre', name: 'nombre' },
    { prop: 'premio', name: 'Premio' },
    { prop: 'ticket_value', name: 'Valor' },
    { prop: 'fecha_premio', name: 'Fecha' }
  ];

  constructor( private editBetService: EditbetService, private getBetService: GetbetService, private addBetService: AddbetService, private alertController: AlertController, private modalController: ModalController, private router: Router, private userStateService: UserStateService, private http: HttpClient ) 
  { }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async presentAlerta(row: any) 
  {
    console.log('presentAlerta', row.description);

    const alert = await this.alertController.create({
      header: row.nombre,
      subHeader: 'Ganador: ' + row.cliente,
      message: 'Descripcion:' + row.description
    });

    await alert.present();
  }

  async adicionar() 
  {
    console.log("adicionar");
    
    const modal = await this.modalController.create({
      component: AddbetPage,
      breakpoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
      initialBreakpoint: 1
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos);
        
        this.addBetService.insert(dadosRecebidos.dataHora,dadosRecebidos.descripcion,dadosRecebidos.nombre,dadosRecebidos.premio,dadosRecebidos.valor,this.userState.idStore).subscribe(response => {
          if (response.status === 'success') 
          {
            console.log("Ok");
            this.presentAlert('Registro exitoso!', '', 'Empresa registrada al sistema!');
            this.carregarDados();          
    
          }
          else           {
            console.log("ERRO: " + response.reason);
            console.log("debug_sql: " + response.debug_sql);
          }
        });      
        
      }
    });
    
    return await modal.present();
  }

  async editar(row: any) 
  {
    console.log('Editar', row);
    
    const modal = await this.modalController.create({
      component: EditbetPage,
      componentProps: {
        'bet': row // Passa o objeto 'row' inteiro
      },
      breakpoints: [0, 0.2, 0.4, 0.6, 0.7, 0.8],
      initialBreakpoint: 0.7
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos);
        
        this.editBetService.edit(dadosRecebidos.id,dadosRecebidos.dataHora,dadosRecebidos.descripcion,dadosRecebidos.nombre,dadosRecebidos.premio,dadosRecebidos.valor).subscribe(response => {
          if (response.status === 'success') 
          {            
            
            this.presentAlert('Registro exitoso!', '', 'Edición de cuenta finalizada.');

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
  
  ngOnInit() 
  {
    this.loadingIndicator = true;
    this.userState = this.userStateService.getCurrentUserState();
    console.log("Dados do usuário:", this.userState);
    console.log("nombre:", this.userState.nombre); 
    
    this.carregarDados();
  }

  onLogout() 
  {

    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }

}
