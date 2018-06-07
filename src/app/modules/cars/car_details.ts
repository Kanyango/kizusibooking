import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Car, Price } from '../utilities/car_model';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'car_details-component',
    templateUrl: './car_details.html'
})

export class CarDetailsComponent implements OnInit
{
    model;
    public rentalForm: FormGroup;
    public car: Car;
    public carsUrl = 'https://kizusiadmin.herokuapp.com/car/';
    public reserveUrl = 'https://kizusiadmin.herokuapp.com/ressms';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http,
                private router: Router,
                private route: ActivatedRoute,
                private fb: FormBuilder)
                {
                    this.createForm();
                }

    ngOnInit(): void
    {
    this.route.params.subscribe(params =>
        {
            const id = params['id'];
            console.log(id);
            this.getCar(id);
        })

    }

    createForm()
    {
        this.rentalForm = this.fb.group(
            {
                cname: ['', Validators.required],
                dl: ['', Validators.required],
                mail: ['', Validators.required],
                phone: ['', Validators.required],
                start_date: ['', Validators.required],
                end: ['', Validators.required],
                car: [''],
                id: ['', Validators.required]
            })

    }

    getCar(id: string): Promise<Car>
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
        console.log(this.rentalForm.value);
        let ngbDate = this.rentalForm.controls['end'].value;
        let ngbDate2 = this.rentalForm.controls['start_date'].value;
        let myDate = new Date(ngbDate.year, ngbDate.month-1, ngbDate.day);
        let myDate2 = new Date(ngbDate2.year, ngbDate.month-1, ngbDate.day);
        let formValues = this.rentalForm.value;
        formValues['car'] = this.car._id;
        formValues['end'] = myDate;
        formValues['start_date'] = myDate2;

        this.http.post(this.reserveUrl, formValues, {headers: this.headers})
            .toPromise()
            .then(res => {
                        console.log(res.json());
                        this.router.navigate(['../payments/', this.car._id]);

             })
            .catch(this.handleError)



    }



}
