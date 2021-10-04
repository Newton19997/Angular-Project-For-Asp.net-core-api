import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country/country.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  // { path: '', component: CountryComponent },
  {path: 'country' , component: CountryComponent},
  {path: 'customer' , component: CustomerComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true, })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
