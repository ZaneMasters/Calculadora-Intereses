// Formatea número con comas y sin decimales si es entero
export const formatNumber = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // Quita comas para hacer cálculos
  export const unformat = (val) => Number(val.replace(/,/g, ''));
  