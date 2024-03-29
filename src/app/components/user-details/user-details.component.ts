import { User } from './../../models/user';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { Location } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userId!:string;
  user!:User;
  constructor(private _activatedRoute: ActivatedRoute, private _userService: UserService,  private _spinner: NgxSpinnerService,private _location:Location) { }
  ngOnInit(): void {
    this.getUserDetailsByID();
  }
  getUserDetailsByID() {
    this._spinner.show();
    this.userId=String(this._activatedRoute.snapshot.paramMap.get('id'));
    this._userService.GetUserDetailsByID(this.userId).subscribe({
      next: (data:any) => {
        this.user = data.data;
        console.log(this.user);
   
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
       
      },
      complete: () => {

        this._spinner.hide();
      }
    });
  }



  goBack(): void {
    this._location.back();
  }
}
