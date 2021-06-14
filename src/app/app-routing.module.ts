import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponentComponent } from './components/register-component/register-component.component';
import { AppComponent } from './app.component';
const routes: Routes = [
  { path: 'register', component: RegisterComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
