// ─── Step 1: Upload Rate Image Component ──────────────────────────────────────

import { useState } from "react";
import { useFileUpload } from "../../../hooks/useFileUpload.js";
import { uploadAndExtractRates } from "../../../services/api.js";
import { SUPPORTED_IMAGE_TYPES } from "../../../constants/currencies.js";

export function UploadRateImage({ onResult, loading, setLoading }) {
  const validateFile = (file) => {
    if (!file) return false;
    if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) return false;
    // Add size validation (max 10MB)
    if (file.size > 10 * 1024 * 1024) return false;
    return true;
  };

  const upload = useFileUpload(null, validateFile);

  const handleSubmit = async () => {
    if (!upload.file) return;
    
    setLoading(true);
    upload.setError(null);
    
    try {
      const rates = await uploadAndExtractRates(upload.file);
      onResult(rates);
    } catch (error) {
      upload.setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: "#0D47A1",
          marginBottom: 6,
        }}
      >
        Upload Rate Board Image
      </h2>
      <p style={{ fontSize: 13, color: "#607D8B", marginBottom: 20 }}>
        Upload a screenshot or photo of a rate board from BI or Authorized Money
        Changer.
      </p>

      {/* Drop Zone */}
      <div
        onDrop={upload.handleDrop}
        onDragOver={upload.handleDragOver}
        onDragLeave={upload.handleDragLeave}
        onClick={() => upload.inputRef.current?.click()}
        style={{
          border: `2px dashed ${upload.dragOver ? "#1E88E5" : "#BBDEFB"}`,
          borderRadius: 16,
          background: upload.dragOver ? "#E3F2FD" : "#F8FBFF",
          padding: "40px 20px",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.25s",
          minHeight: 180,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          ref={upload.inputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => upload.handleFile(e.target.files[0])}
        />
        {upload.preview ? (
          <img
            src={upload.preview}
            alt="Preview"
            style={{
              maxHeight: 220,
              maxWidth: "100%",
              borderRadius: 10,
              boxShadow: "0 4px 20px rgba(21,101,192,0.15)",
              objectFit: "contain",
            }}
          />
        ) : (
          <>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
            <div style={{ fontWeight: 700, color: "#1565C0", fontSize: 16 }}>
              Drop image here or click to browse
            </div>
            <div style={{ color: "#90A4AE", fontSize: 12, marginTop: 6 }}>
              PNG, JPG, WEBP supported (max 10MB)
            </div>
          </>
        )}
      </div>

      {upload.error && (
        <div
          style={{
            marginTop: 12,
            padding: "10px 16px",
            background: "#FFEBEE",
            borderRadius: 8,
            color: "#C62828",
            fontSize: 13,
            border: "1px solid #FFCDD2",
          }}
        >
          ⚠️ {upload.error}
        </div>
      )}

      {/* Action Row */}
      <div style={{ marginTop: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={handleSubmit}
          disabled={!upload.file || loading}
          style={{
            background:
              upload.file && !loading
                ? "linear-gradient(135deg, #1565C0, #1E88E5)"
                : "#CFD8DC",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "12px 28px",
            fontWeight: 800,
            fontSize: 15,
            cursor: upload.file && !loading ? "pointer" : "not-allowed",
            boxShadow:
              upload.file && !loading ? "0 4px 15px rgba(21,101,192,0.3)" : "none",
            transition: "all 0.25s",
          }}
        >
          {loading ? "🔍 Scanning..." : "🔍 Extract Rates"}
        </button>
        {upload.preview && (
          <button
            onClick={() => upload.clear()}
            style={{
              background: "none",
              border: "1px solid #CFD8DC",
              borderRadius: 10,
              padding: "12px 20px",
              color: "#607D8B",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
