import { Component, OnInit } from '@angular/core';
import { Solution } from '../models/Solution';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrls: ['./solution.component.css']
})
export class SolutionComponent implements OnInit {
  categoryId: number = 0;
  services: Solution[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Get the category ID from the route parameters
    this.categoryId = this.route.snapshot.params['id'];
    
    // Fetch the services data from the API using the category ID
    this.http.get<Solution[]>(`http://localhost:8082/api/solutions/${this.categoryId}/services`).subscribe((data: Solution[]) => {
      this.services = data;
      console.log(this.services)
    });
  }
}
