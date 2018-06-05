import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';
@Component({
    selector: 'car-rent-component',
    templateUrl: './rent_car.html'
})

export class RentYourCarComponent {

    public rentCarForm: FormGroup;
    public rentUrl = 'https://kizusi.herokuapp.com/rent_out/';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
            private router: Router,
            private route: ActivatedRoute,
            private fb: FormBuilder)
            {
                this.createForm();
            }

    createForm()
    {
        this.rentCarForm = this.fb.group(
        {
            cname: ['', Validators.required],
            mail: ['', Validators.required],
            phone: ['', Validators.required],
            careg: ['', Validators.required],
            id: ['', Validators.required]
        })
    }

    onSubmit()
    {
        this.http.post(this.rentUrl, this.rentCarForm.value, {headers: this.headers})
            .toPromise()
            .then(res => {
                        console.log(res.json());
                        this.router.navigate(['../thankyou']);

             })
            .catch(this.handleError)
    }
    private handleError(error: any): Promise<any>
     {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
    }
}
