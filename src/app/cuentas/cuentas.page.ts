import { ChangeDetectorRef , Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AccountviewService } from '../accountview.service';
import { AddcuentaPage } from '../addcuenta/addcuenta.page';
import { AddaccountService } from '../addaccount.service';
import { DeleteaccountService } from '../deleteaccount.service';
import { EditAccountPage } from '../edit-account/edit-account.page';
import { EditaccountService } from '../editaccount.service';

@Component({
  selector: 'app-cuentas',
  templateUrl: './cuentas.page.html',
  styleUrls: ['./cuentas.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CuentasPage implements OnInit 
{

  userState!: UserState;
  formattedDate!: string;
  loadingIndicator: boolean = false;
  public rows: any;
  public alertButtons = ['OK'];

  carregarDados(): void 
  {
    this.accountViewService.view(this.userState.id).subscribe(response => {
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
        this.cdr.detectChanges(); // Aciona a detecção de mudanças
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
    { prop: 'idtienda', name: 'Id' },
    { prop: 'tienda', name: 'Tienda' },
    { prop: 'nombre', name: 'Nombre' },
    { prop: 'rut', name: 'RUT' },
    { prop: 'direccion', name: 'Direccion' },
    { prop: 'telefono', name: 'Telefono' },
    { prop: 'correo', name: 'Correo' },
    { prop: 'habilitado', name: 'Habilitado' },
    { prop: 'responsable', name: 'Responsable' },
  ];

  constructor( private editAccountService: EditaccountService, private cdr: ChangeDetectorRef, private deleteAccountService: DeleteaccountService, private addAccountService: AddaccountService, private accountViewService: AccountviewService, private alertController: AlertController, private modalController: ModalController, private router: Router, private userStateService: UserStateService, private http: HttpClient ) 
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

  async adicionar() 
  {
    const modal = await this.modalController.create({
      component: AddcuentaPage,
      breakpoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
      initialBreakpoint: 1
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos);
        
        this.addAccountService.insert(dadosRecebidos.name,dadosRecebidos.razonsocial,dadosRecebidos.rut,dadosRecebidos.mail,dadosRecebidos.phone,dadosRecebidos.direccion,dadosRecebidos.name_user,dadosRecebidos.lastname_user,dadosRecebidos.mail_user,dadosRecebidos.phone_user,dadosRecebidos.rut_user).subscribe(response => {
          if (response.status === 'success') 
          {
            console.log("Ok");
            this.presentAlert('Registro exitoso!', '', 'Empresa registrada al sistema!');
            this.carregarDados();          
    
          } 
          else if (response.reason === 'user') 
          {
            console.log("ERRO: " + response.reason);
            this.presentAlert('Error: Usuario ya registrado', '', 'Usuario ya registrado en el sistema!');
            this.carregarDados();
          }
          else if (response.reason === 'company') 
          {
            console.log("ERRO: " + response.reason);
            this.presentAlert('Error: Empresa ya registrada', '', 'Empresa ya registrada en el sistema!');
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
      component: EditAccountPage,
      componentProps: {
        'cuenta': row // Passa o objeto 'row' inteiro
      },
      breakpoints: [0, 0.2, 0.4, 0.6, 0.7, 0.8],
      initialBreakpoint: 0.7
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        const dadosRecebidos = dataReturned.data;
        console.log('Dados recebidos:', dadosRecebidos.tienda);
        
        this.editAccountService.edit(dadosRecebidos.tienda,dadosRecebidos.nombre,dadosRecebidos.rut,dadosRecebidos.mail,dadosRecebidos.phone,dadosRecebidos.direccion).subscribe(response => {
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

  excluir(row: any) 
  {
    console.log('Excluir', row);
    console.log('ID do Usuário:', row.rut);
    this.deleteAccountService.delete(row.rut).subscribe(response => {
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
