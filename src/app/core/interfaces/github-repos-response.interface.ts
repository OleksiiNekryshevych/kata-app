import { GithubRepo } from './github-repo.interface';

export interface GithubReposResponse {
  items: GithubRepo[];
  total_count: number;
}
