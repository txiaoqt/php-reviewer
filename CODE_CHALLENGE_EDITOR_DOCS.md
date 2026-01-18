# Code Challenge Editor Documentation

This document provides comprehensive documentation for the code challenge editor system, including the validation function for checking user answers, the code preview functionality, and the code challenge editor components.

## Overview

The code challenge editor is a React-based interactive learning platform where users fill in the blanks in Bootstrap HTML code. The system validates user input, provides live preview of the rendered HTML, and includes features like hints, progress tracking, and visual feedback.

## Core Components

### 1. Validation Function for User Answers

#### Location
`src/pages/code-challenge-editor/index.jsx` - `handleRunCode` function

#### Function Signature
```javascript
const handleRunCode = () => {
  // Implementation details below
};
```

#### Purpose
Validates user input against correct answers and provides feedback on correctness.

#### Algorithm
1. Sets loading state to true
2. Simulates processing delay (1.5 seconds)
3. Compares user inputs with correct answers:
   - Checks `input1`, `input2`, and `input3` if they exist in `correctAnswers`
   - Trims whitespace from user input before comparison
   - If input not required (not in correctAnswers), considers it valid
4. Records answer in progress context
5. Provides visual feedback:
   - Correct: Shows confetti animation and explanation
   - Incorrect: Shows shake animation and error alert
6. Resets loading state

#### Key Code Snippet
```javascript
const handleRunCode = () => {
  setIsRunning(true);
  setShowErrorAlert(false);

  setTimeout(() => {
    // Only check inputs that are defined in correctAnswers
    const input1Match = currentQuestion?.correctAnswers?.input1
      ? inputs?.input1?.trim() === currentQuestion?.correctAnswers?.input1
      : true;

    const input2Match = currentQuestion?.correctAnswers?.input2
      ? inputs?.input2?.trim() === currentQuestion?.correctAnswers?.input2
      : true;

    const input3Match = currentQuestion?.correctAnswers?.input3
      ? inputs?.input3?.trim() === currentQuestion?.correctAnswers?.input3
      : true;

    const isCorrect = input1Match && input2Match && input3Match;

    // Record the answer in session stats
    recordAnswer(moduleId, isCorrect);

    setIsRunning(false);

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowExplanation(true);
      }, 1000);
    } else {
      setIsShaking(true);
      setShowErrorAlert(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 4000);
    }
  }, 1500);
};
```

#### Input Validation Logic
- **Required inputs**: Must match exactly (case-sensitive, whitespace-trimmed)
- **Optional inputs**: If not present in `correctAnswers`, automatically considered valid
- **Multiple inputs**: All required inputs must be correct for overall success

### 2. Code Preview Functionality

#### Location
`src/pages/code-challenge-editor/components/CodePreviewPane.jsx`

#### Component Overview
The `CodePreviewPane` component renders a live preview of the user's Bootstrap HTML code in an iframe, updating in real-time as the user types.

#### Key Features
- **Real-time rendering**: Updates preview as user inputs change
- **Bootstrap integration**: Includes Bootstrap 5.3.0 CSS and JS
- **Responsive design**: Adapts to mobile and desktop layouts
- **Security**: Uses sandboxed iframe for safe HTML rendering

#### HTML Generation Process
1. Processes each `codeLine` from the question data
2. Replaces input placeholders with user values
3. Concatenates all lines into complete HTML
4. Wraps in full HTML document with Bootstrap dependencies
5. Renders in sandboxed iframe

#### Code Structure
```javascript
const previewHtml = useMemo(() => {
  if (!currentQuestion?.codeLines) return '';

  let generatedHtml = '';

  // Process each code line
  currentQuestion.codeLines.forEach(line => {
    let lineHtml = '';

    line.segments.forEach(segment => {
      if (segment.type === 'text') {
        lineHtml += segment.text;
      } else if (segment.type === 'input') {
        // Replace input placeholders with user values
        const userValue = inputs?.[segment.id] || '';
        lineHtml += userValue;
      }
    });

    generatedHtml += lineHtml + '\n';
  });

  // Wrap in complete HTML document with Bootstrap
  const fullHtml = `...`; // Full HTML template

  return fullHtml;
}, [currentQuestion?.id, inputs?.input1, inputs?.input2, inputs?.input3]);
```

#### HTML Template
The preview generates a complete HTML document:
- DOCTYPE and HTML structure
- Bootstrap 5.3.0 CSS and JS from CDN
- Custom styles for container visualization
- Responsive meta tags
- User's generated HTML in body

