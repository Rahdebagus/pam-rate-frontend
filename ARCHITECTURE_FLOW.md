# Architecture Flow Diagram

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.jsx (Root)                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │  RateBoardPage     │
                    │  (Page Container)  │
                    └────┬───────────┬───┘
                         │           │
         ┌───────────────┘           └──────────────┐
         │                                          │
         ▼                                          ▼
    ┌─────────────┐                    ┌──────────────────┐
    │   Hook      │                    │   Components     │
    │ useRateBoard│                    │   (Presentational)
    │ useFileUp.. │                    │                  │
    └──┬──────┬───┘                    │ Layout/          │
       │      │                        │ Header           │
       │      │                        │ Footer           │
       │      │                        │ UploadRateImage  │
       │      │                        │ OCRResultEditor  │
       │      │                        │ Generate Design  │
       │      │                        └──────────────────┘
       │      │
       │      └─────────────┬─────────────────┐
       │                    │                 │
       ▼                    ▼                 ▼
    ┌─────────┐      ┌────────────┐   ┌─────────────┐
    │ Services│      │ Constants  │   │  Utils      │
    │ (API)   │      │            │   │ (Formatters)│
    │         │      │ currencies │   │             │
    │ upload  │      │ LABELS     │   │ formatRate  │
    │generate │      │ COLUMNS    │   │ filename    │
    └─────────┘      └────────────┘   └─────────────┘
        │
        ▼
    ┌──────────────────┐
    │ Backend API      │
    │ /upload          │
    │ /generate        │
    └──────────────────┘
```

## 📊 Component Hierarchy

```
App
└── RateBoardPage
    ├── Header
    │   └── StepBadges
    ├── Step Container (conditional)
    │   ├── Step 1: UploadRateImage
    │   │   └── useFileUpload hook
    │   ├── Step 2: OCRResultEditor
    │   │   ├── CurrencyInput (many)
    │   │   └── DerivedValuesBox
    │   └── Step 3: GeneratedDesignPreview
    ├── InfoCards (Step 1 only)
    └── Footer
```

## 🔌 Hook Dependencies

```
RateBoardPage (Page Container)
├── useRateBoard() - Main state orchestration
│   ├── step (1, 2, 3)
│   ├── rates (extracted data)
│   ├── imageUrl (generated image)
│   ├── loading state
│   └── handlers (handleOCRResult, handleGenerateComplete, handleReset)
│
UploadRateImage (Component)
├── useFileUpload() - File handling logic
│   ├── preview state
│   ├── file state
│   ├── dragOver state
│   ├── error state
│   └── handlers (handleFile, handleDrop, clear, setError)
│
└── API call: uploadAndExtractRates()
    └── Service function in services/api.js
```

## 📥 Data Flow: Upload to Download

```
User uploads image
        │
        ▼
┌──────────────────────────────────┐
│ UploadRateImage Component        │
│ - Handles file selection         │
│ - Validates file type/size       │
│ - Shows preview                  │
└──────────────┬───────────────────┘
               │
               ▼ (on submit click)
        ┌─────────────────┐
        │ API Service     │
        │ uploadAndExtract│
        │ Rates()         │
        └────────┬────────┘
                 │
                 ▼ (backend processes)
        ┌──────────────────────┐
        │ Backend OCR Engine   │
        │ (PaddleOCR)          │
        │ Extracts rates       │
        └────────┬─────────────┘
                 │
                 ▼ (returns rates)
        ┌──────────────────────┐
        │ Hook: useRateBoard   │
        │ - Updates rates      │
        │ - Updates step → 2   │
        └────────┬─────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│ OCRResultEditor Component        │
│ - Displays extracted rates       │
│ - Allow manual edits             │
│ - Calculate derived values       │
└──────────────┬───────────────────┘
               │
               ▼ (on generate click)
        ┌─────────────────┐
        │ API Service     │
        │ generateRate    │
        │ Board()         │
        └────────┬────────┘
                 │
                 ▼ (backend processes)
        ┌──────────────────────┐
        │ Backend Designer     │
        │ Generates PNG image  │
        │ with branding        │
        └────────┬─────────────┘
                 │
                 ▼ (returns blob)
        ┌──────────────────────┐
        │ Hook: useRateBoard   │
        │ - Updates imageUrl   │
        │ - Updates step → 3   │
        └────────┬─────────────┘
                 │
                 ▼
┌──────────────────────────────────┐
│ GeneratedDesignPreview Component │
│ - Displays final image           │
│ - Download button                │
│ - New Rate Board button          │
└──────────────┬───────────────────┘
               │
               ▼ (on download)
        File downloaded to user
```

## 🛠️ Constants Flow

```
src/constants/currencies.js
    ├── API_BASE → Used in services/api.js
    ├── CURRENCY_LABELS → Used in components
    ├── ALL_CURRENCIES → Used in hooks & components
    ├── LEFT_COL → Used in OCRResultEditor
    ├── RIGHT_COL → Used in OCRResultEditor
    ├── STEPS → Used in Header
    └── Other config → Re-exported in index.js
         │
         ▼
src/constants/index.js (cleaner imports)
         │
         ▼
Components import from: import { CURRENCY_LABELS } from "../constants"
```

## 🔍 Error Handling Flow

```
User Action
    │
    ├── Validation Error (client-side)
    │   └── useFileUpload.setError() → Display error in component
    │
    ├── API Error (network/server)
    │   └── Try/catch in services/api.js → Throw error
    │       └── Catch in component/hook → Show error message
    │
    └── Validation Error (form)
        └── OCRResultEditor.setError() → Display validation message
```

## 📈 Scalability Points

### Adding New Step
```
1. Create: src/components/Steps/Step4_NewFeature/
2. Create: components/Steps/Step4_NewFeature/NewFeature.jsx
3. Export from: src/components/index.js
4. Add step to: src/constants/currencies.js (STEPS array)
5. Add condition in: RateBoardPage.jsx
6. Add logic in: src/hooks/useRateBoard.js if needed
```

### Adding New Currency
```
1. Edit: src/constants/currencies.js
2. Add to: CURRENCY_LABELS
3. Add to: LEFT_COL or RIGHT_COL
4. Done! (No component changes needed)
```

### Adding New API Endpoint
```
1. Add function: src/services/api.js
2. Export: src/services/index.js
3. Use in: Hook or component
```

## 🎯 Modification Priority

When making changes, find them in this order:

1. **Constants** (Least impact)
   - `src/constants/` - Configuration & data

2. **Utils** (Utilities)
   - `src/utils/` - Helper functions

3. **Services** (External)
   - `src/services/` - API calls

4. **Hooks** (Logic)
   - `src/hooks/` - Business logic & state

5. **Components** (UI)
   - `src/components/` - Presentation & rendering
