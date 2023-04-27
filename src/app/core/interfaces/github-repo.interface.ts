import { GithubUser } from './github-user.interface';

export interface GithubRepo {
  name: string;
  full_name: string;
  created_at: string;
  default_branch: string;
  description: string;
  homepage: string;
  id: number;
  language: string;
  owner: GithubUser;
  size: number;
  topics: string[];
  updated_at: string;
  watchers: number;
}
