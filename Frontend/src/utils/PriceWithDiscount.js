export const priceWithDiscount = (price, dis = 0) => {
  const discountAmount = Math.ceil((Number(price) * Number(dis)) / 100);

  const actualPrice = Number(price) - Number(discountAmount);

  return actualPrice;
};
