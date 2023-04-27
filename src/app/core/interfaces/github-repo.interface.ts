import { GithubUser } from './github-user.interface';

export interface GithubRepo {
  name: string;
  created_at: string;
  default_branch: string;
  description: string;
  homepage: string;
  id: number;
  owner: GithubUser;
  language: string;
  size: number;
  topics: string[];
  updated_at: string;
  watchers: number;
  url: string;
}
