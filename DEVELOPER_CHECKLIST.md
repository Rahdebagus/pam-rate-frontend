# Developer Checklist & Best Practices

## ✅ Before You Code

- [ ] Check if feature already exists
- [ ] Identify which layer(s) need changes (Constants, Utils, Services, Hooks, Components)
- [ ] Plan folder structure for new features
- [ ] Check existing import patterns
- [ ] Review ARCHITECTURE.md for similar patterns

## 🎯 When Adding Features

### New Component
- [ ] Create in appropriate feature folder
- [ ] Export from `src/components/index.js`
- [ ] Component should be mostly presentational
- [ ] Accept data via props
- [ ] Accept callbacks via props
- [ ] Use inline styles or CSS modules
- [ ] Add JSDoc comments for props

```javascript
// ✅ Good
export function MyComponent({ data, onAction, loading }) {
  return (
    <div>
      {/* UI only, no business logic */}
    </div>
  );
}

// ❌ Bad
function MyComponent() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  // Complex logic mixed with UI
}
```

### New Hook (Business Logic)
- [ ] Create in `src/hooks/useYourFeature.js`
- [ ] Export from `src/hooks/index.js`
- [ ] Handle state management
- [ ] Handle side effects
- [ ] Return state and handlers
- [ ] Include JSDoc documentation

```javascript
// ✅ Good
export const useMyFeature = () => {
  const [state, setState] = useState(initialState);
  
  const handleAction = () => {
    // Logic here
    setState(newState);
  };
  
  return { state, handleAction };
};

// ❌ Bad
export const myFunction = () => {
  // Don't use hooks in regular functions
}
```

### New API Function
- [ ] Add to `src/services/api.js`
- [ ] Export from `src/services/index.js`
- [ ] Use API_BASE from constants
- [ ] Include error handling with try/catch
- [ ] Return data or throw descriptive error
- [ ] Add JSDoc with params and return type

```javascript
// ✅ Good
export const myApiCall = async (param1, param2) => {
  try {
    const res = await fetch(`${API_BASE}/endpoint`, {
      method: "POST",
      body: JSON.stringify({ param1, param2 }),
    });
    
    if (!res.ok) {
      throw new Error("API error");
    }
    
    return await res.json();
  } catch (error) {
    throw new Error(error.message || "Failed");
  }
};

// ❌ Bad
export const myApiCall = async (param1, param2) => {
  const res = await fetch("/endpoint?param=" + param1);
  return res.json(); // No error handling
};
```

### New Utility Function
- [ ] Add to `src/utils/`
- [ ] Export from `src/utils/index.js`
- [ ] Keep pure (no side effects)
- [ ] Test with various inputs
- [ ] Document with JSDoc

```javascript
// ✅ Good
export const myHelper = (input) => {
  // Pure function
  return processedOutput;
};

// ❌ Bad
let globalState = {};
export const myHelper = (input) => {
  globalState.changed = true; // Side effect
  return output;
};
```

### New Constant
- [ ] Add to `src/constants/` file
- [ ] Use UPPER_SNAKE_CASE
- [ ] Export from `src/constants/index.js`
- [ ] Add comment explaining usage

```javascript
// ✅ Good
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_TYPES = ["image/png", "image/jpeg"];

// ❌ Bad
const maxSize = 10485760; // What does this number mean?
```

## 📝 Naming Conventions

### Files
| Type | Format | Example |
|------|--------|---------|
| Components | PascalCase | `UploadRateImage.jsx` |
| Hooks | camelCase (use prefix) | `useRateBoard.js` |
| Utils/Services | camelCase | `formatters.js`, `api.js` |
| Constants | snake_case.js | `currencies.js` |
| Styles | kebab-case.css | `upload-zone.css` |

### Variables
| Type | Format | Example |
|------|--------|---------|
| Constants | UPPER_SNAKE_CASE | `API_BASE`, `MAX_RETRIES` |
| Variables | camelCase | `userData`, `isLoading` |
| Boolean | is/has prefix | `isLoading`, `hasError` |
| Events | on prefix | `onClick`, `onSubmit` |
| Handlers | handle prefix | `handleSubmit`, `handleError` |

## 🔍 Code Review Checklist

- [ ] Component is presentational (minimal logic)
- [ ] Hook handles complex logic
- [ ] API calls are in services/
- [ ] Utility functions are pure
- [ ] Constants are centralized
- [ ] Imports follow index.js pattern
- [ ] Error handling is present
- [ ] JSDoc comments added
- [ ] No `console.log` left in production code
- [ ] No unused imports
- [ ] Props are properly passed
- [ ] State is not nested too deeply
- [ ] No hardcoded values (use constants)
- [ ] File is not too large (< 500 lines)
- [ ] Related components grouped in folders

## 🐛 Debugging Guide

### Issue: "Cannot find module"
- [ ] Check import path
- [ ] Check file is exported from index.js
- [ ] Check spelling matches file name

