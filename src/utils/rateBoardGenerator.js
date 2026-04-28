// ─── Professional Rate Board Canvas Renderer ──────────────────────────────────

import { CURRENCY_LABELS, ALL_CURRENCIES, LEFT_COL, RIGHT_COL, APP_COMPANY } from '../../../constants/currencies.js';
import { formatRate } from '../../../utils/formatters.js';

/**
 * Generates a professional rate board image as canvas
 * @param {Object} rates - Currency rates
 * @param {string} logoUrl - Logo image URL
 * @returns {Promise<string>} Data URL of the generated image
 */
export const generateRateBoardImage = async (rates, logoUrl) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Canvas dimensions (A4 landscape)
  const width = 1200;
  const height = 800;
  canvas.width = width;
  canvas.height = height;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#F0F4F8');
  gradient.addColorStop(1, '#E3F2FD');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Header section with logo and title
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, 120);

  // Draw logo if available
  if (logoUrl) {
    try {
      const logo = await loadImage(logoUrl);
      ctx.drawImage(logo, 20, 10, 100, 100);
    } catch (e) {
      console.warn('Could not load logo');
    }
  }

  // Company name and title
  ctx.fillStyle = '#0D47A1';
  ctx.font = 'bold 32px Arial';
  ctx.fillText('MONEY CHANGER', 140, 45);

  ctx.fillStyle = '#607D8B';
  ctx.font = '16px Arial';
  ctx.fillText(APP_COMPANY, 140, 70);

  // Divider line
  ctx.strokeStyle = '#1565C0';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 120);
  ctx.lineTo(width, 120);
  ctx.stroke();

  // Table setup
  const tableTop = 140;
  const colWidth = width / 4;
  const rowHeight = 50;
  const rows = Math.ceil(ALL_CURRENCIES.length / 2);

  // Helper function to draw table cell
  const drawCell = (x, y, w, h, text, isBold = false, isHeader = false) => {
    // Cell background
    ctx.fillStyle = isHeader ? '#1565C0' : y % (rowHeight * 2) === 0 ? '#E3F2FD' : '#FFFFFF';
    ctx.fillRect(x, y, w, h);

    // Cell border
    ctx.strokeStyle = '#BBDEFB';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);

    // Text
    ctx.fillStyle = isHeader ? '#FFFFFF' : '#0D47A1';
    ctx.font = isBold ? 'bold 18px Arial' : '16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w / 2, y + h / 2);
  };

  // Table headers
  const headers = ['CURRENCIES', 'RATE', 'CURRENCIES', 'RATE'];

  headers.forEach((header, idx) => {
    drawCell(idx * colWidth, tableTop, colWidth, rowHeight, header, true, true);
  });

  // Table data rows
  let leftIdx = 0;
  let rightIdx = 0;

  for (let row = 0; row < rows; row++) {
    const y = tableTop + (row + 1) * rowHeight;

    // Left column - left currencies
    if (leftIdx < LEFT_COL.length) {
      const code = LEFT_COL[leftIdx];
      const rate = rates[code];
      drawCell(0, y, colWidth, rowHeight, code, true);
      drawCell(colWidth, y, colWidth, rowHeight, formatRate(code, rate));

      // Add derived values for USD
      if (code === 'USD' && rate) {
        const usd = Number(rates.USD || 0);
        const usdT =  usd - 200 ;
        const usdK = 14000 ;

        // Override with derived values display
        ctx.fillStyle = '#F9F9F9';
        ctx.fillRect(colWidth, y, colWidth, rowHeight);
        ctx.fillStyle = '#0D47A1';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        ctx.fillText('USD T', colWidth + colWidth / 2, y + 18);
        ctx.font = 'bold 14px Arial';
        ctx.fillText(formatRate('USD', usdT), colWidth + colWidth / 2, y + 35);
      }

      leftIdx++;
    }

    // Right column - right currencies
    if (rightIdx < RIGHT_COL.length) {
      const code = RIGHT_COL[rightIdx];
      const rate = rates[code];
      drawCell(colWidth * 2, y, colWidth, rowHeight, code, true);
      drawCell(colWidth * 3, y, colWidth, rowHeight, formatRate(code, rate));
      rightIdx++;
    }
  }

  // Footer
  const footerY = height - 40;
  ctx.fillStyle = '#1565C0';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('RATES CAN CHANGE AT ANYTIME', width / 2, footerY + 10);

  // Return canvas as image URL
  return canvas.toDataURL('image/png');
};

/**
 * Helper to load image from URL
 */
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = url;
  });
};