#### Dependencies
- `react`: For component rendering
- Bootstrap 5.3.0: For styling and functionality
- Memoization: Uses `useMemo` to prevent unnecessary re-renders

### 3. Code Challenge Editor Components

#### Main Editor Component
**Location**: `src/pages/code-challenge-editor/index.jsx`

**Features**:
- Question randomization (10 out of 15 questions per session)
- Progress tracking and session management
- Hint system with revealable hints
- Visual feedback (confetti, shake animations, error alerts)
- Navigation between questions and modules

#### CodeEditorWindow Component

**Location**: `src/pages/code-challenge-editor/components/CodeEditorWindow.jsx`

**Purpose**: Displays the code with input fields for user interaction.

**Key Features**:
- **Syntax highlighting**: Color-codes HTML tags, attributes, strings, and brackets
- **Dynamic input fields**: Auto-sizing inputs based on content length
- **Line numbers**: Displays line numbers for code reference
- **Visual feedback**: Shake animation for incorrect attempts

**Syntax Highlighting Logic**:
```javascript
const processHTML = (text) => {
  const regex = /("[^"]*")|(\bdiv\b|\bnav\b|\bul\b|\bli\b|\ba\b|\bbutton\b|\bform\b|\bspan\b)|(\bclass\b|\btype\b|\bhref\b|\bid\b|\bplaceholder\b)|([<>/=])/g;

  const parts = text.split(regex).filter(part => part !== undefined && part !== '');

  return parts.map((part, i) => {
    let colorClass = "text-[#D4D4D4]"; // Default

    if (part.startsWith('"') || part.startsWith("'")) {
      colorClass = "text-[#B5CEA8]"; // Green for strings
    } else if (['div', 'nav', 'ul', 'li', 'a', 'button', 'form', 'span'].includes(part)) {
      colorClass = "text-[#F97583]"; // Red for tags
    } else if (['class', 'type', 'href', 'id', 'placeholder'].includes(part)) {
      colorClass = "text-[#FF9800]"; // Orange for attributes
    } else if (['<', '>', '/', '='].includes(part)) {
      colorClass = "text-gray-400"; // Gray for brackets/operators
    }

    return <span key={i} className={colorClass}>{part}</span>;
  });
};
```

**Input Field Behavior**:
- Transparent background with blue accent color
- Auto-sizing based on input value length (minimum 40px)
- Focus effects with blue background highlight
- Real-time value updates to parent component

#### Additional Components
- **HintDrawer**: Manages hint display and reveal system
- **ConfettiAnimation**: Provides success feedback
- **ExplanationCard**: Shows detailed explanations after correct answers
- **FloatingActionButton**: Run code button with loading states

## Data Structure

### Question Format
```javascript
{
  id: number,
  moduleId: string,
  title: string,
  description: string,
  fileName: string,
  codeLines: [
    {
      segments: [
        { type: 'text', text: string },
        { type: 'input', id: 'input1', placeholder: string }
      ]
    }
  ],
  correctAnswers: {
    input1: string,
    input2: string,
    input3: string
  },
  explanation: string,
  hints: string[]
}
```

### State Management
- **Progress Context**: Tracks module completion, question progress, answer recording
- **Local State**: Manages UI states (hints, animations, inputs)
- **Session Storage**: Persists selected questions for module sessions

## User Experience Flow

1. **Question Selection**: System randomly selects 10 questions from 15 available
2. **Code Editing**: User fills in blanks in the code editor
3. **Live Preview**: Real-time HTML preview updates as user types
4. **Validation**: Run button triggers validation against correct answers
5. **Feedback**: Visual feedback for correct/incorrect answers
6. **Hints**: Progressive hint system for stuck users
7. **Progression**: Continue to next question or complete module

## Performance Optimizations

- **Memoization**: `useMemo` for expensive computations (HTML generation, question filtering)
- **Debounced Updates**: Input changes trigger preview updates efficiently
- **Session Persistence**: Local storage for question selection and progress
- **Lazy Loading**: Components load only when needed

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Color Contrast**: High contrast colors for readability
- **Focus Management**: Proper focus indicators and management

## Error Handling

- **Safe Navigation**: Checks for undefined/null values throughout
- **Graceful Degradation**: Fallbacks for missing data
- **User Feedback**: Clear error messages and alerts
- **Recovery Mechanisms**: Reset states and retry options

This documentation covers the core functionality of the code challenge editor system, providing developers with the information needed to understand, maintain, and extend the codebase.
