// currency formatter
const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  })
  
  export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
  }
  
  //date
  const today = new Date();

export const formattedDate = today.toLocaleDateString("en-UK", {
  year: "numeric",
  month: "short",
  day: "numeric",
});


