import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { PurchasesService } from '../purchases.service';


@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.page.html',
  styleUrls: ['./purchases.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class PurchasesPage implements OnInit 
{

  userState!: UserState;
  formattedDate!: string;
  loadingIndicator: boolean = false;
  public rows: any;
  public alertButtons = ['OK'];

  carregarDados(): void {
    this.purchasesService.view(this.userState.id).subscribe(response => {
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
    { prop: 'idcomra', name: 'Id' },
    { prop: 'valor', name: 'Valor' },
    { prop: 'tienda', name: 'Tienda' },
    { prop: 'fecha', name: 'Fecha' },
    { prop: 'sorteo', name: 'Sorteo' },
    { prop: 'tickets', name: 'Tickets' }
  ];

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }

  constructor( private purchasesService: PurchasesService, private alertController: AlertController, private modalController: ModalController, private router: Router, private userStateService: UserStateService, private http: HttpClient ) 
  { }

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
