// ─── Formatting Utilities ─────────────────────────────────────────────────────

/**
 * Format currency rate for display
 * @param {string} code - Currency code (e.g., "USD", "JPY")
 * @param {number|string|null} val - Rate value
 * @returns {string} Formatted rate or "-" if invalid
 */
export const formatRate = (code, val) => {
  if (val === null || val === undefined || val === "") return "-";
  
  const n = parseFloat(val);
  if (isNaN(n)) return "-";
  
  if (code === "JPY" && n < 1000) return n.toFixed(2);
  if (n < 500) return Math.round(n).toLocaleString();
  
  return Math.round(n).toLocaleString("id-ID");
};

/**
 * Generate filename for download
 * @returns {string} Filename with date
 */
export const generateRateBoardFilename = () => {
  const date = new Date().toISOString().slice(0, 10);
  return `pam_rate_board_${date}.png`;
};
