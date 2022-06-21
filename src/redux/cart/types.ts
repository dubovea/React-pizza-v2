type SizeProps = {
  key: number;
  name: string;
};

export type PizzaCartItem = {
  id: number;
  concatedKey?: string;
  count: number;
  image: string;
  title: string;
  size: SizeProps;
  type: SizeProps;
  price: number;
  priceSum: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: PizzaCartItem[];
}
