export const identificationQuestions = [
  // Chapter 1 Questions
  {
    id: 'chapter-1-set-1',
    chapterId: 'chapter-1',
    title: 'Software Engineering Definition',
    context: 'Software Engineering is the application of a [1], [2], [3] approach to the development, operation, and maintenance of software.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Systematic' },
      { id: 'blank-2', correctAnswer: 'Disciplined' },
      { id: 'blank-3', correctAnswer: 'Quantifiable' }
    ],
    wordBank: ['Systematic', 'Disciplined', 'Quantifiable', 'Random', 'Unstructured', 'Qualitative'],
    explanation: 'Software Engineering applies a systematic, disciplined, and quantifiable approach to software development.',
    hints: [
      'Think about methodical processes',
      'Consider professional standards',
      'Focus on measurable outcomes'
    ]
  },
  {
    id: 'chapter-1-set-2',
    chapterId: 'chapter-1',
    title: 'Software Engineering History',
    context: 'Software Engineering was first introduced in [1] during a conference about the "[2]" caused by the introduction of third-generation hardware.',
    blanks: [
      { id: 'blank-1', correctAnswer: '1968' },
      { id: 'blank-2', correctAnswer: 'Software Crisis' }
    ],
    wordBank: ['1968', 'Software Crisis', '1970', 'Hardware Crisis', '1980', 'Programming Crisis'],
    explanation: 'Software Engineering emerged in 1968 during the "Software Crisis" conference addressing issues with third-generation hardware.',
    hints: [
      'Look for the year when SE was formalized',
      'Consider what crisis led to SE creation'
    ]
  },
  {
    id: 'chapter-1-set-3',
    chapterId: 'chapter-1',
    title: 'Software Development Myths',
    context: 'A common myth is that if we get behind schedule, we can simply add more [1] to catch up. Another myth is that [2] the project to a third party allows the firm to relax.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Programmers' },
      { id: 'blank-2', correctAnswer: 'Outsourcing' }
    ],
    wordBank: ['Programmers', 'Outsourcing', 'Computers', 'Delegating', 'Managers', 'Subcontracting'],
    explanation: 'Common myths include adding programmers to catch up (Brook\'s Law) and outsourcing allowing relaxation (which often leads to more problems).',
    hints: [
      'Think about Brook\'s Law',
      'Consider external project management'
    ]
  },
  {
    id: 'chapter-1-set-4',
    chapterId: 'chapter-1',
    title: 'Software Failures',
    context: 'The [1] exploded in 1996 due to a conversion error from 64-bit floating point to 16-bit integer. The [2] was lost in 1999 due to confusion between Imperial and Metric measurements.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Ariane 5' },
      { id: 'blank-2', correctAnswer: 'Mars Climate Orbiter' }
    ],
    wordBank: ['Ariane 5', 'Mars Climate Orbiter', 'Challenger', 'Columbia', 'Apollo 13', 'Hubble Telescope'],
    explanation: 'The Ariane 5 rocket failed due to data type conversion errors, and the Mars Climate Orbiter was lost due to unit conversion problems.',
    hints: [
      'European space rocket failure',
      'Mars mission lost to measurement confusion'
    ]
  },

  // Chapter 1-2 Questions (Advanced SE Concepts)
  {
    id: 'chapter-1-2-set-1',
    chapterId: 'chapter-1-2',
    title: 'Requirements Engineering',
    context: 'Requirements Engineering involves [1] requirements from stakeholders and documenting them in a [2] manner that serves as the foundation for all subsequent development activities.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'eliciting' },
      { id: 'blank-2', correctAnswer: 'verifiable' }
    ],
    wordBank: ['eliciting', 'verifiable', 'gathering', 'traceable', 'collecting', 'measurable'],
    explanation: 'Requirements Engineering focuses on systematically eliciting, analyzing, and documenting stakeholder requirements in a verifiable manner.',
    hints: [
      'Process of obtaining requirements',
      'Requirements must be this to validate'
    ]
  },

  // Chapter 2 Questions (Software Development Life Cycle)
  {
    id: 'chapter-2-set-1',
    chapterId: 'chapter-2',
    title: 'SDLC Models',
    context: 'The [1] model follows a linear sequence where each phase must be completed before the next begins, while the [2] model allows for iterative development with customer feedback.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Waterfall' },
      { id: 'blank-2', correctAnswer: 'Agile' }
    ],
    wordBank: ['Waterfall', 'Agile', 'Spiral', 'Scrum', 'V-Model', 'Iterative'],
    explanation: 'Waterfall follows a sequential approach, while Agile emphasizes iterative development with continuous customer collaboration.',
    hints: [
      'Linear, sequential development',
      'Flexible, iterative approach'
    ]
  },

  // Chapter 3 Questions (Requirements Engineering)
  {
    id: 'chapter-3-set-1',
    chapterId: 'chapter-3',
    title: 'Requirements Types',
    context: '[1] requirements describe what the system must do from the user\'s perspective, while [2] requirements specify how the system should be implemented.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Functional' },
      { id: 'blank-2', correctAnswer: 'Non-functional' }
    ],
    wordBank: ['Functional', 'Non-functional', 'Technical', 'Business', 'User', 'System'],
    explanation: 'Functional requirements specify what the system should do, while non-functional requirements describe quality attributes like performance and security.',
    hints: [
      'What the system does',
      'Quality attributes and constraints'
    ]
  },

  // Chapter 4 Questions (Software Design)
  {
    id: 'chapter-4-set-1',
    chapterId: 'chapter-4',
    title: 'Design Principles',
    context: 'The [1] principle states that software should be open for extension but closed for modification, while [2] coupling refers to the degree of interdependence between modules.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Open-Closed' },
      { id: 'blank-2', correctAnswer: 'Tight' }
    ],
    wordBank: ['Open-Closed', 'Tight', 'SOLID', 'Loose', 'Single Responsibility', 'High'],
    explanation: 'Open-Closed principle promotes extensibility without modification. Coupling measures module interdependence.',
    hints: [
      'SOLID principle about extension',
      'Type of coupling to avoid'
    ]
  },

  // Chapter 5 Questions (Software Testing)
  {
    id: 'chapter-5-set-1',
    chapterId: 'chapter-5',
    title: 'Testing Levels',
    context: '[1] testing verifies individual components, [2] testing validates component interactions, and [3] testing evaluates the entire system in the production environment.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Unit' },
      { id: 'blank-2', correctAnswer: 'Integration' },
      { id: 'blank-3', correctAnswer: 'System' }
    ],
    wordBank: ['Unit', 'Integration', 'System', 'Acceptance', 'Regression', 'Performance'],
    explanation: 'Testing progresses from unit (components) to integration (interactions) to system (end-to-end) levels.',
    hints: [
      'Individual functions/methods',
      'Component interactions',
      'Complete system validation'
    ]
  },

  // Chapter 6 Questions (Software Maintenance)
  {
    id: 'chapter-6-set-1',
    chapterId: 'chapter-6',
    title: 'Maintenance Types',
    context: '[1] maintenance fixes bugs discovered after release, [2] maintenance adds new features requested by users, and [3] maintenance adapts software to new environments.',
    blanks: [
      { id: 'blank-1', correctAnswer: 'Corrective' },
      { id: 'blank-2', correctAnswer: 'Perfective' },
      { id: 'blank-3', correctAnswer: 'Adaptive' }
    ],
    wordBank: ['Corrective', 'Perfective', 'Adaptive', 'Preventive', 'Emergency', 'Enhancement'],
    explanation: 'Software maintenance includes corrective (bug fixes), perfective (enhancements), and adaptive (environment changes) types.',
    hints: [
      'Bug fixes and error correction',
      'Adding new features',
      'Adapting to new environments'
    ]
  }
];

// Helper function to get questions for a specific chapter
export const getQuestionsForChapter = (chapterId) => {
  return identificationQuestions.filter(question => question.chapterId === chapterId);
};

// Helper function to get all chapters with their question counts
export const getChapterStats = () => {
  const chapterStats = {};
  identificationQuestions.forEach(question => {
    if (!chapterStats[question.chapterId]) {
      chapterStats[question.chapterId] = {
        totalQuestions: 0,
        title: question.title.split(' - ')[0] // Extract chapter title
      };
    }
    chapterStats[question.chapterId].totalQuestions++;
  });
  return chapterStats;
};
