import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent  {
  userInput: string = '';
  maxLength: number = 50;
  response: string = '';
  chatMessages: any[] = [];  // Add this line
  backendUrl: string = 'http://localhost:8082/api';

  constructor(private http: HttpClient, public chatService : ChatService) {}

  generateResponse() {
    const request = {
      input: this.userInput,
      max_length: this.maxLength
    };

    this.chatMessages.push({ text: this.userInput, isCurrentUser: true });  // Add this line

    this.http.post<any>(`${this.backendUrl}/chatbot/generate`, request)
      .subscribe(response => {
        this.response = response.response;
        this.chatMessages.push({ text: this.response, isCurrentUser: false });  // Add this line
      });
  }
  

}
