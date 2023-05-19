import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderApplicationService } from '../_services/provider-application.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-provider-application-form',
  templateUrl: './provider-application-form.component.html',
  styleUrls: ['./provider-application-form.component.css']
})
export class ProviderApplicationFormComponent implements OnInit {
  applicationForm!: FormGroup;
  submitted = false;
  successMessage?: string;
  errorMessage?: string;
  selectedFiles: { [key: string]: File } = {};
  isFileSelected: boolean = false;  // Add this line


  constructor(
    private formBuilder: FormBuilder,
    private providerApplicationService: ProviderApplicationService,
     private route : Router, private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.applicationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
      certificationFile: ['']  // Remove Validators.required

    });
  }

  get f() {
    return this.applicationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.applicationForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('fullName', this.applicationForm.value.fullName);
    formData.append('email', this.applicationForm.value.email);
    formData.append('phone', this.applicationForm.value.phone);
    formData.append('address', this.applicationForm.value.address);
    formData.append('password', this.applicationForm.value.password);
    if (this.selectedFiles['certificationFile']) {
      formData.append('certificationFile', this.selectedFiles['certificationFile']);
    }

    console.log(formData);  // Add this line

    this.providerApplicationService.submitApplication(formData).subscribe(
      () => {
        this.applicationForm.reset();
        this.submitted = false;
        this.successMessage = 'Application submitted successfully.';
        this.errorMessage = '';
        this.route.navigate(['/login']);
      },
      error => {
        this.successMessage = '';
        this.errorMessage = 'Failed to submit application. Please try again.';
      }
    );
  }

  onFileChange(event: any, controlName: string) {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFiles[controlName] = fileList[0];
      this.isFileSelected = true;  // Add this line
    }
  }
  
}
