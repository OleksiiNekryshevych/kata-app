import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { GithubReposApiService } from './github-repos-api.service';
import { GithubPaginationParams } from '../interfaces/github-pagination-params.interface';
import { GithubReposResponse } from '../interfaces/github-repos-response.interface';
import { GithubRepo } from '../interfaces/github-repo.interface';
import { GithubReadmeResponse } from '../interfaces/github-readme-response.interface';

describe('GithubReposApiService', () => {
  const githubApiUrl = 'https://api.github.com';
  let service: GithubReposApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubReposApiService],
    });

    service = TestBed.inject(GithubReposApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getGithubRepos', () => {
    it('should return an Observable<GithubReposResponse>', () => {
      const mockResponse: GithubReposResponse = { total_count: 100, items: [] };
      const params: GithubPaginationParams = {
        page: 1,
        perPage: 30,
        q: 'stars:>0',
        order: 'desc',
        sort: 'stars',
      };

      service.getGithubRepos(params).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${githubApiUrl}/search/repositories?page=1&per_page=30&q=stars:%3E0&order=desc&sort=stars`
      );

      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });
  });

  describe('getRepoById', () => {
    it('should return an Observable<GithubRepo>', () => {
      const expectedRepo: GithubRepo = {
        name: 'repo-1',
        created_at: '',
        default_branch: '',
        description: '',
        homepage: '',
        id: 1,
        owner: {
          avatar_url: '',
          gravatar_id: '',
          html_url: '',
          id: 23,
          login: 'login',
          repos_url: '',
          url: '',
        },
        language: '',
        size: 123,
        topics: [],
        updated_at: '',
        watchers: 555,
        url: '',
      };
      service.getRepoById(expectedRepo.id).subscribe((repo: GithubRepo) => {
        expect(repo).toEqual(expectedRepo);
      });

      const req = httpMock.expectOne(
        `${githubApiUrl}/repositories/${expectedRepo.id}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(expectedRepo);
    });
  });

  describe('getRepoReadme', () => {
    it('should return base64 readme content', () => {
      const mockUrl = `${githubApiUrl}/repos/test-repo`;
      const mockResponse: GithubReadmeResponse = {
        name: 'README.md',
        content: 'VGhpcyBpcyBhIHRlc3QgdGV4dAo=',
        download_url: '',
        sha: '',
        size: 1,
        url: '',
      };
      service.getRepoReadme(mockUrl).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockUrl}/readme`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
