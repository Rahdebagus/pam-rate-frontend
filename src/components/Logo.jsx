
// ─── Logo Component (Using Image) ─────────────────────────────────────────────
import pamLogo from "../assets/pam_logo.png";
import { APP_COMPANY } from "../constants/currencies.js";

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {/* Logo Image */}
      <img
          src={pamLogo}
        alt="PAM Money Changer"
        style={{
          height: 70,
          width: "auto",
          maxWidth: 120,
          objectFit: "contain",
        }}
      />
      {/* Company Info */}

    </div>
  );
}
