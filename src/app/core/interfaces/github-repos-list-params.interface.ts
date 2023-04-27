export interface GithubReposListParams {
  page: number;
  starts: number;
  perPage: number;
  order: OrderType;
}

export type OrderType = 'desc' | 'asc';
