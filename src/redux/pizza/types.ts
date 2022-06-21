export type PizzaItem = {
  id: number;
  concatedKey: string;
  image: string;
  title: string;
  sizes: string[];
  types: string[];
  price: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  pizza: PizzaItem;
  items: PizzaItem[];
  pagesCount: number;
  limit: number;
  status: Status;
}

export type FetchPizzaArgs = {
  category: string;
  orderBy: string;
  search: string;
  currentPage?: number;
};
