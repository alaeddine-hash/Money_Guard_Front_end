import {Message} from "./message";
import {Favorite} from "./Favorite";
import {Rating} from "./Rating";
import {Reservation} from "./Reservation";
import {Solution} from "./Solution";
import {Location} from "./Location";


export class User {
  id? : number ;
  name  : string='';
  lastname: string='';
  birthday: string='';
  phone: string='';
  email: string='';
  username: string='';
  password: string='';
  role: string='';
  message_one : Message[] = [];
  message_two : Message[] = [];
  favorites? : Favorite[];
  clientRatings? : Rating[];
  providerRatings? : Rating[];
  reservations? : Reservation;
  solutions? : Solution[];
  location? : Location


}
