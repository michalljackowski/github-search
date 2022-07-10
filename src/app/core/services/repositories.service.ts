import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from './../models/repository.model';

@Injectable({
  providedIn: 'root'
})
export class RepositoriesService {

  private repositoryUrl = 'https://api.github.com/users';
  private repositoryDetailsUrl = 'https://api.github.com/repos';

  private readonly myToken = '';
  private readonly tokenAuth = { 'Authorization': 'Bearer ' + this.myToken };
  private header = this.tokenAuth;

  constructor(private http: HttpClient) { }

  getRepositories(user: string | null, perPage: number | null, page: number | null, url?: string): Observable<HttpResponse<Repository[]>> {
    return this.http.get<Repository[]>(this.getRepositoriesUrl(user, perPage, page, url), { observe: 'response' });
  }

  getRepositoryDetails(user: string, repositoryName: string): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.repositoryDetailsUrl}/${user}/${repositoryName}/languages`);
  }

  private getRepositoriesUrl(user: string | null, perPage: number | null, page: number | null, url?: string): string {
    if (url) {
      return url;
    } else {
      return  `${this.repositoryUrl}/${user}/repos?per_page=${perPage}&page=${page}`;
    }
  }
}
