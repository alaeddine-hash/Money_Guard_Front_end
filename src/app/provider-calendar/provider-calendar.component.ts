import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../_services/Solution.service';
import { Availability } from '../models/Availability';
import { CalendarOptions, EventApi, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { StorageService } from '../_services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AvailabilityModalComponent } from '../availability-modal/availability-modal.component';



@Component({
  selector: 'app-provider-calendar',
  templateUrl: './provider-calendar.component.html',
  styleUrls: ['./provider-calendar.component.css']
})
export class ProviderCalendarComponent implements OnInit {
  serviceId: number = 0;
  currentUser: any;
  events: any[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };
  constructor(private route: ActivatedRoute, private solutionService: SolutionService, private storageService: StorageService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.serviceId = this.route.snapshot.params['id'];
    console.log(this.serviceId); // Add this line for debugging
    this.solutionService.getAvailabilitiesByServiceId(this.serviceId).subscribe((availabilities: Availability[]) => {
      const events = availabilities.map(av => ({
        id: av.id_availability,
        title: 'Available',
        date: av.date,
        color: '#008000'
      }));
      this.events = events;
      this.calendarOptions = {
        ...this.calendarOptions,
        events: this.events
      };
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const dialogRef = this.dialog.open(AvailabilityModalComponent, {
      width: '400px',
      data: { date: selectInfo.startStr ,
        serviceId: this.serviceId  // pass serviceId here
      }
    });
  
    dialogRef.componentInstance.addAvailability.subscribe((result: Availability) => {
      this.addAvailability(result);
      dialogRef.close();
    });
  }

  
  addAvailability(availability: Availability) {
    this.solutionService.createAvailabilityByIdSolution(availability, this.serviceId).subscribe((createdAvailability: Availability) => {
      this.events = this.events.concat({
        id: createdAvailability.id_availability,
        title: 'Available',
        date: createdAvailability.date,
        color: '#008000'
      });
      this.calendarOptions.events = this.events;
    });
  }

  openAvailabilityModal() {
    const dialogRef = this.dialog.open(AvailabilityModalComponent, {
      width: '400px',
      data: {serviceId: this.serviceId } // pass serviceId here

    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAvailability(result);
      }
    });
  }
  

  handleEventClick(clickInfo: any) {
    const availabilityId = clickInfo.event.id;
    this.solutionService.deleteAvailability(availabilityId).subscribe(() => {
      this.events = this.events.filter(event => event.id !== availabilityId);
      this.calendarOptions.events = this.events;
    });
  }
}


