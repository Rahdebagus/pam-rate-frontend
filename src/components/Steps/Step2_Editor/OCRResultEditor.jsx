// ─── OCR Result Editor Component ───────────────────────────────────────────────

import { useState } from "react";
import { ALL_CURRENCIES, LEFT_COL, RIGHT_COL } from "../../../constants/currencies.js";
import { CurrencyInput } from "./CurrencyInput.jsx";
import { DerivedValuesBox } from "./DerivedValuesBox.jsx";

export function OCRResultEditor({ rates, onGenerate, loading }) {
  const [values, setValues] = useState(() => {
    const init = {};
    ALL_CURRENCIES.forEach((c) => {
      init[c] = rates[c] ?? "";
    });
    return init;
  });
  const [error, setError] = useState(null);

  const usdVal = parseFloat(values["USD"]) || 0;

  const handleChange = (code, val) => {
    setValues((prev) => ({ ...prev, [code]: val }));
  };

  const handleGenerate = () => {
    const payload = {};
    let hasAny = false;

    ALL_CURRENCIES.forEach((code) => {
      const v = parseFloat(values[code]);
      if (!isNaN(v) && v > 0) {
        payload[code] = v;
        hasAny = true;
      }
    });

    if (!hasAny) {
      setError("Please enter at least one rate.");
      return;
    }

    setError(null);
    onGenerate(payload);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "flex-start",
          marginBottom: 20,
          "@media (min-width: 640px)": {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: "#0D47A1",
              marginBottom: 4,
              "@media (min-width: 640px)": { fontSize: 20 }
            }}
          >
            Edit Extracted Rates
          </h2>
          <p style={{ fontSize: 13, color: "#607D8B" }}>
            Review and correct the OCR results. All fields are editable.
          </p>
        </div>
        <div
          style={{
            background: "#E3F2FD",
            borderRadius: 10,
            padding: "8px 16px",
            textAlign: "center",
            minWidth: "140px",
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 10, color: "#1565C0", fontWeight: 600 }}>
            DETECTED
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#0D47A1" }}>
            {ALL_CURRENCIES.filter((c) => values[c]).length}
          </div>
          <div style={{ fontSize: 10, color: "#1565C0" }}>currencies</div>
        </div>
      </div>

      {/* USD derived values */}
      <DerivedValuesBox usdValue={usdVal} />

      {/* Rate Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 16,
          marginBottom: 20,
          "@media (min-width: 640px)": {
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#90A4AE",
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            LEFT COLUMN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {LEFT_COL.map((c) => (
              <CurrencyInput
                key={c}
                code={c}
                value={values[c]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#90A4AE",
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            RIGHT COLUMN
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {RIGHT_COL.map((c) => (
              <CurrencyInput
                key={c}
                code={c}
                value={values[c]}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: "10px 16px",
            background: "#FFEBEE",
            borderRadius: 8,
            color: "#C62828",
            fontSize: 13,
            marginBottom: 16,
            border: "1px solid #FFCDD2",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          width: "100%",
          background: loading
            ? "#CFD8DC"
            : "linear-gradient(135deg, #0D47A1, #1E88E5)",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          padding: "14px",
          fontWeight: 900,
          fontSize: 16,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 6px 20px rgba(13,71,161,0.3)",
          letterSpacing: 0.5,
          transition: "all 0.25s",
        }}
      >
        {loading ? "⏳ Generating Design..." : "🎨 Generate Design"}
      </button>
    </div>
  );
}
