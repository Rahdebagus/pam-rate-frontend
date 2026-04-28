// ─── Header Component ─────────────────────────────────────────────────────────

import { Logo } from "../Logo";
import { StepBadge } from "../Steps/Common/StepBadge";
import { STEPS, APP_VERSION } from "../../constants/currencies.js";

export function Header({ currentStep }) {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #E3F2FD",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(21,101,192,0.08)",
        flexWrap: "wrap",
        gap: "12px",
        "@media (min-width: 768px)": {
          padding: "14px 32px",
        }
      }}
    >
      <Logo />
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", justifyContent: "center", flex: "1 1 auto", "@media (min-width: 768px)": { gap: 28, flex: "1 1 auto" } }}>
        {STEPS.map((s) => (
          <StepBadge
            key={s.n}
            {...s}
            active={currentStep === s.n}
            done={currentStep > s.n}
          />
        ))}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#90A4AE",
          background: "#F5F5F5",
          padding: "6px 12px",
          borderRadius: 8,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ display: "none", "@media (min-width: 768px)": { display: "inline" } }}>Internal Rate System </span>v{APP_VERSION}
      </div>
    </header>
  );
}
