import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Car, Price } from '../utilities/car_model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'payments-component',
    templateUrl: './payments.html'
})

export class PaymentsComponent implements OnInit
{
  public id: string;
  constructor(
                  private http: Http,
                  private router: Router,
                  private route: ActivatedRoute,
                  private fb: FormBuilder
            )
             {}
    ngOnInit()
    {
      this.route.params.subscribe(params =>
            {
               this.id = params['id'];
                console.log(this.id);

            })
    }
    mpesa()
    {
      this.router.navigate(['../mpesa/', this.id]);
    }
    paypal()
    {
      this.router.navigate(['../paypal/', this.id]);
    }

}
