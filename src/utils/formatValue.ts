export const formatValue = (value: number): string => {
  const formatter = new Intl.NumberFormat([],{
    style: 'currency',
    currency: 'BRL'
  });

  return formatter.format(value);
}

export const dateFormat = (value: Date): string => {
  const formatter = new Intl.DateTimeFormat([], {
    localeMatcher: "en-US"
  });

  return formatter.format(value);
}