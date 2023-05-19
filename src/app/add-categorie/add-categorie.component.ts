import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../_services/categorie.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Categorie} from "../models/Categorie";
import {Router} from "@angular/router";
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent implements OnInit {

  content?: string;
  categorieDetail !: FormGroup;
  categorieObj : Categorie = new Categorie();
  categorieList : Categorie[] = [];
  selectedFile: File | null = null;
  categorieId: number = 0; // Set this value to the Categorie ID you want to send


  constructor(private categorieService: CategorieService , private formBuilder : FormBuilder, private route : Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllCategories();

    this.categorieDetail = this.formBuilder.group({
      id : ['0'],
      name : [''],
    });

  }

  addCategorie() {
    console.log(this.categorieDetail);
    this.categorieObj.id = this.categorieDetail.value.id;
    this.categorieObj.name = this.categorieDetail.value.name;

    this.categorieService.addCategorie(this.categorieObj).subscribe(res=>{
      console.log(res);
      this.getAllCategories();
      this.route.navigate(['/home'])
    },err=>{
      console.log(err);
    });

  }

  getAllCategories() {
    this.categorieService.getAllCategories().subscribe(res=>{
      this.categorieList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;

    if (inputElement && inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }
 

 
  onUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      this.http.post(`http://localhost:8082/${this.categorieId}/add-image`, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total !== undefined) {
          console.log('Upload progress: ' + Math.round(event.loaded / event.total * 100) + '%');
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
        }
      });
    }
  }
}