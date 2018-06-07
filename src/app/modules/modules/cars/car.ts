import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import {NgForm} from '@angular/forms';
import { Car, Price } from './utilities/car_model';

import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'car-hire-component',
    templateUrl: 'car.html'
})

export class CarHireComponent {
  
  public cars: Array<any> = [];
  model: any;
  public carsUrl = 'https://kizusiadmin.herokuapp.com/car';
  
  constructor(private http: Http)
    {
     this.getCars();
   }
    
    firstDayOfWeek: number = 0;
    mode: string = 'date';
    start_date = '';
    end_date = '';
    departure: string;
    selectedOption = '';
    arrival: string;
    
  getCars(): Promise<any>
  {
    return this.http.get(this.carsUrl)
                .toPromise()
                .then(res => { this.cars = res.json(); console.log(this.cars)})
                .catch(this.handleError);
  }
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
    

}
