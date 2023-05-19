import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../models/Availability';
import {Solution} from "../models/Solution";
import { Reservation } from '../models/Reservation';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  
  private apiUrl = 'http://localhost:8082/api'; // replace with your own API URL

  constructor(private http: HttpClient) { }

  getAllAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/availabilities`);
  }

  getAllSolutions(): Observable<Solution[]> {
    return this.http.get<Solution[]>(`${this.apiUrl}/solutions`);
  }

  getSolutionsByProviderId(id:number): Observable<Solution[]> {
    return this.http.get<Solution[]>(`${this.apiUrl}/solutions/` + id + '/servicesByProvider');
  }

  createAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(`${this.apiUrl}/availabilities`, availability);
  }

  createAvailabilityBySolution(availability: Availability, solution : Solution): Observable<Availability> {
    return this.http.post<Availability>(`${this.apiUrl}/solutions` + solution.id_solution + '/id_solution', availability);
  }

  createAvailabilityByIdSolution(availability: Availability, idSolution : Number): Observable<Availability> {
    return this.http.post<Availability>(`${this.apiUrl}/solutions/` + idSolution + '/id_solution', availability);
  }

  getAvailabilitiesByServiceId(serviceId: number): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/availabilities/` + serviceId);
  }

  createSolution(solution: Solution): Observable<Solution> {
    return this.http.post<Solution>(`${this.apiUrl}/solutions/addSolution`, solution);
  }

  createSolutionByIdCategorie(solution: Solution, categorieId: number,providerId: number): Observable<Solution> {
    return this.http.post<Solution>(`${this.apiUrl}/solutions/addSolutionBy/` + categorieId + '/provider/' + providerId, solution);
  }

  deleteAvailability(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/availabilities/${id}`);
  }

  deleteSolution(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/solutions/${id}`);
  }

  reserveDate(reservation: Reservation, userId : number, availabilityId : number): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/reservations/add/` + userId + '/userId/' + availabilityId + '/availabilityId', reservation);
  }
}
