import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://reqres.in/api/users';
  private searchTermSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  searchTerm$ = this.searchTermSubject.asObservable();
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  GetAllUsers(page: number): Observable<any> {
    const cacheKey = `users_page_${page}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    } else {
      return this.http.get(`${this.baseUrl}?page=${page}`).pipe(
        map((data: any) => {
          this.cacheService.set(cacheKey, data);
          return data;
        }),
        catchError((error: any) => {
          throw error;
        })
      );
    }
  }

  GetUserDetailsByID(id: string): Observable<User> {
    const cacheKey = `user_id_${id}`;
    if (this.cacheService.has(cacheKey)) {
      return of(this.cacheService.get(cacheKey));
    } else {
      return this.http.get(`${this.baseUrl}/${id}`).pipe(
        map((data: any) => {
          this.cacheService.set(cacheKey, data);
          return data;
        }),
        catchError((error: any) => {
          throw error;
        })
      );
    }
  }

  setSearchTerm(searchTerm: string): void {
    this.searchTermSubject.next(searchTerm);
  }
}
