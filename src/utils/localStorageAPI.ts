export const getLocalStorageItems = () => {
  const data = localStorage.getItem('items');
  return data ? JSON.parse(data) : [];
};

export const getLocalStorageTotalPrice = () => {
  const totalPrice = localStorage.getItem('totalPrice');
  return totalPrice ? +totalPrice : 0;
};
