# Visual File Structure & Import Guide

## 🌳 Complete File Tree

```
frontend/
├── src/
│   ├── components/                       ← All UI Components
│   │   ├── index.js                      ← Exports all components
│   │   ├── Logo.jsx                      ← Logo component
│   │   ├── InfoCards.jsx                 ← Info cards on step 1
│   │   ├── Layout/
│   │   │   ├── Header.jsx                ← Top navigation
│   │   │   └── Footer.jsx                ← Footer
│   │   └── Steps/
│   │       ├── Common/
│   │       │   └── StepBadge.jsx         ← Step indicator badge
│   │       ├── Step1_Upload/
│   │       │   └── UploadRateImage.jsx   ← Upload & preview UI
│   │       ├── Step2_Editor/
│   │       │   ├── OCRResultEditor.jsx   ← Main editor component
│   │       │   ├── CurrencyInput.jsx     ← Single currency input
│   │       │   └── DerivedValuesBox.jsx  ← USD derived values
│   │       └── Step3_Preview/
│   │           └── GeneratedDesignPreview.jsx ← Preview & download
│   │
│   ├── constants/                        ← Configuration & Constants
│   │   ├── index.js                      ← Exports all constants
│   │   └── currencies.js                 ← Currency data & config
│   │
│   ├── hooks/                            ← Custom React Hooks
│   │   ├── index.js                      ← Exports all hooks
│   │   ├── useRateBoard.js               ← Main app state
│   │   └── useFileUpload.js              ← File upload logic
│   │
│   ├── services/                         ← API & External Services
│   │   ├── index.js                      ← Exports all services
│   │   └── api.js                        ← All API calls
│   │
│   ├── utils/                            ← Utility Functions
│   │   ├── index.js                      ← Exports all utils
│   │   └── formatters.js                 ← Formatting helpers
│   │
│   ├── pages/                            ← Page Containers
│   │   └── RateBoardPage.jsx             ← Main page component
│   │
│   ├── App.jsx                           ← Root component (now simple)
│   ├── App.css                           ← Global styles
│   ├── index.css                         ← Base styles
│   ├── main.jsx                          ← Entry point
│   ├── ARCHITECTURE.md                   ← Architecture guide
│   └── README.md (root-level documentation)
│
├── public/                               ← Static assets
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 📥 Import Examples

### From Constants
```javascript
// ✅ GOOD - Using index.js
import { API_BASE, CURRENCY_LABELS, ALL_CURRENCIES } from "../constants";

// ❌ BAD - Direct file import
import { API_BASE } from "../constants/currencies.js";
```

### From Hooks
```javascript
// ✅ GOOD
import { useRateBoard, useFileUpload } from "../hooks";

// ❌ BAD
import { useRateBoard } from "../hooks/useRateBoard.js";
```

### From Services
```javascript
// ✅ GOOD
import { uploadAndExtractRates, generateRateBoard } from "../services";

// ❌ BAD
import { uploadAndExtractRates } from "../services/api.js";
```

### From Utils
```javascript
// ✅ GOOD
import { formatRate, generateRateBoardFilename } from "../utils";

// ❌ BAD
import { formatRate } from "../utils/formatters.js";
```

### From Components
```javascript
// ✅ GOOD - Using index.js
import { Header, Footer, UploadRateImage, OCRResultEditor } from "../components";

// ✅ ACCEPTABLE - Direct component import (when deeply nested)
import { CurrencyInput } from "../components/Steps/Step2_Editor/CurrencyInput.jsx";

// ❌ BAD
import Header from "../components/Layout/Header.jsx";
```

## 🔄 File Relationships

### UploadRateImage.jsx depends on:
```javascript
import { useFileUpload } from "../hooks";
import { uploadAndExtractRates } from "../services";
import { SUPPORTED_IMAGE_TYPES } from "../constants";
```

### OCRResultEditor.jsx depends on:
```javascript
import { 
  ALL_CURRENCIES, 
  LEFT_COL, 
  RIGHT_COL, 
  CURRENCY_LABELS 
} from "../constants";
import { CurrencyInput } from "./CurrencyInput.jsx";
import { DerivedValuesBox } from "./DerivedValuesBox.jsx";
```

### RateBoardPage.jsx depends on:
```javascript
import { useRateBoard } from "../hooks";
import { generateRateBoard } from "../services";
import {
  Header,
  Footer,
  InfoCards,
  UploadRateImage,
  OCRResultEditor,
  GeneratedDesignPreview,
} from "../components";
```

### services/api.js depends on:
```javascript
import { API_BASE } from "../constants";
```

### hooks/useRateBoard.js depends on:
```javascript
import { useState } from "react";
// No dependencies on other app code
```

## 📊 Dependency Graph

```
App.jsx
  └── RateBoardPage.jsx
       ├── useRateBoard hook
       │   └── useState
       ├── generateRateBoard service
       │   └── API_BASE constant
       ├── Components
       │   ├── Header
       │   │   ├── Logo
       │   │   └── StepBadge
       │   ├── UploadRateImage
       │   │   ├── useFileUpload hook
       │   │   └── uploadAndExtractRates service
       │   ├── OCRResultEditor
       │   │   ├── CurrencyInput
       │   │   └── DerivedValuesBox
       │   ├── GeneratedDesignPreview
       │   │   └── formatters utils
       │   ├── InfoCards
       │   └── Footer
       └── Constants
           └── currencies.js
