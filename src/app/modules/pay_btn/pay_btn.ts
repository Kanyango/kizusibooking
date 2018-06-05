import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Car, Price } from '../utilities/car_model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

declare let paypal: any;

@Component({
    selector: 'pay_btn-component',
    templateUrl: './pay_btn.html'
})

export class PaypalBtnComponent implements OnInit
{
    trans: any = {};
    constructor(
                private http: Http,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder
          ){}

          ngOnInit()
          {
                this.trans = {amount: '', currency: ''}
                this.trans.amount = this.route.snapshot.paramMap.get('amount');
                this.trans.currency = this.route.snapshot.paramMap.get('USD');
                console.log(this.trans);

                this.payPay(this.trans);

          }
          private loadExternalScript(scriptUrl: string) {
          return new Promise((resolve, reject) => {
            const scriptElement = document.createElement('script')
            scriptElement.src = scriptUrl
            scriptElement.onload = resolve
            document.body.appendChild(scriptElement)
        })
      }
          payPay(trans :any): void
          {
          this.loadExternalScript("https://www.paypalobjects.com/api/checkout.js").then(() => {
            paypal.Button.render({
              env: 'sandbox',
              style:
              {
                size: 'large'
              },
              client: {
                production: '',
                sandbox: 'AcxMIkVbu0WDbGAuytRAb8b8MWUFClO7ALiXxszdOOfncqIk39ix2epuFTG2kP8M31KQ68gHUzO2y40r'
              },
              commit: true,
              payment: function (data, actions) {
                return actions.payment.create({
                  payment: {
                    transactions: [
                      {
                        amount: { total: trans.amount, currency: 'USD' }
                      }
                    ]
                  }
                })
              },
              onAuthorize: function(data, actions) {
                return actions.payment.execute().then(function(payment) {
                  // TODO
                })
              }
            }, '#paypal-button');
          });

          }
}
