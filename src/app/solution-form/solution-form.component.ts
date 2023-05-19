import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../models/Categorie';
import { SolutionService } from '../_services/Solution.service';
import { CategorieService } from '../_services/categorie.service';
import { Solution } from '../models/Solution';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router'; // Import Router


@Component({
  selector: 'app-solution-form',
  templateUrl: './solution-form.component.html',
  styleUrls: ['./solution-form.component.css']
})
export class SolutionFormComponent implements OnInit {
  solutionForm: FormGroup;
  categories?: Categorie[];

  constructor(private fb: FormBuilder, private solutionService: SolutionService, private categorieService: CategorieService, private storageService: StorageService,private router: Router) {
    this.solutionForm = this.fb.group({
      titleSolution: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      Categorie: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categorieService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    const formValue = this.solutionForm.value;
    const solution: Solution = {
      titleSolution: formValue.titleSolution,
      description: formValue.description,
      price: formValue.price,
      provider: this.storageService.getUser(),
    };
    let categorieId = Number(formValue.Categorie.id)
    let providerId = this.storageService.getUser().id
    console.log('Submitting solution:', solution);
    this.solutionService.createSolutionByIdCategorie(solution,categorieId, providerId).subscribe(() => {
      // Handle success
      this.router.navigate(['/user-solutions']); // Navigate to user-solutions route
    }, error => {
      // Handle error
      console.error('Reservation failed:', error);
    });
  }
}
