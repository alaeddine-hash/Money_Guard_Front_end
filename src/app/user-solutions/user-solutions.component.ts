import { Component, OnInit } from '@angular/core';
import { Solution } from '../models/Solution';
import { SolutionService } from '../_services/Solution.service';
import { StorageService } from '../_services/storage.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-solutions',
  templateUrl: './user-solutions.component.html',
  styleUrls: ['./user-solutions.component.css']
})
export class UserSolutionsComponent implements OnInit {

  solutions: Solution[] = [];
  currentUser?: User;

  constructor(private solutionService: SolutionService, private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.solutionService.getSolutionsByProviderId(Number(this.currentUser?.id)).subscribe((data: Solution[]) => {
      this.solutions = data;
    });
  }

}
