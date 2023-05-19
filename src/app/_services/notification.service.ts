import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8082/api/reservations';  // Update with your Spring Boot application's URL

  constructor(private http: HttpClient) { }

  getNotificationsForProvider(providerId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/providers/${providerId}/notifications`);
  }

  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8082/api/notifications/${notificationId}`);
  }
}

export interface Notification {
  id: number;
  message: string;
}
