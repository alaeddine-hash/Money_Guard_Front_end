import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SolutionService } from '../_services/Solution.service';
import { Availability } from '../models/Availability';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Reservation } from '../models/Reservation';
import { StorageService } from '../_services/storage.service';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Output() reserveButtonClick = new EventEmitter<{event: EventApi, mouseEvent: MouseEvent}>();
  serviceId: number = 0;
  events: any[] = [];
  currentUser: any;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    eventContent: (arg) => {
      const reserveButton = document.createElement('button');
      reserveButton.innerText = 'Reserve';
      reserveButton.classList.add('reserve-btn');
      reserveButton.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation(); // Prevent the eventClick from being triggered
        this.handleReserveButtonClick({ event: arg.event, mouseEvent: e }); // Pass the custom event object
      });
  
      const eventContentEl = document.createElement('div');
      eventContentEl.innerHTML = `<b>${arg.event.title}</b>`;
      eventContentEl.appendChild(reserveButton);
  
      return { domNodes: [eventContentEl] };
    }
  };
  
  

  constructor(private route: ActivatedRoute, private solutionService: SolutionService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.serviceId = this.route.snapshot.params['id'];
  
    this.solutionService.getAvailabilitiesByServiceId(this.serviceId).subscribe((availabilities: Availability[]) => {
      console.log('Received availabilities:', availabilities);  // Debugging line
  
      const availableEvents = availabilities.filter(av => av.available);
  
      console.log('Filtered availabilities:', availableEvents);  // Debugging line
  
      const events = availableEvents.map(av => ({
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
  
  

  handleReserveButtonClick({ event }: { event: EventApi; mouseEvent: MouseEvent }) {
    const availabilityId = event.id; // Get the availability ID from the event
  
    // Create a new Reservation instance and set the properties
    const newReservation = new Reservation();
    const reservationAvailability = new Availability();
    reservationAvailability.id_availability = Number(event.id);

  
    // Call the reserveDate method from the SolutionService
    this.solutionService.reserveDate(newReservation, this.currentUser.id, reservationAvailability.id_availability).subscribe((reservation: Reservation) => {
      // Handle successful reservation
      console.log('Reservation successful:', reservation);
  
      // Update the event to reflect the reservation (e.g., change the title, color, and remove the Reserve button)
      event.setProp('title', 'Reserved');
      event.setProp('backgroundColor', '#FF0000');
      event.setExtendedProp('reserved', true);
  
      // You can also update the eventContent to remove the Reserve button by updating the calendarOptions
      // and triggering a rerender, but it may have performance implications
      // this.calendarOptions = { ...this.calendarOptions, events: this.events };
    }, error => {
      // Handle reservation error
      console.error('Reservation failed:', error);
    });
  }

  handleDateSelect(selectInfo: any) {
    // Add any custom behavior or modifications here
  
    // Handle date selection and create a new availability
    const newAvailability = new Availability();
    newAvailability.date = selectInfo.date;
    newAvailability.available = false;
  
    // Add any custom behavior or modifications before creating the availability here
  
    this.solutionService.createAvailability(newAvailability).subscribe((createdAvailability: Availability) => {
      // Add the new availability as an event to the calendar
      this.events = this.events.concat({
        id: createdAvailability.id_availability,
        title: 'Available',
        date: createdAvailability.date,
        color: '#008000'
      });
  
      // Update the calendar events with the new availability
      this.calendarOptions.events = this.events;
  
      // Add any custom behavior or modifications after updating the calendar events here
    });
  }
  
  handleEventClick(clickInfo: any) {
    // Handle event click and remove the availability
    const availabilityId = clickInfo.event.id;
    this.solutionService.deleteAvailability(availabilityId).subscribe(() => {
      // Remove the availability from the calendar
      this.events = this.events.filter(event => event.id !== availabilityId);
      // Update the calendar events to reflect the deleted availability
      this.calendarOptions.events = this.events;
    });
  }
}
