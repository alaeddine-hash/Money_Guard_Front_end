import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Availability } from '../models/Availability';
import { SolutionService } from '../_services/Solution.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-availability-modal',
  templateUrl: './availability-modal.component.html',
  styleUrls: ['./availability-modal.component.css']
})
export class AvailabilityModalComponent  {


  @Output() addAvailability = new EventEmitter();
  newAvailability: Availability = new Availability();
  date?: string;
  serviceId!: number;  // define serviceId here


  constructor(private solutionService: SolutionService, @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.serviceId = data.serviceId; // set serviceId from the data
  }

  save() {
    const availability = {
      date: this.date,
      isAvailable:true
    };
    this.addAvailability.emit(availability);
    this.cancel();
  }

  cancel() {
    this.date = '';
  }

  onSubmit() {
    this.newAvailability.available = true;
    this.solutionService.createAvailabilityByIdSolution(this.newAvailability, this.serviceId).subscribe(createdAvailability => {
      console.log('New availability created:', createdAvailability);
      this.newAvailability = new Availability();
    });
  }
}


