// Utility for formatting numbers as Brazilian currency without the symbol
// Returns string like "2.000,00" given numeric 2000

export function formatBRL(value) {
  if (value == null || isNaN(value)) {
    return '0,00'
  }
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
