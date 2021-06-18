import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path : '' , component: LoginComponent},
  { path: 'register', component: RegisterComponentComponent },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