```

## 🎯 Layer Dependencies (One Direction Only)

```
Pages ← Hooks ← Services ← Constants
   ↑      ↓        ↓
Components ← Utils ← Constants
```

**Rule:** Lower layers should NOT depend on higher layers.

✅ Components can use Hooks, Services, Utils, Constants
✅ Hooks can use Services, Utils, Constants
✅ Services can use Constants, Utils
✅ Utils should be independent

❌ Utils should NOT use Components
❌ Services should NOT use Components
❌ Constants should NOT use anything

## 📝 File Purposes At A Glance

| File | Purpose | Edits | How Often |
|------|---------|-------|-----------|
| `currencies.js` | Config & data | Add currencies | Weekly |
| `formatters.js` | Helper functions | Fix formatting | Monthly |
| `api.js` | API calls | Update endpoints | Monthly |
| `useRateBoard.js` | App state | Fix workflows | Weekly |
| `useFileUpload.js` | File logic | Improve validation | Rarely |
| `UploadRateImage.jsx` | Upload UI | Style changes | Monthly |
| `OCRResultEditor.jsx` | Editor UI | Add fields | Rarely |
| `GeneratedDesignPreview.jsx` | Preview UI | Style changes | Rarely |
| `RateBoardPage.jsx` | Orchestration | Add steps | Rarely |
| `App.jsx` | Root | Never! | Once |

## 🔍 Finding Files

**Q: Where do I add a new currency?**
A: `src/constants/currencies.js`

**Q: Where's the upload logic?**
A: `src/hooks/useFileUpload.js` (hook) + `src/components/Steps/Step1_Upload/UploadRateImage.jsx` (UI)

**Q: Where's the API call?**
A: `src/services/api.js`

**Q: Where's the main page?**
A: `src/pages/RateBoardPage.jsx`

**Q: Where's the state management?**
A: `src/hooks/useRateBoard.js`

**Q: Where's the formatting?**
A: `src/utils/formatters.js`

**Q: Where's the error handling?**
A: Each layer handles its own (service has try/catch, hook sets error state, component shows error)

## 💻 IDE Quick Tips

### VS Code - Open Files Fast
```
Ctrl+P → "currencies.js"
Ctrl+P → "api.js"
Ctrl+P → "UploadRateImage"
```

### Find Symbol References
```
Ctrl+Shift+F → Search "formatRate"
Right-click → "Go to Definition"
Right-click → "Find All References"
```

### Navigate Hierarchy
```
Breadcrumb at top shows: src > components > Steps > Step2_Editor > CurrencyInput.jsx
Click breadcrumb to jump to parent folder
```

## 📦 Module Export Chain

```
components/index.js imports from:
  ├── ./Logo.jsx
  ├── ./Layout/Header.jsx
  ├── ./Layout/Footer.jsx
  └── ./Steps/**/*.jsx

RateBoardPage.jsx imports from:
  ├── components/index.js
  ├── hooks/index.js
  ├── services/index.js
  └── constants/index.js

App.jsx imports from:
  └── pages/RateBoardPage.jsx
```

## 🎓 Reading Order

Start with:
1. `App.jsx` - See it's just importing one thing
2. `pages/RateBoardPage.jsx` - See how it connects everything
3. `hooks/useRateBoard.js` - See state management
4. `components/Steps/Step1_Upload/UploadRateImage.jsx` - See how components use hooks
5. `services/api.js` - See API structure
6. `constants/currencies.js` - See configuration

## ✅ Verification Checklist

Verify your setup:
- [ ] `npm run dev` works without errors
- [ ] Browser shows the app correctly
- [ ] Console has no import errors
- [ ] Can navigate through 3 steps
- [ ] File uploads work (if backend running)
- [ ] No "Cannot find module" errors

## 🚀 Next Steps

After understanding the structure:
1. Add a new currency (easiest task)
2. Add validation to upload (intermediate)
3. Create new step (advanced)
4. Add TypeScript types (future)
5. Add unit tests (future)
