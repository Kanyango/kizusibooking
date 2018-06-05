import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Car, Price } from '../utilities/car_model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';



@Component({
    selector: 'paypal-component',
    templateUrl: './paypal.html'
})

export class PaypalComponent implements OnInit
{
    id: string;
    str_tot: string;
    car: Car;
    totals: number = 0;
    public carsUrl = 'https://kizusi.herokuapp.com/car/';
    paypalForm: FormGroup;
    constructor(
                    private http: Http,
                    private router: Router,
                    private route: ActivatedRoute,
                    private fb: FormBuilder
              )
               {
                 this.createForm()
               }
    private loadExternalScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.onload = resolve
      document.body.appendChild(scriptElement)
  })
}
ngOnInit(): void {
  this.route.params.subscribe(params =>
        {
           this.id = params['id'];
            console.log(this.id);
            this.getCar(this.id);
        })

      }

onSubmit()
{
    console.log(this.paypalForm.value);
    let cost = parseInt(this.paypalForm.value.locate);
    let days = parseInt(this.paypalForm.value.days)

    this.totals = cost * days;
    let new_tot =  this.totals;
    this.str_tot = new_tot.toString();

    this.router.navigate(['../confirmation', {'amount': this.str_tot, 'currency': 'USD'}])
}


getCar(id: string)
{
  const URL = `${this.carsUrl}${id}`;
  return this.http.get(URL)
              .toPromise()
               .then(res => {
                       this.car = res.json();
                       console.log(res.json());

                  })
               .catch(this.handleError)

}

createForm()
{
  this.paypalForm = this.fb.group(
      {
          days  : ['', Validators.required],
          locate: ['', Validators.required]
      })
}
private handleError(error: any): Promise<any>
 {
console.error('An error occurred', error); // for demo purposes only
return Promise.reject(error.message || error);
}
}
