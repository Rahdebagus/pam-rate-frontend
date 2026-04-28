export function DerivedValuesBox({ usdValue }) {
  const usd = Number(usdValue || 0);
  const usdT = usd ? usd - 200 : "";
  const usdK = usd ? 14000 : "";

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #E3F2FD, #EDE7F6)",
        borderRadius: 12,
        padding: "12px 14px",
        marginBottom: 16,
        border: "1px solid #BBDEFB",
        "@media (min-width: 640px)": { padding: "14px 16px", marginBottom: 20 }
      }}
    >
      <div style={{ fontWeight: 800, color: "#0D47A1", fontSize: 12, marginBottom: 8, "@media (min-width: 640px)": { fontSize: 13 } }}>
        📐 Auto-Derived Values (from USD)
      </div>
      <div style={{ display: "flex", gap: 12, "@media (min-width: 640px)": { gap: 16 } }}>
        {[
          ["USD T", usdT],
          ["USD K", usdK],
        ].map(([label, val]) => (
          <div
            key={label}
            style={{
              background: "#fff",
              borderRadius: 8,
              padding: "8px 12px",
              flex: 1,
              textAlign: "center",
              border: "1px solid #BBDEFB",
              "@media (min-width: 640px)": { padding: "8px 16px" }
            }}
          >
            <div style={{ fontSize: 11, color: "#607D8B", fontWeight: 600, "@media (min-width: 640px)": { fontSize: 12 } }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: "#1565C0", "@media (min-width: 640px)": { fontSize: 18 } }}>
              {val ? Number(val).toLocaleString("id-ID") : "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
