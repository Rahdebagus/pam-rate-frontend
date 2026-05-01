const API_BASE = "http://localhost:8000";



export const uploadAndExtractRates = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Upload failed");
  return data.rates || {};
};

export const uploadBlocksAndExtractRates = async ({ left, middle, right }) => {
  const formData = new FormData();
  formData.append("left", left);
  formData.append("middle", middle);
  formData.append("right", right);

  const res = await fetch(`${API_BASE}/upload-blocks`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || "Block upload failed");
  return data.rates || {};
};

export const generateRateBoard = async (rates) => {
  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rates),
  });

  if (!res.ok) {
    let message = "Generate failed";
    try {
      const data = await res.json();
      message = data.detail || message;
    } catch (_) {}
    throw new Error(message);
  }

  return await res.blob();
};