### Issue: Component not updating
- [ ] Check state is being set correctly
- [ ] Check prop dependencies
- [ ] Check useEffect dependencies if applicable
- [ ] Check no missing `setLoading(false)` in error handlers

### Issue: API not working
- [ ] Check API_BASE in constants/
- [ ] Check endpoint URL in services/api.js
- [ ] Check fetch method (GET/POST)
- [ ] Check request body format
- [ ] Check backend is running
- [ ] Check browser console for CORS errors

### Issue: Style/Layout broken
- [ ] Check inline style object syntax
- [ ] Check CSS properties are camelCase in JS
- [ ] Check color values are correct
- [ ] Check responsive breakpoints

### Issue: Form validation not working
- [ ] Check validation logic in hook
- [ ] Check error state is being set
- [ ] Check error message is displayed
- [ ] Check form reset clears error

## 📊 Performance Guidelines

### When to optimize
- [ ] Component renders excessively (> 5 times/sec)
- [ ] List with 100+ items
- [ ] Complex calculations happening on every render
- [ ] Large images or assets

### Optimization tools
```javascript
// Memoize expensive components
const MyComponent = React.memo(function MyComponent(props) {
  // Only re-renders if props change
});

// Memoize callbacks
const handleClick = useCallback(() => {
  // Does something
}, [dependency]);

// Memoize values
const memoValue = useMemo(() => {
  return expensiveCalculation(input);
}, [input]);
```

## 🧪 Testing Checklist

When adding new feature, test:
- [ ] Happy path (everything works)
- [ ] Error handling (API fails, validation fails)
- [ ] Edge cases (empty input, max values)
- [ ] Browser console (no warnings/errors)
- [ ] Network requests (check Network tab)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessibility (keyboard navigation, screen reader)

## 📚 File Size Guidelines

| File Type | Max Size | When to Split |
|-----------|----------|---------------|
| Component | 300 lines | Extract sub-components |
| Hook | 200 lines | Extract utilities/services |
| Service | 200 lines | Create multiple files |
| Utils | 200 lines | Group by functionality |

## 🚀 Deployment Checklist

Before deploying:
- [ ] All features tested locally
- [ ] No console errors/warnings
- [ ] No `debugger;` statements
- [ ] No commented-out code
- [ ] Environment variables set correctly
- [ ] API endpoints point to production
- [ ] Build completes without errors: `npm run build`
- [ ] No large console logs
- [ ] Performance is acceptable

## 🔐 Security Checklist

- [ ] No API keys in code (use env variables)
- [ ] User input is validated
- [ ] No eval() or dangerouslySetInnerHTML
- [ ] Dependencies are up to date: `npm audit`
- [ ] No sensitive data in local storage
- [ ] CORS headers configured correctly
- [ ] Rate limiting on API calls

## 📝 Documentation

When adding feature, document:
- [ ] What the feature does
- [ ] How to use it
- [ ] Configuration options
- [ ] Error scenarios
- [ ] Example usage
- [ ] Related features

## 🎓 Learning Resources

Reference these when in doubt:
1. `src/ARCHITECTURE.md` - Architecture decisions
2. `ARCHITECTURE_FLOW.md` - Data flow diagrams
3. `README_STRUCTURE.md` - Structure overview
4. Existing similar components - Copy patterns
5. JSDoc comments in code - Implementation details

## 🤝 PR (Pull Request) Template

When submitting changes:

```markdown
## Description
What does this change do?

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation

## Testing
How was this tested?

## Checklist
- [ ] Code follows conventions
- [ ] No console errors
- [ ] Tested locally
- [ ] Documentation updated
- [ ] No breaking changes
```

## 💡 Common Patterns

### Pattern 1: State with Handler
```javascript
export const useFeature = () => {
  const [state, setState] = useState(initialState);
  
  const handler = () => setState(newState);
  
  return { state, handler };
};
```

### Pattern 2: Loading State
```javascript
const [loading, setLoading] = useState(false);
const handleAction = async () => {
  setLoading(true);
  try {
    await apiCall();
  } catch (e) {
    handleError(e);
  } finally {
    setLoading(false);
  }
};
```

### Pattern 3: Form Validation
```javascript
const [values, setValues] = useState({});
const [error, setError] = useState(null);

const handleSubmit = () => {
  setError(null);
  if (!validate(values)) {
    setError("Validation failed");
    return;
  }
  // Proceed
};
```

## ⚠️ Anti-Patterns (Avoid)

❌ Don't mix logic and presentation in components
❌ Don't use context for simple state (just props)
❌ Don't create deeply nested folder structures
❌ Don't hardcode values (use constants)
❌ Don't skip error handling
❌ Don't add comments that repeat code
❌ Don't create giant components (> 400 lines)
❌ Don't ignore console warnings
❌ Don't make API calls in render
❌ Don't store API keys in code
