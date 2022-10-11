import { Component, OnInit } from '@angular/core';
import { UsersService } from '@frontend/users';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  constructor(private userServices: UsersService){

  }
  ngOnInit(): void {
    this.userServices.initAppSession();
  }
  title = 'brightly';
}
