export const questions = [
  // Bootstrap Containers (2-3 questions)
  {
    id: 1,
    moduleId: 'php-basics',
    title: "Bootstrap Containers - Responsive Breakpoints",
    description: "Fill in the blanks to create responsive containers. Each container should be 100% wide until a specific breakpoint, then scale up. For example, add the correct class for a container that is 100% wide until the small breakpoint.",
    fileName: "bootstrap-containers-1.html",
    codeLines: [
      // LINE 1: Combined into one object
      {
        segments: [
          { type: 'text', text: '<div class="', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">100% wide until small breakpoint</div>', className: '' }
        ]
      },
      // LINE 2: Combined
      {
        segments: [
          { type: 'text', text: '<div class="container-md">100% wide until ', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: ' breakpoint</div>', className: '' }
        ]
      },
      // LINE 3: Combined
      {
        segments: [
          { type: 'text', text: '<div class="container-lg">100% wide until ', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: ' breakpoint</div>', className: '' }
        ]
      },
      // LINE 4: Just Text
      {
        segments: [
          { type: 'text', text: '<div class="container-xl">100% wide until extra large breakpoint</div>', className: '' }
        ]
      },
      // LINE 5: Combined
      {
        segments: [
          { type: 'text', text: '<div ', className: '' },
          { type: 'input', id: 'input4', placeholder: '', className: '' },
          { type: 'text', text: '>100% wide until extra extra large breakpoint</div>', className: '' }
        ]
      }
    ],
    correctAnswers: {
      input1: "container-sm",
      input2: "medium",
      input3: "large",
      input4: 'class="container-xxl"'
    },
    explanation: "Bootstrap containers are responsive! .container-sm is 100% wide until small breakpoint, then scales up. .container-md until medium, .container-lg until large, .container-xl until extra large, and .container-xxl until extra extra large.",
    hints: [
      "First input: container-sm",
      "Second input: medium",
      "Third input: large",
      "Fourth input: class='container-xxl'",
      "Fifth input: container-xxl"
    ]
  },
  {
    id: 2,
    moduleId: 'php-basics',
    title: "Bootstrap Containers - Default Container",
    description: "Add a div with class 'container' around the h1 and p elements to create a responsive container that centers content and provides consistent padding.",
    fileName: "bootstrap-containers-2.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<!DOCTYPE html>', className: 'text-[#C586C0]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<html lang="en">', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<head>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <meta charset="UTF-8">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <title>Bootstrap Container</title>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</head>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<body>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '', className: '' }
        ]
      },
      // Combined input1 with surrounding content
      {
        segments: [
          {
            type: 'input',
            id: 'input1',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <h1 class="text-center">Hello Bootstrap!</h1>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <p>This container is responsive and centers content.</p>', className: 'text-[#D4D4D4]' }
        ]
      },
      // Combined input2
      {
        segments: [
          {
            type: 'input',
            id: 'input2',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</body>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</html>', className: 'text-[#569CD6]' }
        ]
      }
    ],
    correctAnswers: {
      input1: '<div class="container">',
      input2: '</div>'
    },
    explanation: "The default .container class provides a responsive fixed width container. It's 100% wide on mobile and becomes fixed width on larger screens, with responsive padding on both sides.",
    hints: [
      "First input: <div class=\"container\">",
      "Second input: </div>"
    ]
  },

  // Bootstrap Grid System (2-3 questions)
  {
    id: 3,
    moduleId: 'php-basics',
    title: "Bootstrap Grid - Basic Row and Columns",
    description: "Create a two-column layout using Bootstrap's grid system. Add a div with class 'row' around the columns, then wrap each paragraph in a div with class 'col-6' to create equal-width columns that display side-by-side.",
    fileName: "bootstrap-grid-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="container">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  ', className: '' },
          {
            type: 'input',
            id: 'input1',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    ', className: '' },
          {
            type: 'input',
            id: 'input2',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <p>Left Column</p>', className: 'text-[#D4D4D4]' },
          {
            type: 'input',
            id: 'input3',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    ', className: '' },
          {
            type: 'input',
            id: 'input4',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <p>Right Column</p>', className: 'text-[#D4D4D4]' },
          {
            type: 'input',
            id: 'input5',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  ', className: '' },
          {
            type: 'input',
            id: 'input6',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: '<div class="row">',
      input2: '<div class="col-6">',
      input3: '</div>',
      input4: '<div class="col-6">',
      input5: '</div>',
      input6: '</div>'
    },
    explanation: "Bootstrap's grid system uses rows to create horizontal groups of columns. Columns are placed inside rows and use classes like col-6 (6 of 12 columns = half width).",
    hints: [
      "First input: <div class=\"row\">",
      "Second input: <div class=\"col-6\">",
      "Third input: </div>",
      "Fourth input: <div class=\"col-6\">",
      "Fifth input: </div>",
      "Sixth input: </div>"
    ]
  },
  {
    id: 4,
    moduleId: 'php-basics',
    title: "Bootstrap Grid - Responsive Columns",
    description: "Create a responsive two-column layout. Add a div with class 'row' around both sections. Then wrap each section (h3 + p) in a div with classes 'col-12 col-md-6' so they stack vertically on mobile but display side-by-side on tablets and larger screens.",
    fileName: "bootstrap-grid-2.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="container">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="row">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    ', className: '' }
        ]
      },
      {
        segments: [
          {
            type: 'input',
            id: 'input1',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <h3>Mobile First</h3>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <p>Full width on small screens</p>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          {
            type: 'input',
            id: 'input2',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    ', className: '' }
        ]
      },
      {
        segments: [
          {
            type: 'input',
            id: 'input3',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <h3>Tablet & Up</h3>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <p>Half width on medium screens and up</p>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          {
            type: 'input',
            id: 'input4',
            placeholder: '',
            className: ''
          }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: '<div class="col-12 col-md-6">',
      input2: '</div>',
      input3: '<div class="col-12 col-md-6">',
      input4: '</div>'
    },
    explanation: "Responsive columns stack on mobile (col-12 = full width) but become side-by-side on tablets and larger (col-md-6 = half width on medium screens and up).",
    hints: [
      "First input: <div class=\"col-12 col-md-6\">",
      "Second input: </div>",
      "Third input: <div class=\"col-12 col-md-6\">",
      "Fourth input: </div>"
    ]
  },

  // Bootstrap Form Controls (2-3 questions)
  {
    id: 5,
    moduleId: 'php-basics',
    title: "Bootstrap Form - Input Types",
    description: "Create properly styled form controls with labels. Add 'form-label' class to labels and 'form-control' class to inputs.",
    fileName: "bootstrap-forms-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<form>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="mb-3">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <label class="', className: '' },
          {
            type: 'input',
            id: 'input1',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '">Email address</label>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <input type="email" class="', className: '' },
          {
            type: 'input',
            id: 'input2',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="mb-3">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <label class="', className: '' },
          {
            type: 'input',
            id: 'input3',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '">Password</label>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <input type="password" class="', className: '' },
          {
            type: 'input',
            id: 'input4',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</form>', className: 'text-[#569CD6]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'form-label',
      input2: 'form-control',
      input3: 'form-label',
      input4: 'form-control'
    },
    explanation: "Bootstrap forms use .form-label for labels and .form-control for inputs. Labels connect to inputs using the 'for' attribute matching the input's 'id'. Use appropriate input types like 'email' and 'password'.",
    hints: [
      "form-label",
      "form-control",
      "form-label",
      "form-control"
    ]
  },

  // Bootstrap Dropdowns (2 questions)
  {
    id: 6,
    moduleId: 'php-basics',
    title: "Bootstrap Dropdown - Basic Structure",
    description: "Create a functional Bootstrap dropdown. Add the button classes and attributes, then create a ul with class 'dropdown-menu' containing the menu items.",
    fileName: "bootstrap-dropdown-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="dropdown">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <button class="', className: '' },
          {
            type: 'input',
            id: 'input1',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '" type="button" data-bs-toggle="dropdown" aria-expanded="false">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    Dropdown button', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </button>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <', className: '' },
          {
            type: 'input',
            id: 'input2',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: ' class="dropdown-menu">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <li><a class="dropdown-item" href="#action1">Action 1</a></li>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <li><a class="dropdown-item" href="#action2">Action 2</a></li>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </', className: '' },
          {
            type: 'input',
            id: 'input3',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'btn btn-secondary dropdown-toggle',
      input2: 'ul',
      input3: 'ul'
    },
    explanation: "Bootstrap dropdowns need a .dropdown container, a button with data-bs-toggle='dropdown', and a .dropdown-menu with .dropdown-item links. The aria-expanded attribute helps with accessibility.",
    hints: [
      "Button classes: btn btn-secondary dropdown-toggle",
      "Menu element: ul",
      "Closing tag: ul"
    ]
  },

  // Bootstrap Navbar (2 questions)
  {
    id: 7,
    moduleId: 'php-basics',
    title: "Bootstrap Navbar - Basic Structure",
    description: "Create a responsive Bootstrap navbar with proper structure. Add the navbar classes, brand link, toggle button, collapse wrapper, and navigation menu.",
    fileName: "bootstrap-navbar-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<nav class="', className: '' },
          {
            type: 'input',
            id: 'input1',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="container-fluid">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <a class="', className: '' },
          {
            type: 'input',
            id: 'input2',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '" href="#">My Website</a>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <button class="', className: '' },
          {
            type: 'input',
            id: 'input3',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <span class="navbar-toggler-icon"></span>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    </button>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <div class="', className: '' },
          {
            type: 'input',
            id: 'input4',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '" id="navbarNav">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <ul class="', className: '' },
          {
            type: 'input',
            id: 'input5',
            placeholder: '',
            className: ''
          },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '        <li class="nav-item">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '          <a class="nav-link" href="#home">Home</a>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '        </li>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      </ul>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    </div>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#569CD6]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</nav>', className: 'text-[#569CD6]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'navbar navbar-expand-lg navbar-light bg-light',
      input2: 'navbar-brand',
      input3: 'navbar-toggler',
      input4: 'collapse navbar-collapse',
      input5: 'navbar-nav'
    },
    explanation: "Bootstrap navbars use .navbar classes with expand-lg for responsive collapse. Brand links use .navbar-brand, navigation uses .navbar-nav with .nav-item and .nav-link. Mobile toggle uses data-bs-toggle='collapse'.",
    hints: [
      "navbar navbar-expand-lg navbar-light bg-light",
      "navbar-brand",
      "navbar-toggler",
      "collapse navbar-collapse",
      "navbar-nav"
    ]
  },

  // Additional Bootstrap Questions (8-15 for randomization)
  {
    id: 8,
    moduleId: 'php-basics',
    title: "Bootstrap Utilities - Text Colors",
    description: "Apply Bootstrap text color utilities. Add the appropriate classes to make the first heading blue, the second heading green, and the third heading red using Bootstrap's text color utilities.",
    fileName: "bootstrap-utilities-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="container">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <h1 class="', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">Blue Heading</h1>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <h2 class="', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '">Green Heading</h2>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <h3 class="', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: '">Red Heading</h3>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'text-primary',
      input2: 'text-success',
      input3: 'text-danger'
    },
    explanation: "Bootstrap provides contextual text color classes: .text-primary (blue), .text-success (green), .text-danger (red), .text-warning (yellow), .text-info (light blue), and .text-muted (gray).",
    hints: [
      "text-primary",
      "text-success",
      "text-danger"
    ]
  },

  {
    id: 9,
    moduleId: 'php-basics',
    title: "Bootstrap Cards - Basic Structure",
    description: "Create a Bootstrap card component. Add the appropriate classes to create a card with a header, body containing a title and text, and a footer.",
    fileName: "bootstrap-cards-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '">Card Header</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <h5 class="', className: '' },
          { type: 'input', id: 'input4', placeholder: '', className: '' },
          { type: 'text', text: '">Card Title</h5>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <p class="', className: '' },
          { type: 'input', id: 'input5', placeholder: '', className: '' },
          { type: 'text', text: '">Some quick example text...</p>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="', className: '' },
          { type: 'input', id: 'input6', placeholder: '', className: '' },
          { type: 'text', text: '">Card Footer</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'card',
      input2: 'card-header',
      input3: 'card-body',
      input4: 'card-title',
      input5: 'card-text',
      input6: 'card-footer'
    },
    explanation: "Bootstrap cards use .card as the container, .card-header for headers, .card-body for content, .card-title for titles, .card-text for text, and .card-footer for footers.",
    hints: [
      "card",
      "card-header",
      "card-body",
      "card-title",
      "card-text",
      "card-footer"
    ]
  },

  {
    id: 10,
    moduleId: 'php-basics',
    title: "Bootstrap Buttons - Variants",
    description: "Apply different Bootstrap button variants. Make the first button primary (blue), the second success (green), and the third danger (red) using Bootstrap's button color classes.",
    fileName: "bootstrap-buttons-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<button type="button" class="btn ', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">Primary</button>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<button type="button" class="btn ', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '">Success</button>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<button type="button" class="btn ', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: '">Danger</button>', className: '' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'btn-primary',
      input2: 'btn-success',
      input3: 'btn-danger'
    },
    explanation: "Bootstrap button variants include: .btn-primary (blue), .btn-secondary (gray), .btn-success (green), .btn-danger (red), .btn-warning (yellow), .btn-info (light blue), .btn-light (light gray), and .btn-dark (dark gray).",
    hints: [
      "btn-primary",
      "btn-success",
      "btn-danger"
    ]
  },

  {
    id: 11,
    moduleId: 'php-basics',
    title: "Bootstrap Alerts - Contextual Colors",
    description: "Create Bootstrap alert components with different colors. Make the first alert success (green), the second warning (yellow), and the third danger (red) to provide contextual feedback to users.",
    fileName: "bootstrap-alerts-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="alert ', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '" role="alert">Success! Operation completed.</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<div class="alert ', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '" role="alert">Warning! Please check your input.</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<div class="alert ', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: '" role="alert">Error! Something went wrong.</div>', className: '' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'alert-success',
      input2: 'alert-warning',
      input3: 'alert-danger'
    },
    explanation: "Bootstrap alerts use contextual color classes: .alert-success (green), .alert-info (blue), .alert-warning (yellow), .alert-danger (red), and .alert-light (light background). Always include role='alert' for accessibility.",
    hints: [
      "alert-success",
      "alert-warning",
      "alert-danger"
    ]
  },

  {
    id: 12,
    moduleId: 'php-basics',
    title: "Bootstrap Badges - Contextual Variants",
    description: "Add Bootstrap badges with different colors to highlight information. Make the first badge primary (blue), the second secondary (gray), and the third success (green).",
    fileName: "bootstrap-badges-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<span class="badge ', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">Primary</span>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<span class="badge ', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '">Secondary</span>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<span class="badge ', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: '">Success</span>', className: '' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'bg-primary',
      input2: 'bg-secondary',
      input3: 'bg-success'
    },
    explanation: "Bootstrap badges use background color classes like .bg-primary, .bg-secondary, .bg-success, .bg-danger, .bg-warning, .bg-info, .bg-light, and .bg-dark. They can also use text color classes like .text-* for different combinations.",
    hints: [
      "bg-primary",
      "bg-secondary",
      "bg-success"
    ]
  },

  {
    id: 13,
    moduleId: 'php-basics',
    title: "Bootstrap Spacing - Margin and Padding",
    description: "Apply Bootstrap spacing utilities. Add appropriate margin and padding classes to create space around elements - use margin bottom (mb-3) for the first element and padding all around (p-3) for the second element.",
    fileName: "bootstrap-spacing-1.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">Content with margin bottom</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '<div class="', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '">Content with padding all around</div>', className: '' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'mb-3',
      input2: 'p-3'
    },
    explanation: "Bootstrap spacing uses a scale from 0-5: .m* (margin), .p* (padding), directions: .mt (top), .mb (bottom), .ms (start/left), .me (end/right), .mx (horizontal), .my (vertical), and .m/p (all sides).",
    hints: [
      "mb-3",
      "p-3"
    ]
  },

  {
    id: 14,
    moduleId: 'php-basics',
    title: "Bootstrap Grid - Offset Columns",
    description: "Create a centered column layout using Bootstrap's offset utilities. Make the column take up 6 of 12 columns (half width) and center it by offsetting it 3 columns from the left.",
    fileName: "bootstrap-grid-offset.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="container">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="row">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <div class="', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <h3>Centered Column</h3>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '      <p>This column is centered using offset.</p>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'col-md-6 offset-md-3'
    },
    explanation: "Bootstrap offset classes like .offset-md-3 push columns to the right by the specified number of columns. .col-md-6 offset-md-3 creates a 6-column wide column that's offset by 3 columns, centering it in the 12-column grid.",
    hints: [
      "col-md-6 offset-md-3"
    ]
  },

  {
    id: 15,
    moduleId: 'php-basics',
    title: "Bootstrap Grid - Auto Layout",
    description: "Use Bootstrap's auto-layout columns to create equal-width columns that automatically adjust. Create three columns that each take equal width using the col class without specifying column numbers.",
    fileName: "bootstrap-grid-auto.html",
    codeLines: [
      {
        segments: [
          { type: 'text', text: '<div class="container">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  <div class="row">', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <div class="', className: '' },
          { type: 'input', id: 'input1', placeholder: '', className: '' },
          { type: 'text', text: '">Column 1</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <div class="', className: '' },
          { type: 'input', id: 'input2', placeholder: '', className: '' },
          { type: 'text', text: '">Column 2</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '    <div class="', className: '' },
          { type: 'input', id: 'input3', placeholder: '', className: '' },
          { type: 'text', text: '">Column 3</div>', className: '' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '  </div>', className: 'text-[#D4D4D4]' }
        ]
      },
      {
        segments: [
          { type: 'text', text: '</div>', className: 'text-[#D4D4D4]' }
        ]
      }
    ],
    correctAnswers: {
      input1: 'col',
      input2: 'col',
      input3: 'col'
    },
    explanation: "Bootstrap's auto-layout columns use just .col (without numbers) to create equal-width columns. The columns automatically distribute available space equally. This works well for any number of columns.",
    hints: [
      "Use 'col' class without numbers for equal width",
      "All columns with 'col' class take equal space",
      "Works for any number of columns"
    ]
  }
];
