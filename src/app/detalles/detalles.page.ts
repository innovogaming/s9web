import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';
import { ParticipantesService } from '../participantes.service';

import * as moment from 'moment';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})

export class DetallesPage implements OnInit {

  userState!: UserState;
  formattedDate!: string;
  public cantidadParticipantesText!: string;

  constructor(private router: Router,private userStateService: UserStateService,private participantesService: ParticipantesService) { }

  ngOnInit() {
    this.userState = this.userStateService.getCurrentUserState();
    this.formattedDate = moment(this.userState.fecha).format('DD/MM/YYYY HH:mm');
    console.log("Dados do usuário:", this.userState);

    this.participantesService.verify(this.userState.idPromocion).subscribe(response => {
      if (response.status === 'success') 
      {
        console.log("Ok: " + response.amount );
        this.cantidadParticipantesText = "Cantidad participantes: " + response.amount;
        

      } else {
        console.log("ERRO: " + response.reason);
        
      }
    });
  }

  onLogout() {
    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }

}
