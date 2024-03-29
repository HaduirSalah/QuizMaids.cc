import { Component } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchPipe } from "../../pipes/search.pipe";

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.css',
    imports: [MatCardModule, CommonModule, RouterModule, MatPaginatorModule, SearchPipe]
})
export class UserListComponent {
  users: User[] = [];
  totalUsers!: number;
  usersPerPage!: number;
  currentPage!: number;
  filteredUsers: User[] = [];
  searchTerm!: string;
  totalPages!:number;
  showPaginator: boolean = true;

  constructor(private _userService: UserService, private _spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this._userService.searchTerm$.subscribe(searchTerm => {
      this.searchTerm = searchTerm;
  
    });
    
  }

  getAllUsers(): void {
    this._spinner.show();
    this._userService.GetAllUsers(this.currentPage).subscribe({
      next: (data) => {
        this.users = data.data;
        console.log(this.users);
        this.showPaginator = this.users.length > 0 && !this.searchTerm;
        this.usersPerPage = data.per_page;
        this.currentPage = data.page;
        this.totalUsers = data.total;
        this.totalPages=data.total_pages;

      },
      error: (err) => {
        console.error('Error fetching users:', err);
       

      },
      complete: () => {
        
        this._spinner.hide();
      }
    });
  }


  handlePageEvent(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.getAllUsers();
  }

 

}
