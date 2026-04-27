# PAM Money Changer - Rate Board Generator Frontend

A professional, scalable React frontend built with clean architecture principles.

## 📁 Project Structure

```
src/
├── components/              # UI Components
│   ├── Layout/              # Layout wrapper components
│   ├── Steps/               # Step-specific feature components
│   ├── Logo.jsx
│   ├── InfoCards.jsx
│   └── index.js
├── constants/               # Configuration & constants
│   ├── currencies.js        # Currency data
│   └── index.js
├── hooks/                   # Custom React hooks
│   ├── useRateBoard.js      # Main state logic
│   ├── useFileUpload.js     # File upload logic
│   └── index.js
├── services/                # API & external services
│   ├── api.js               # API calls
│   └── index.js
├── utils/                   # Utility functions
│   ├── formatters.js        # Formatting helpers
│   └── index.js
├── pages/                   # Page containers
│   └── RateBoardPage.jsx
├── App.jsx                  # Root component
└── ARCHITECTURE.md          # Detailed architecture guide
```

## 🎯 Key Features

✅ **Modular Architecture** - Each feature isolated and independent
✅ **Clean Separation of Concerns** - UI, Logic, API, Utils clearly separated
✅ **Scalable Structure** - Easy to add new features
✅ **Easy Debugging** - Feature-based organization aids troubleshooting
✅ **Reusable Hooks** - Custom hooks for common logic
✅ **Professional Imports** - Index files for clean, maintainable imports

## 🚀 Quick Start

### Installation
```bash
cd frontend
npm install
npm run dev
```

### Build
```bash
npm run build
```

## 🔄 3-Step Workflow

1. **Upload** (`Step1_Upload/`) - Upload rate board image → OCR extraction
2. **Edit** (`Step2_Editor/`) - Review & correct extracted rates
3. **Download** (`Step3_Preview/`) - Generate & download branded rate board

## 📝 Common Tasks

### Add a New Currency
1. Edit `src/constants/currencies.js`
2. Add to `CURRENCY_LABELS` object
3. Add to `LEFT_COL` or `RIGHT_COL` array
4. No component changes needed!

### Change API Endpoint
1. Open `src/services/api.js`
2. Update `uploadAndExtractRates()` or `generateRateBoard()` function
3. All components automatically use updated endpoint

### Modify Rate Formatting
1. Edit `src/utils/formatters.js`
2. Update `formatRate()` function logic
3. All components automatically use new formatting

### Add New Component
1. Create folder in `src/components/` matching feature
2. Create component file
3. Export from `src/components/index.js`
4. Import in container component

### Add Business Logic
1. Create custom hook in `src/hooks/`
2. Export from `src/hooks/index.js`
3. Use in components: `const { state, handlers } = useYourHook()`

## 🏗️ Architecture Benefits

| Task | Why It's Easy |
|------|--------------|
| **Fix Upload Bug** | All upload logic in `Step1_Upload/` folder |
| **Update Currency Rates** | Just modify `constants/currencies.js` |
| **Change API Base URL** | Single place in `services/api.js` |
| **Add Validation** | Extend `useFileUpload` hook |
| **Reuse Logic** | Custom hooks in `hooks/` folder |
| **Find Feature** | Feature-based folder organization |
| **Add New Step** | Create new folder in `components/Steps/` |
| **Test Independently** | Each layer (components, hooks, utils) testable in isolation |

## 📚 Import Examples

### Good ✅
```javascript
import { useRateBoard, useFileUpload } from "../hooks";
import { API_BASE, CURRENCY_LABELS } from "../constants";
import { formatRate } from "../utils";
import {
  Header,
  UploadRateImage,
  OCRResultEditor,
} from "../components";
```

### Avoid ❌
```javascript
import { useRateBoard } from "../hooks/useRateBoard.js";
import formatRate from "../utils/formatters.js";
```

## 🔧 File Locations for Common Changes

| Change Type | File Location |
|-------------|---------------|
| Add currency | `src/constants/currencies.js` |
| Change API endpoint | `src/services/api.js` |
| Modify formatting | `src/utils/formatters.js` |
| Fix upload logic | `src/hooks/useFileUpload.js` |
| Add new step | `src/components/Steps/StepN_*` |
| Update colors/styles | Component files (inline styles) |
| State management | `src/hooks/useRateBoard.js` |

## 🧪 Testing Structure (Future)

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
```

## 📖 For More Details

See `src/ARCHITECTURE.md` for comprehensive architecture documentation and best practices.

## 💡 Pro Tips

1. **Centralize Configuration** - All config in `src/constants/`
2. **Isolate Business Logic** - Use hooks, not component state
3. **Keep Components Presentational** - Minimal logic in JSX
4. **DRY Principle** - Utilities for repeated functions
5. **Clear Naming** - Component, function, and file names describe purpose
6. **Feature Folders** - Related components grouped together
7. **Index Exports** - Clean imports from index.js files

## 🤝 Contributing

Follow the established structure when adding new features:
1. Feature-based folder organization
2. Separation of concerns (Components, Hooks, Services, Utils)
3. Consistent naming conventions
4. Export from index files for clean imports
5. Document complex logic with JSDoc comments
