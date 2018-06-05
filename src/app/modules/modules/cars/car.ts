import { Component } from '@angular/core';

@Component({
    selector: 'car-hire-component',
    templateUrl: 'car.html'
})

export class CarHireComponent {

    mode: string = 'date';
    start_data = '';
    end_date = '';
    departure: string;
    selectedOption = '';
    arrival: string;
    
    

}
