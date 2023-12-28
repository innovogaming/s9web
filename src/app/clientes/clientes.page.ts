import { ChangeDetectorRef , Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { ClientsviewService } from '../clientsview.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ClientesPage implements OnInit 
{

  userState!: UserState;
  formattedDate!: string;
  loadingIndicator: boolean = false;
  public rows: any;
  public alertButtons = ['OK'];

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
    console.log(this.userState.idStore + ", " + this.userState.tipoUsuario);
    this.clientsViewService.view(this.userState.idStore, this.userState.tipoUsuario).subscribe(response => {
      if (response.status === 'success') 
      {
        console.log("Clientes carregados com sucesso" );
        this.rows = response.client; 
        
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
    { prop: 'id', name: 'Id' },
    { prop: 'nombre', name: 'Nombre' },
    { prop: 'apellido', name: 'Apellido' },
    { prop: 'rut', name: 'RUT' },
    { prop: 'direccion', name: 'Direccion' },
    { prop: 'telefono', name: 'Telefono' },
    { prop: 'correo', name: 'Correo' },
    { prop: 'sexo', name: 'Sexo' },
    { prop: 'cumpleanos', name: 'Cumpleanos' },
    { prop: 'direccion', name: 'Direccion' },
  ];

  constructor( private cdr: ChangeDetectorRef, private clientsViewService: ClientsviewService, private alertController: AlertController, private modalController: ModalController, private router: Router, private userStateService: UserStateService, private http: HttpClient ) 
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
