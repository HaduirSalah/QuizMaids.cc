import { UserService } from './../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { RouterLink, RouterLinkActive } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatFormField, FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
 
  constructor(private _userService: UserService) { }

  onSearchTermChange(event: any): void {
    const searchTerm = event?.target?.value; 
    if (searchTerm !== undefined) {
      this._userService.setSearchTerm(searchTerm); 
    }
  }
  }
  
  
  

