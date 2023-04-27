import { OrderType } from '../../../core/types/oreder-type.type';

export interface GithubPaginationParams {
  q: string;
  page: number;
  perPage: number;
  sort: string;
  order: OrderType;
}
