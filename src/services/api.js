// ─── API Service ──────────────────────────────────────────────────────────────

import { API_BASE } from "../constants/currencies.js";

/**
 * Upload image file and extract rates via OCR
 * @param {File} file - Image file
 * @returns {Promise<Object>} Extracted rates { currency: rate }
 */
export const uploadAndExtractRates = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    
    const res = await fetch(`${API_BASE}/upload`, {
      method: "POST",
      body: formData,
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Upload failed");
    }
    
    const data = await res.json();
    return data.rates;
  } catch (error) {
    throw new Error(error.message || "Failed to process image. Make sure the backend is running.");
  }
};

/**
 * Generate rate board image from rates
 * @param {Object} rates - Currency rates { currency: rate }
 * @returns {Promise<Blob>} Generated image blob
 */
export const generateRateBoard = async (rates) => {
  try {
    const res = await fetch(`${API_BASE}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rates),
    });
    
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Generation failed");
    }
    
    return await res.blob();
  } catch (error) {
    throw new Error(error.message || "Failed to generate rate board");
  }
};
