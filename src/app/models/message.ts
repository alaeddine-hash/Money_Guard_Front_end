import {User} from "./user";

export class Message{
  msg_id : number = 0 ;
  object : string = '';
  date   : string = '';
  sender : User = new User();
  recipient : User = new User();
  recipient_id : number = 0;
  sender_id : number = 0;
}
