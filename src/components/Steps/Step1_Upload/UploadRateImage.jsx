import { useRef, useState } from 'react';
import { SUPPORTED_IMAGE_TYPES } from '../../../constants/currencies.js';
import { uploadAndExtractRates, uploadBlocksAndExtractRates } from '../../../services/api.js';
import CropImageBox from './CropImageBox.jsx';

function validateFile(file) {
  if (!file) return 'File belum dipilih.';
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) return 'Format harus PNG, JPG, WEBP, atau BMP.';
  if (file.size > 10 * 1024 * 1024) return 'Ukuran maksimal 10MB.';
  return null;
}

function FileBox({ label, hint, file, preview, onChange }) {
  const inputRef = useRef(null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      style={{
        border: '2px dashed #BBDEFB',
        borderRadius: 14,
        background: '#F8FBFF',
        padding: 14,
        minHeight: 145,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/bmp" style={{ display: 'none' }} onChange={(e) => onChange(e.target.files?.[0] || null)} />
      {preview ? (
        <img src={preview} alt={label} style={{ maxHeight: 100, maxWidth: '100%', objectFit: 'contain', borderRadius: 8 }} />
      ) : (
        <>
          <div style={{ fontSize: 28, marginBottom: 8 }}>📷</div>
          <div style={{ fontWeight: 800, color: '#1565C0' }}>{label}</div>
          <div style={{ fontSize: 11, color: '#90A4AE', marginTop: 4 }}>{hint}</div>
        </>
      )}
      {file && <div style={{ fontSize: 11, color: '#607D8B', marginTop: 8 }}>{file.name}</div>}
    </div>
  );
}

export function UploadRateImage({ onResult, loading, setLoading }) {
  const [mode, setMode] = useState('blocks');
  const [single, setSingle] = useState(null);
  const [left, setLeft] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [right, setRight] = useState(null);
  const [error, setError] = useState(null);

  const [fullImage, setFullImage] = useState(null);
  const [fullImageSrc, setFullImageSrc] = useState(null);
  const [cropStep, setCropStep] = useState(null);

  const handleFullImageForCrop = (file) => {
    setFullImage(file);
    setFullImageSrc(URL.createObjectURL(file));
    setCropStep('left');
  };

  const preview = (file) => (file ? URL.createObjectURL(file) : null);

  const handleSubmit = async () => {
    setError(null);

    try {
      setLoading(true);
      let rates = {};

      if (mode === 'blocks') {
        for (const f of [left, middle, right]) {
          const err = validateFile(f);
          if (err) throw new Error('Upload 3 gambar: kiri, tengah, kanan. ' + err);
        }
        rates = await uploadBlocksAndExtractRates({ left, middle, right });
      } else {
        const err = validateFile(single);
        if (err) throw new Error(err);
        rates = await uploadAndExtractRates(single);
      }

      onResult(rates);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0D47A1', marginBottom: 6 }}>Upload Rate Board Image</h2>
      <p style={{ fontSize: 13, color: '#607D8B', marginBottom: 16 }}>Untuk akurasi terbaik, crop/upload 3 gambar: kolom kiri, kolom tengah, dan kolom kanan.</p>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => setMode('blocks')}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: mode === 'blocks' ? '2px solid #1565C0' : '1px solid #CFD8DC',
            background: mode === 'blocks' ? '#E3F2FD' : '#fff',
            color: '#0D47A1',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          3 Crop Images
        </button>
        <button
          type="button"
          onClick={() => setMode('single')}
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 10,
            border: mode === 'single' ? '2px solid #1565C0' : '1px solid #CFD8DC',
            background: mode === 'single' ? '#E3F2FD' : '#fff',
            color: '#0D47A1',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          1 Full Image
        </button>
      </div>

      {mode === 'blocks' ? (
        <div>
          {!fullImageSrc && <FileBox label="Upload Full Image" hint="Upload gambar full, lalu crop 3 kolom" file={fullImage} preview={preview(fullImage)} onChange={handleFullImageForCrop} />}

          {fullImageSrc && cropStep === 'left' && (
            <CropImageBox
              imageSrc={fullImageSrc}
              label="Left Column"
              onCropDone={(file) => {
                setLeft(file);
                setCropStep('middle');
              }}
            />
          )}

          {fullImageSrc && cropStep === 'middle' && (
            <CropImageBox
              imageSrc={fullImageSrc}
              label="Middle Column"
              onCropDone={(file) => {
                setMiddle(file);
                setCropStep('right');
              }}
            />
          )}

          {fullImageSrc && cropStep === 'right' && (
            <CropImageBox
              imageSrc={fullImageSrc}
              label="Right Column"
              onCropDone={(file) => {
                setRight(file);
                setCropStep(null);
              }}
            />
          )}

          {left && middle && right && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 16 }}>
              <FileBox label="Left Done" hint="USD sampai CAD" file={left} preview={preview(left)} onChange={setLeft} />
              <FileBox label="Middle Done" hint="MYR sampai THB" file={middle} preview={preview(middle)} onChange={setMiddle} />
              <FileBox label="Right Done" hint="PHP sampai NTD" file={right} preview={preview(right)} onChange={setRight} />
            </div>
          )}
        </div>
      ) : (
        <FileBox label="Full Rate Board" hint="Upload gambar penuh" file={single} preview={preview(single)} onChange={setSingle} />
      )}

      {error && <div style={{ marginTop: 12, padding: '10px 16px', background: '#FFEBEE', borderRadius: 8, color: '#C62828', fontSize: 13, border: '1px solid #FFCDD2' }}>⚠️ {error}</div>}

      <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: loading ? '#CFD8DC' : 'linear-gradient(135deg, #1565C0, #1E88E5)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '12px 28px',
            fontWeight: 800,
            fontSize: 15,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(21,101,192,0.3)',
          }}
        >
          {loading ? '🔍 Scanning...' : '🔍 Extract Rates'}
        </button>
        <button
          onClick={() => {
            setSingle(null);
            setLeft(null);
            setMiddle(null);
            setRight(null);
            setError(null);
          }}
          style={{ background: 'none', border: '1px solid #CFD8DC', borderRadius: 10, padding: '12px 20px', color: '#607D8B', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
