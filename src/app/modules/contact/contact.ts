import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'contact-component',
    templateUrl: './contacts.html'
})

export class ContactComponent {

    public contactForm: FormGroup;

    constructor(private http: Http,
                private route: ActivatedRoute,
                private _fb: FormBuilder)
                {
                    this.makeForm();
                }
    makeForm()
    {
        this.contactForm = this._fb.group(
            {
                con_name: ['', Validators.required],
                con_email: ['', Validators.required],
                con_subject: ['', Validators.required],
                con_message: ['', Validators.required]
            })
    }
}
