import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../_services/user.service';
import { CategorieService } from '../_services/categorie.service';
import { Categorie } from '../models/Categorie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class HomeComponent implements OnInit {

  content?: string;
  categorieList : Categorie[] = [];


  constructor(private categorieService: CategorieService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
    this.getAllCategories();
  }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(res=>{
      this.categorieList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }
}
