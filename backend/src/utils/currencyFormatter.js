export function formatINR(amount) {
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `₹${cr} Crore${cr > 1 ? 's' : ''}`;
  } else if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `₹${lakh} Lakh${lakh > 1 ? 's' : ''}`;
  } else {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(amount);
  }
}

export function getCurrentISTTimestamp() {
  return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'medium' }) + ' IST';
}

export function getCurrentFinancialYear() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12
  if (month >= 4) {
    return `FY ${year}-${String((year + 1) % 100).padStart(2, '0')}`;
  } else {
    return `FY ${year - 1}-${String(year % 100).padStart(2, '0')}`;
  }
}
