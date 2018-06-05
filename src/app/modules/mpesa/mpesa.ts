import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Car, Price } from '../utilities/car_model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'mpesa-component',
    templateUrl: './mpesa.html'
})

export class MpesaComponent implements OnInit
{
  totals: number = 0;
  public car: Car;
  mpesaForm: FormGroup;
  public id :string;
  public carsUrl = 'https://kizusi.herokuapp.com/car/';
  constructor(
                  private http: Http,
                  private router: Router,
                  private route: ActivatedRoute,
                  private fb: FormBuilder
            )
             {
               this.createForm()
             }
    ngOnInit()
    {
      this.route.params.subscribe(params =>
            {
               this.id = params['id'];
                console.log(this.id);
                this.getCar(this.id);
            })
    }

    createForm()
        {
            this.mpesaForm = this.fb.group(
                {
                    days  : ['', Validators.required],
                    locate: ['', Validators.required]
                })

        }
      getCar(id: string): Promise<Car[]>
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
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }

      onSubmit()
      {
          console.log(this.mpesaForm.value);
          let cost = parseInt(this.mpesaForm.value.locate);
          let days = parseInt(this.mpesaForm.value.days)

          this.totals = cost * days;
      }


}
