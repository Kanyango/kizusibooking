import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home';
import { ServicesComponent } from './modules/services/services';
import { AboutComponent } from './modules/about/about';
import { CarsComponent } from './modules/cars/cars';
import { ContactComponent } from './modules/contact/contact';
import { CarDetailsComponent } from './modules/cars/car_details';
import { ConfirmationComponent } from './modules/cars/confirmation';
import { PaymentsComponent } from './modules/payments/payments';
import { MpesaComponent } from './modules/mpesa/mpesa';
import { PaypalComponent } from './modules/paypal/paypal';
import { RentYourCarComponent } from './modules/rent_car/rent_car';
import { PaypalBtnComponent } from './modules/pay_btn/pay_btn';
import { SignUpComponent } from './modules/signup/signup';
import { PlanComponent } from './modules/plan/plan';
import { FlightComponent } from './modules/modules/flight/flight';
import { HotelBookingComponent } from './modules/modules/hotels/hotel';
import { CarHireComponent } from './modules/modules/cars/car';

const routes: Routes = [
        { path: '', redirectTo: 'home', pathMatch: 'full'},
        { path: 'home', component: HomeComponent},
        { path: 'about', component: AboutComponent},
        { path: 'services', component: ServicesComponent},
        { path: 'cars', component: CarsComponent},
        { path: 'contact', component: ContactComponent},
        { path: 'car_detail/:id', component: CarDetailsComponent},
        { path: 'thankyou', component: ConfirmationComponent},
        { path: 'rent_car', component: RentYourCarComponent},
        { path: 'payments/:id', component: PaymentsComponent},
        { path: 'mpesa/:id', component: MpesaComponent},
        { path: 'paypal/:id', component: PaypalComponent},
        { path: 'confirmation', component: PaypalBtnComponent},
        { path: 'signup', component: SignUpComponent },
        { path: 'plan', component: PlanComponent, 
          children: [
                     { path: 'flight', component: FlightComponent },
                     { path: 'hotel', component: HotelBookingComponent },
                     { path: 'cars', component: CarHireComponent }
                    ]
        }
        
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
