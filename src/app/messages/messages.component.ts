import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[] = [];
  currentUser: any;

  constructor(private messageService: MessageService, private storageService: StorageService) { }


  ngOnInit(): void {

    this.currentUser = this.storageService.getUser();

    // Fetch the user's message history from the service
    this.messageService.getMessagesByUserName(this.currentUser.username).subscribe((data: Message[]) => {
      console.log('hello from message.ts', this.currentUser.username)
      this.messages = data;
      console.log(this.messages)
    });
  }

}
