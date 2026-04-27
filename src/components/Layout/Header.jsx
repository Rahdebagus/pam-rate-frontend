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
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(21,101,192,0.08)",
      }}
    >
      <Logo />
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
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
          fontSize: 12,
          color: "#90A4AE",
          background: "#F5F5F5",
          padding: "6px 12px",
          borderRadius: 8,
        }}
      >
        Internal Rate System {APP_VERSION}
      </div>
    </header>
  );
}
