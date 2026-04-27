# 🚀 Quick Start Guide - New Architecture

## ⚡ 5-Minute Quick Start

### 1. Run the App
```bash
cd frontend
npm install  # If not already done
npm run dev
```

Open browser → http://localhost:5173

### 2. Understand the Flow
```
Upload Image → Extract Rates → Edit Rates → Download PNG
     ↓              ↓              ↓           ↓
  Step 1       Step 2           Step 3      Done
```

### 3. Know Where Things Are
- **Configuration**: `src/constants/`
- **API Calls**: `src/services/`
- **State Logic**: `src/hooks/`
- **Helpers**: `src/utils/`
- **UI Components**: `src/components/`
- **Main Page**: `src/pages/RateBoardPage.jsx`

### 4. Make Your First Change

#### Add a new currency (easiest)
1. Open: `src/constants/currencies.js`
2. Add: `HKD: "Hong Kong Dollar"` to `CURRENCY_LABELS`
3. Add: `"HKD"` to `RIGHT_COL` array
4. Done! No other files need changes.

#### Change an API endpoint
1. Open: `src/services/api.js`
2. Find: `uploadAndExtractRates` or `generateRateBoard`
3. Update: The URL or fetch options
4. All components automatically use the new endpoint

#### Fix a bug
1. Know which step has the bug (Upload/Edit/Preview)?
2. Bug is UI? → Check `src/components/Steps/StepN_*/`
3. Bug is logic? → Check `src/hooks/`
4. Bug is API? → Check `src/services/api.js`
5. Bug is data? → Check `src/constants/`

## 📁 File Cheat Sheet

| What | Where | File |
|------|-------|------|
| Add currency | Constants | `src/constants/currencies.js` |
| Change API URL | Services | `src/services/api.js` |
| Format rates | Utils | `src/utils/formatters.js` |
| Main state | Hooks | `src/hooks/useRateBoard.js` |
| Upload logic | Hooks | `src/hooks/useFileUpload.js` |
| Upload UI | Components | `src/components/Steps/Step1_Upload/` |
| Editor UI | Components | `src/components/Steps/Step2_Editor/` |
| Preview UI | Components | `src/components/Steps/Step3_Preview/` |

## 🎯 Common Tasks (Copy-Paste Ready)

### Task 1: Add a Currency
**File**: `src/constants/currencies.js`

```javascript
// Find CURRENCY_LABELS object, add:
CURRENCY_LABELS = {
  // ... existing ...
  MXN: "Mexican Peso",  // ← Add new line
};

// Find LEFT_COL or RIGHT_COL, add:
RIGHT_COL = [...existing..., "MXN"];  // ← Add "MXN"
```

### Task 2: Change Backend URL
**File**: `src/services/api.js`

```javascript
// Find API_BASE import or change to:
const API_BASE = "http://localhost:3000";  // Change this

// Or better, use environment variable:
// See vite.config.js for env setup
```

### Task 3: Add File Size Validation
**File**: `src/hooks/useFileUpload.js`

```javascript
// In useFileUpload function, find validateFile:
const validateFile = (file) => {
  if (!file) return false;
  if (!SUPPORTED_IMAGE_TYPES.includes(file.type)) return false;
  
  // ADD THIS:
  if (file.size > 5 * 1024 * 1024) {  // 5MB max
    console.warn("File too large");
    return false;
  }
  
  return true;
};
```

### Task 4: Change Error Color
**File**: `src/components/Steps/Step1_Upload/UploadRateImage.jsx`

```javascript
// Find error div:
{upload.error && (
  <div
    style={{
      background: "#FFEBEE",  // ← Error background color
      color: "#C62828",       // ← Error text color
      // ... other styles ...
    }}
  >
    ⚠️ {upload.error}
  </div>
)}
```

## 🧪 Testing Your Changes

After making changes:
1. Save file (auto-refresh in dev mode)
2. Check browser console for errors
3. Test the feature
4. Check Network tab for API calls
5. Verify no console errors

## 📊 Project Structure At A Glance

```
Your main code is here:
src/
├── pages/RateBoardPage.jsx  ← Everything connects here
├── hooks/                   ← Business logic (state, validation)
├── components/              ← UI components (what you see)
├── services/                ← API calls (backend communication)
├── utils/                   ← Helpers (formatting, etc)
└── constants/               ← Config (currencies, URLs, etc)

Think of layers like:
Constants (bottom) → Utils → Services → Hooks → Components/Pages (top)
```

## 🔗 Import Quick Reference

### Import from Constants
```javascript
import { API_BASE, CURRENCY_LABELS, ALL_CURRENCIES } from "../constants";
```

### Import from Hooks
```javascript
import { useRateBoard } from "../hooks";
// OR
import { useFileUpload } from "../hooks";
```

### Import from Services
```javascript
import { uploadAndExtractRates, generateRateBoard } from "../services";
```

### Import from Utils
```javascript
import { formatRate } from "../utils";
```

### Import from Components
```javascript
import { Header, UploadRateImage, OCRResultEditor } from "../components";
```

## 🎓 Documentation Quick Links

| Document | Purpose | Read When |
|----------|---------|-----------|
| REFACTORING_SUMMARY.md | Overview of changes | First time |
| README_STRUCTURE.md | How to use structure | Planning changes |
| FILE_STRUCTURE_GUIDE.md | File organization | Lost or confused |
| ARCHITECTURE_FLOW.md | Data flow diagrams | Understanding flow |
| DEVELOPER_CHECKLIST.md | Best practices | Before committing |
| FILE_INVENTORY.md | Complete file list | When making edits |

## ⚙️ Common Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution**: Check import path and file name spelling

### Issue: App not updating
**Solution**: Hard refresh browser (Ctrl+Shift+R)

### Issue: API 404 error
**Solution**: Check backend is running and URL is correct

### Issue: File upload not working
**Solution**: Check backend /upload endpoint exists

### Issue: Image generation failed
**Solution**: Check backend /generate endpoint exists

## 🚀 Next: Understanding the Code

1. Open `src/pages/RateBoardPage.jsx` - See how everything connects
2. Open `src/hooks/useRateBoard.js` - See state management
3. Open `src/components/Steps/Step1_Upload/UploadRateImage.jsx` - See component structure
4. Run the app - Try the upload flow
5. Modify a currency - See reactivity

## 💡 Pro Tips

- **Components are dumb** - They only render UI, no logic
- **Hooks are smart** - They handle business logic
- **Services are external** - They talk to backend
- **Utils are helpers** - They do one thing well
- **Constants are config** - They're never hardcoded

## ✅ Verification Checklist

- [ ] `npm run dev` works
- [ ] Browser shows app
- [ ] Console has no errors
- [ ] Upload step works
- [ ] Edit step shows rates
- [ ] All 3 steps accessible
- [ ] No "Cannot find module" errors

## 🎉 You're Ready!

Everything is set up. Start with:
1. Read REFACTORING_SUMMARY.md (5 minutes)
2. Run `npm run dev`
3. Try adding a currency (10 minutes)
4. Check the import patterns (5 minutes)
5. Make your first feature! 🚀

---

**Questions? Check the docs:**
- Structure: README_STRUCTURE.md
- Data flow: ARCHITECTURE_FLOW.md
- File locations: FILE_STRUCTURE_GUIDE.md
- Best practices: DEVELOPER_CHECKLIST.md

**Happy coding! 💻**
