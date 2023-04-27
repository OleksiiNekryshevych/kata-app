export interface GithubPaginationParams {
  q: string;
  page: number;
  perPage: number;
  sort: string;
  order: OrderType;
}

export type OrderType = 'desc' | 'asc';
