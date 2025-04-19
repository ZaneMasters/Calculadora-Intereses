import bankOptions from './bankOptions.json';

export const getBankSettings = (bankKey) => {
  return bankOptions[bankKey] || { tasaEA: 0, capitalizacion: 'mensual' };
};
