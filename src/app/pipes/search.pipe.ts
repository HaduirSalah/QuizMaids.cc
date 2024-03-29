import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {

  transform(users: any[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }

    const searchId = parseInt(searchTerm);

    /* 
    * this line return Exactly 1 when search by num 1 , 11 when search by num 11 etc.
    ! use includes()  this line return 1,11,12 when search by num 1
      */
    const filteredUsers = users.filter((user) => user.id === searchId);

    if (filteredUsers.length === 0) {
      return [{ id: -1, message: 'No user found with the provided ID.' }];
    }

    return filteredUsers;
  }
}
