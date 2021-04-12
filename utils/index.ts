export const regex_onlyNumber = /[^0-9]/g;
export const regex_firstZero = /(^0+)/;

export const inputFormatter = (input: string): string => {
  const onlyNumber = input.replace(regex_onlyNumber, '');
  const removedFirstZero = onlyNumber.replace(regex_firstZero, '');
  return removedFirstZero;
};

export const numberWithCommas = (input: number | string) => {
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
