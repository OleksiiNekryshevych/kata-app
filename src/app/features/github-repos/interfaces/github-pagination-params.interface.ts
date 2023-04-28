import { Order } from '../../../core/types/order.type';

export interface GithubPaginationParams {
  q: string;
  page: number;
  perPage: number;
  sort: string;
  order: Order;
}
