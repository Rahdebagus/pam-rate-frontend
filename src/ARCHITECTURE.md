// ─── PROJECT ARCHITECTURE GUIDE ───────────────────────────────────────────────
// 
// This document outlines the professional folder structure and organization patterns
// used in the PAM Money Changer Rate Board Generator frontend.
//
// ── Folder Structure ───────────────────────────────────────────────────────────

/**
 * src/
 * ├── components/              # Reusable React components
 * │   ├── Layout/              # Layout components (Header, Footer)
 * │   ├── Steps/               # Step-specific components
 * │   │   ├── Step1_Upload/    # Upload image components
 * │   │   ├── Step2_Editor/    # Rate editor components
 * │   │   ├── Step3_Preview/   # Preview components
 * │   │   └── Common/          # Shared step components
 * │   ├── Logo.jsx
 * │   └── InfoCards.jsx
 * │
 * ├── constants/               # Application constants
 * │   ├── currencies.js        # Currency data & configuration
 * │   └── index.js
 * │
 * ├── hooks/                   # Custom React hooks
 * │   ├── useRateBoard.js      # Main app state management
 * │   ├── useFileUpload.js     # File upload logic
 * │   └── index.js
 * │
 * ├── services/                # API & external services
 * │   ├── api.js               # API calls (upload, generate)
 * │   └── index.js
 * │
 * ├── utils/                   # Utility functions
 * │   ├── formatters.js        # Formatting helpers
 * │   └── index.js
 * │
 * ├── pages/                   # Page-level components (containers)
 * │   └── RateBoardPage.jsx    # Main page component
 * │
 * ├── App.jsx                  # Root app component
 * ├── main.jsx                 # Entry point
 * └── App.css                  # Global styles
 */

// ── Architecture Principles ────────────────────────────────────────────────────

/**
 * SEPARATION OF CONCERNS:
 * - Components: Pure UI rendering
 * - Hooks: Business logic and state management
 * - Services: External API communication
 * - Utils: Reusable helper functions
 * - Constants: Configuration and data
 * 
 * COMPONENT ORGANIZATION:
 * - Group related components in feature folders (Step1_Upload, Step2_Editor, etc.)
 * - Keep components small and focused on one responsibility
 * - Export components from index.js files for cleaner imports
 * 
 * STATE MANAGEMENT:
 * - Use custom hooks for complex state logic (useRateBoard, useFileUpload)
 * - Hooks manage state, side effects, and business logic
 * - Keep components mostly presentational
 * 
 * API COMMUNICATION:
 * - All API calls are in src/services/api.js
 * - Services are imported and used in hooks or components
 * - Errors are caught and handled appropriately
 * 
 * UTILITY FUNCTIONS:
 * - Pure functions with no side effects
 * - Reusable across multiple components
 * - Examples: formatRate, generateRateBoardFilename
 * 
 * CONSTANTS:
 * - Configuration data (currencies, API_BASE, etc.)
 * - Centralized for easy updates
 * - Exported via index.js for clean imports
 */

// ── File Naming Conventions ────────────────────────────────────────────────────

/**
 * Components:
 *   - PascalCase: UploadRateImage.jsx, OCRResultEditor.jsx
 *   - Descriptive names indicating component purpose
 *   - Related components grouped in folders
 * 
 * Utilities/Services/Hooks:
 *   - camelCase: useFileUpload.js, formatters.js, api.js
 *   - Function names prefixed with use* for hooks (React convention)
 *   - Clear, verb-based names for functions
 * 
 * Constants:
 *   - UPPER_SNAKE_CASE: ALL_CURRENCIES, API_BASE
 *   - Grouped logically in files
 *   - Exported from index.js
 */

// ── Import Patterns ───────────────────────────────────────────────────────────

/**
 * GOOD - Clean imports from index files:
 *   import { useRateBoard, useFileUpload } from '../hooks'
 *   import { API_BASE, CURRENCY_LABELS } from '../constants'
 *   import { formatRate } from '../utils'
 * 
 * AVOID - Direct file imports (unless necessary):
 *   import { useRateBoard } from '../hooks/useRateBoard.js'
 * 
 * GOOD - Component imports:
 *   import { UploadRateImage } from '../components/Steps/Step1_Upload/UploadRateImage'
 */

// ── Adding New Features ────────────────────────────────────────────────────────

/**
 * 1. NEW COMPONENT:
 *    - Create file in appropriate features folder
 *    - Keep component focused on UI rendering
 *    - Use props for data/callbacks
 * 
 * 2. NEW HOOK (Business Logic):
 *    - Create in src/hooks/useYourFeature.js
 *    - Export from src/hooks/index.js
 *    - Use in components that need the logic
 * 
 * 3. NEW API FUNCTION:
 *    - Add to src/services/api.js
 *    - Export from src/services/index.js
 *    - Call from hooks/components
 * 
 * 4. NEW HELPER FUNCTION:
 *    - Add to appropriate file in src/utils/
 *    - Export from src/utils/index.js
 *    - Use in components/hooks
 * 
 * 5. NEW CONFIGURATION:
 *    - Add to src/constants/currencies.js (or new file)
 *    - Export from src/constants/index.js
 *    - Import where needed
 */

// ── Debugging & Maintenance ────────────────────────────────────────────────────

/**
 * EASY DEBUGGING:
 * - Feature-based folder structure makes finding code easier
 * - Clear separation means bugs are isolated to specific areas
 * - Hooks handle logic, so UI bugs = component issue
 * - API issues = services/api.js problem
 * - Formatting issues = utils/formatters.js
 * 
 * MODIFICATION WORKFLOW:
 * 1. Identify feature affected (Upload, Edit, Preview)
 * 2. Navigate to corresponding folder
 * 3. Find component/hook/service related to the change
 * 4. Make modification locally
 * 5. Test in isolation before integration
 * 
 * COMMON CHANGES:
 * - Add new currency: Update src/constants/currencies.js
 * - Change API endpoint: Update src/services/api.js
 * - Modify formatting: Update src/utils/formatters.js
 * - Add step: Create new folder in src/components/Steps/
 * - Change colors/styles: Update inline styles (consider CSS module later)
 */

// ── Performance Considerations ─────────────────────────────────────────────────

/**
 * - Components are kept small for easier re-renders
 * - Hooks manage state updates efficiently
 * - API calls are centralized and can be cached later
 * - Utility functions are pure and memoizable
 * - Future: Add React.memo() for expensive components
 * - Future: Add useMemo/useCallback for optimization
 */

// ── Testing Structure ──────────────────────────────────────────────────────────

/**
 * Suggested locations for tests:
 * - src/__tests__/components/
 * - src/__tests__/hooks/
 * - src/__tests__/utils/
 * - src/__tests__/services/
 * 
 * Test each layer independently for better coverage
 */
