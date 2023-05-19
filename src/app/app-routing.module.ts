import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import {Add_employeeComponent} from "./add_employee/add_employee.component";
import {LocationMapComponent} from "./location-map/location-map.component";
import {CalendarComponent} from "./calendar/calendar.component";
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { SolutionComponent } from './solution/solution.component';
import { SolutionFormComponent } from './solution-form/solution-form.component';
import { UserSolutionsComponent } from './user-solutions/user-solutions.component';
import { AddImageComponent } from './add-image/add-image.component';
import { ProviderCalendarComponent } from './provider-calendar/provider-calendar.component';
import { AvailabilityModalComponent } from './availability-modal/availability-modal.component';
import { NotificationComponent } from './notification/notification.component';
import { ProviderApplicationFormComponent } from './provider-application-form/provider-application-form.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'add_employee', component: Add_employeeComponent },
  { path: 'add_categorie', component: AddCategorieComponent },
  { path: 'location', component: LocationMapComponent },
  { path: 'form_solution', component: SolutionFormComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'calendar/:id', component: CalendarComponent },
  { path: 'user-solutions', component: UserSolutionsComponent },
  { path: 'solutions/:sid/add-image', component: AddImageComponent }, // Add a route for AddImageComponent
  { path: 'provider-calendar/:id', component: ProviderCalendarComponent },
  { path: 'solutions/:id/services', component: SolutionComponent },
  { path: 'notifications', component: NotificationComponent }, // <-- Add this line
  { path: 'availability_modal', component: AvailabilityModalComponent },
  { path: 'provider-application', component: ProviderApplicationFormComponent },
  { path: 'chat/:providerUsername', component: ChatComponent },
  { path: 'admin_interface', component: AdminInterfaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
