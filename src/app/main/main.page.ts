import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../user-state.service';
import { UserState } from '../user-state.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {

  userState!: UserState;

  constructor(private router: Router,private userStateService: UserStateService) { }

  ngOnInit() {
    this.userState = this.userStateService.getCurrentUserState();
    console.log("Dados do usuário:", this.userState);
  }

  onLogout() {
    console.log("Bye bye:", this.userState);
    this.userStateService.clearUserState();
    this.router.navigate(['/home']);

  }

}
