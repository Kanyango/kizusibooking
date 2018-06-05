import { Component } from '@angular/core';

@Component({
    selector: 'car-hire-component',
    templateUrl: 'car.html'
})

export class CarHireComponent {
    
    firstDayOfWeek: number = 0;
    mode: string = 'date';
    start_date = '';
    end_date = '';
    departure: string;
    selectedOption = '';
    arrival: string;
    
    

}
