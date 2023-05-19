import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {LocationMapComponent} from "./location-map/location-map.component";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { httpInterceptorProviders } from './_helpers/http.interceptor';
import {Add_employeeComponent} from "./add_employee/add_employee.component";
import { FullCalendarModule } from '@fullcalendar/angular';
import {CalendarComponent} from "./calendar/calendar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { SolutionComponent } from './solution/solution.component';
import { CommonModule } from '@angular/common';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { SolutionFormComponent } from './solution-form/solution-form.component';
import { UserSolutionsComponent } from './user-solutions/user-solutions.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ProviderCalendarComponent } from './provider-calendar/provider-calendar.component';
import { AvailabilityModalComponent } from './availability-modal/availability-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NotificationComponent } from './notification/notification.component';  // import MatDialogModule here

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProviderApplicationFormComponent } from './provider-application-form/provider-application-form.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { ChatComponent } from './chat/chat.component';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    Add_employeeComponent,
    LocationMapComponent,
    CalendarComponent,
    AddCategorieComponent,
    SolutionComponent,
    SolutionFormComponent,
    UserSolutionsComponent,
    AddImageComponent,
    ProviderCalendarComponent,
    AvailabilityModalComponent,
    NotificationComponent,
    ProviderApplicationFormComponent,
    AdminInterfaceComponent,
    ChatComponent
    
    
  ],
    imports: [
        BrowserModule,
      FullCalendarModule,
      AppRoutingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        LeafletModule,
        CommonModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDialogModule, // add MatDialogModule here
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        FontAwesomeModule
        
    ],
  entryComponents: [
    AvailabilityModalComponent
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
