import { BookProgress } from './BookProgress';

export class Account {
  Id: number = 0;
  Name: string = "";
  UserName: string = "";
  Email: string = "";
  Password: string = "";
  IsAdmin: boolean = false;
  Books: BookProgress[] = [];
}