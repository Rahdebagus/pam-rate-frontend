// ─── Rate Board Generator Page ────────────────────────────────────────────────

import { useRateBoard } from "../hooks/useRateBoard.js";
import { generateRateBoard } from "../services/api.js";
import {
  Header,
  Footer,
  InfoCards,
  UploadRateImage,
  OCRResultEditor,
  GeneratedDesignPreview,
} from "../components/index.js";

export default function RateBoardPage() {
  const {
    step,
    rates,
    imageUrl,
    loading,
    setLoading,
    handleOCRResult,
    handleGenerateComplete,
    handleReset,
  } = useRateBoard();

  const handleGenerate = async (correctedRates) => {
    setLoading(true);
    try {
      const blob = await generateRateBoard(correctedRates);
      handleGenerateComplete(blob);
    } catch (error) {
      alert("Generation failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0F4F8",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* ── Top Nav ─────────────────────────────────────────────────────── */}
      <Header currentStep={step} />

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main style={{ maxWidth: 960, margin: "20px auto", padding: "0 12px", "@media (min-width: 640px)": { margin: "40px auto", padding: "0 24px" } }}>
        {/* Page Title */}
        <div style={{ marginBottom: 24, textAlign: "center", "@media (min-width: 640px)": { marginBottom: 32 } }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#0D47A1",
              marginBottom: 8,
              "@media (min-width: 640px)": { fontSize: 28 },
            }}
          >
            Rate Board Generator
          </h1>
          <p style={{ color: "#607D8B", fontSize: 13, "@media (min-width: 640px)": { fontSize: 15 } }}>
            Upload any rate board image → OCR extracts rates → Edit → Generate
            branded PAM design
          </p>
        </div>

        {/* ── Step Card ───────────────────────────────────────────────────── */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "20px 16px",
            boxShadow: "0 4px 24px rgba(21,101,192,0.10)",
            border: "1px solid #E3F2FD",
            "@media (min-width: 640px)": { borderRadius: 20, padding: "36px 40px" }
          }}
        >
          {step === 1 && (
            <UploadRateImage
              onResult={handleOCRResult}
              loading={loading}
              setLoading={setLoading}
            />
          )}
          {step === 2 && (
            <OCRResultEditor
              rates={rates}
              onGenerate={handleGenerate}
              loading={loading}
            />
          )}
          {step === 3 && imageUrl && (
            <GeneratedDesignPreview
              imageUrl={imageUrl}
              onReset={handleReset}
            />
          )}
        </div>

        {/* ── Info Cards ──────────────────────────────────────────────────── */}
        {step === 1 && <InfoCards />}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
