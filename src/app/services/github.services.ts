// import { TestBed } from '@angular/core/testing';

// import { ApiService } from './api.service';

// describe('ApiService', () => {
//   let service: ApiService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ApiService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, retry, throwError} from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from 'src/credentials/GithubCred';
// import { CLIENT_ID, CLIENT_SECRET } from '../credentials/GithubCred';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private httpClient:HttpClient) { }

  public getProfile(searchQuery: any):Observable<any>{
    let dataURL = `https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    return this.httpClient.get<any>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    );

  }

  public getRepos(searchQuery: any):Observable<any[]>{
    let dataURL = `https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    return this.httpClient.get<any[]>(dataURL).pipe(
      retry(1),
      catchError(this.handleErrors)
    );

  }


  public handleErrors(error:HttpErrorResponse){
    let errorMessage:string;
    if(error.error instanceof ErrorEvent){
      errorMessage = `MESSAGE : ${error.error.message}`;

    }
    else{
      errorMessage = `STATUS : ${error.status} MESSAGE : ${error.message}`;
    }
    return throwError(errorMessage);
  }





}