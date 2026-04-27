// ─── Rate Board State Hook ────────────────────────────────────────────────────

import { useState } from "react";

/**
 * Custom hook for managing rate board workflow state
 * @returns {Object} Rate board state and handlers
 */
export const useRateBoard = () => {
  const [step, setStep] = useState(1); // 1=upload, 2=edit, 3=preview
  const [rates, setRates] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOCRResult = (extractedRates) => {
    setRates(extractedRates);
    setStep(2);
  };

  const handleGenerateComplete = (blob) => {
    const url = URL.createObjectURL(blob);
    setImageUrl(url);
    setStep(3);
  };

  const handleReset = () => {
    setStep(1);
    setRates({});
    setImageUrl(null);
    setLoading(false);
  };

  return {
    step,
    rates,
    imageUrl,
    loading,
    setStep,
    setRates,
    setImageUrl,
    setLoading,
    handleOCRResult,
    handleGenerateComplete,
    handleReset,
  };
};
