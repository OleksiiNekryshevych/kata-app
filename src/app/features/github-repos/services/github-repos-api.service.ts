import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GithubRepo } from '../../../core/interfaces/github-repo.interface';
import { GithubReposResponse } from '../../../core/interfaces/github-repos-response.interface';
import { GithubReposListParams } from '../../../core/interfaces/github-repos-list-params.interface';
import { GithubReadmeResponse } from '../../../core/interfaces/github-readme-response.interface';

const githubApiUrl = 'https://api.github.com';

@Injectable({ providedIn: 'root' })
export class GithubReposApiService {
  constructor(private httpClient: HttpClient) {}

  public getGithubRepos(
    params: GithubReposListParams
  ): Observable<GithubReposResponse> {
    return this.httpClient.get<GithubReposResponse>(
      `${githubApiUrl}/search/repositories?q=stars:>${params.starts}&sort=stars&order=${params.order}&page=${params.page}&per_page=${params.perPage}` //TODO: handle queryParams properly
    );
  }

  public getRepoById(id: number): Observable<GithubRepo> {
    return this.httpClient.get<GithubRepo>(
      `${githubApiUrl}/repositories/${id}`
    );
  }

  public getRepoReadme(url: string): Observable<GithubReadmeResponse> {
    return this.httpClient.get<GithubReadmeResponse>(`${url}/readme`);
  }
}
