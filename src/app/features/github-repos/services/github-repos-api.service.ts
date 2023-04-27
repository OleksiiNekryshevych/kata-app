import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GithubRepo } from '../interfaces/github-repo.interface';
import { GithubReposResponse } from '../interfaces/github-repos-response.interface';
import { GithubPaginationParams } from '../interfaces/github-pagination-params.interface';
import { GithubReadmeResponse } from '../interfaces/github-readme-response.interface';
import { GithubRepoQueryParameter } from '../interfaces/github-repo-query-params.interface';

const githubApiUrl = 'https://api.github.com';

@Injectable({ providedIn: 'root' })
export class GithubReposApiService {
  constructor(private httpClient: HttpClient) {}

  public getGithubRepos(
    params: GithubPaginationParams
  ): Observable<GithubReposResponse> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append(
      GithubRepoQueryParameter.PAGE,
      params.page
    );
    queryParams = queryParams.append(
      GithubRepoQueryParameter.PER_PAGE,
      params.perPage
    );
    queryParams = queryParams.append(GithubRepoQueryParameter.QUERY, params.q);
    queryParams = queryParams.append(
      GithubRepoQueryParameter.ORDER,
      params.order
    );
    queryParams = queryParams.append(
      GithubRepoQueryParameter.SORT,
      params.sort
    );

    return this.httpClient.get<GithubReposResponse>(
      `${githubApiUrl}/search/repositories`,
      { params: queryParams }
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
