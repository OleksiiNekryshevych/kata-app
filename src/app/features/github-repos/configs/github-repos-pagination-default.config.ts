import { GithubPaginationParams } from '../interfaces/github-pagination-params.interface';

export const githubReposPaginationDefaultConfig: GithubPaginationParams = {
  page: 1,
  perPage: 100,
  q: 'stars:>30000',
  order: 'desc',
  sort: 'stars',
};
