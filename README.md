# PHP Code Reviewer

An interactive learning platform for PHP and web development education, built with React, TypeScript, and Vite. Features include code challenge editors, progress tracking, and Bootstrap component learning modules.

## Features

- **Interactive Code Challenges**: Fill-in-the-blank coding exercises with real-time preview
- **Bootstrap Learning Modules**: Comprehensive Bootstrap component tutorials
- **Progress Tracking**: Track learning progress across modules and challenges
- **Live Code Preview**: See your code changes in real-time
- **Hint System**: Progressive hints to help learners when stuck
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── data/               # Static data and questions
├── pages/              # Main application pages
│   ├── code-challenge-editor/  # Interactive coding challenges
│   ├── level-progress-dashboard/  # Progress tracking
│   └── challenge-success/       # Success pages
├── styles/             # Global styles and Tailwind config
└── utils/              # Utility functions
```

## Documentation

📖 **Complete Documentation**: [CODE_CHALLENGE_EDITOR_DOCS.md](CODE_CHALLENGE_EDITOR_DOCS.md)

The documentation includes:
- Validation function for user answers
- Code preview functionality
- Code challenge editor components
- Data structures and API references
- Performance optimizations and best practices

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Framework**: Custom components with Bootstrap integration
- **State Management**: React Context API
- **Routing**: React Router

## Development Tools

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
