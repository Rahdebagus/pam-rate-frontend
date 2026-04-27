// ─── Generated Design Preview Component ───────────────────────────────────────

import { generateRateBoardFilename } from "../../../utils/formatters.js";

export function GeneratedDesignPreview({ imageUrl, onReset }) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = generateRateBoardFilename();
    a.click();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#0D47A1",
              marginBottom: 4,
            }}
          >
            ✅ Rate Board Generated
          </h2>
          <p style={{ fontSize: 13, color: "#607D8B" }}>
            Your branded rate board is ready. Preview and download below.
          </p>
        </div>
        <div
          style={{
            background: "#E8F5E9",
            borderRadius: 50,
            padding: "6px 14px",
            color: "#2E7D32",
            fontWeight: 800,
            fontSize: 13,
            border: "1px solid #A5D6A7",
          }}
        >
          ✓ Ready
        </div>
      </div>

      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(21,101,192,0.18)",
          border: "2px solid #BBDEFB",
          marginBottom: 20,
        }}
      >
        <img
          src={imageUrl}
          alt="Generated Rate Board"
          style={{ width: "100%", display: "block" }}
        />
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={handleDownload}
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #0D47A1, #1E88E5)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "14px",
            fontWeight: 900,
            fontSize: 15,
            cursor: "pointer",
            boxShadow: "0 6px 20px rgba(13,71,161,0.3)",
          }}
        >
          ⬇️ Download PNG
        </button>
        <button
          onClick={onReset}
          style={{
            flex: 1,
            background: "#fff",
            color: "#1565C0",
            border: "2px solid #1E88E5",
            borderRadius: 12,
            padding: "14px",
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          🔄 New Rate Board
        </button>
      </div>
    </div>
  );
}
