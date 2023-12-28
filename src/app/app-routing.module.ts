import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'validar',
    loadChildren: () => import('./validar/validar.module').then( m => m.ValidarPageModule)
  },
  {
    path: 'detalles',
    loadChildren: () => import('./detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'adduser',
    loadChildren: () => import('./adduser/adduser.module').then( m => m.AdduserPageModule)
  },
  {
    path: 'edituser',
    loadChildren: () => import('./edituser/edituser.module').then( m => m.EdituserPageModule)
  },
  {
    path: 'completeuser',
    loadChildren: () => import('./completeuser/completeuser.module').then( m => m.CompleteuserPageModule)
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./cuentas/cuentas.module').then( m => m.CuentasPageModule)
  },
  {
    path: 'addcuenta',
    loadChildren: () => import('./addcuenta/addcuenta.module').then( m => m.AddcuentaPageModule)
  },
  {
    path: 'edit-account',
    loadChildren: () => import('./edit-account/edit-account.module').then( m => m.EditAccountPageModule)
  },
  {
    path: 'bet',
    loadChildren: () => import('./bet/bet.module').then( m => m.BetPageModule)
  },
  {
    path: 'addbet',
    loadChildren: () => import('./addbet/addbet.module').then( m => m.AddbetPageModule)
  },
  {
    path: 'editbet',
    loadChildren: () => import('./editbet/editbet.module').then( m => m.EditbetPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'createaccount',
    loadChildren: () => import('./createaccount/createaccount.module').then( m => m.CreateaccountPageModule)
  },
  {
    path: 'purchases',
    loadChildren: () => import('./purchases/purchases.module').then( m => m.PurchasesPageModule)
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then( m => m.TicketsPageModule)
  },
  {
    path: 'sorteos',
    loadChildren: () => import('./sorteos/sorteos.module').then( m => m.SorteosPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
