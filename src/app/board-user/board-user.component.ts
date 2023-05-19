import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  content?: string;
  id?: number = 0;
  private currentUser: any;
  constructor(private userService: UserService , private  storageService : StorageService) { }

  ngOnInit(): void {

    const user =  this.storageService.getUser();
    this.id = user.id;
    this.userService.getUserBoard().subscribe({
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
  }
}
