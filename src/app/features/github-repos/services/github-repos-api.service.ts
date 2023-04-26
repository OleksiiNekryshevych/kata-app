import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GithubReposResponse } from '../../../core/interfaces/github-repos-response.interface';
import { GithubRepo } from 'src/app/core/interfaces/github-repo.interface';

const githubApiUrl = 'https://api.github.com';

@Injectable({ providedIn: 'root' })
export class GithubReposApiService {
  constructor(private httpClient: HttpClient) {}

  public getGithubRepos(): Observable<GithubReposResponse> {
    return this.httpClient.get<GithubReposResponse>(
      `${githubApiUrl}/search/repositories?q=stars:>0&sort=stars&order=desc`
    );
  }

  public getRepoById(id: number): Observable<GithubRepo> {
    return this.httpClient.get<GithubRepo>(
      `${githubApiUrl}/repositories/${id}`
    );
  }
}
