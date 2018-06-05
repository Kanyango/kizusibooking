import { Component } from '@angular/core';

@Component({
    selector: 'flight-component',
    templateUrl: 'flight.html'
})

export class FlightComponent {

    mode: string = 'date';
    departure: string;
    selectedOption = '';
    arrival: string;
    
    trips = ['One Way', 'Round Trip', 'Multi City'];

}
