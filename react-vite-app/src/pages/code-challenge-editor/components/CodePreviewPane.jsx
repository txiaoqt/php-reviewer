import React, { useMemo } from 'react';

const CodePreviewPane = ({ currentQuestion, inputs }) => {
  // Memoize the HTML generation to prevent infinite loops
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
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap Preview</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #ffffff; /* Changed to white for better contrast */
            padding: 20px;
        }
        /* Fix container width behavior inside iframe */
        .container, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl, .container-xxl {
             border: 1px dashed #ccc; /* Helper to see container boundaries */
             background-color: #f8f9fa;
             min-height: 50px;
        }
        .row {
            background-color: rgba(0,0,0,.05);
            min-height: 50px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        [class*="col-"] {
            padding-top: .75rem;
            padding-bottom: .75rem;
            background-color: rgba(39, 167, 245, 0.15);
            border: 1px solid rgba(39, 167, 245, 0.2);
        }
    </style>
</head>
<body>
    ${generatedHtml}
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;

    return fullHtml;
  }, [currentQuestion?.id, inputs?.input1, inputs?.input2, inputs?.input3]);

  return (
    // CHANGE 1: Wrapper
    // Mobile: h-auto (let it sit naturally)
    // Desktop: h-full (stretch to match the editor)
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#333] shadow-xl flex flex-col h-auto lg:h-full">

      {/* Header */}
      <div className="bg-[#252526] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e1e] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-4 flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded border border-[#333]">
          <svg className="w-4 h-4 text-[#0EA5E9]" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 010 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-slate-300 font-mono">Live Preview</span>
        </div>
      </div>

      {/* CONTENT AREA (The White Box) */}
      {/* flex-1: Fills the remaining vertical space on Desktop */}
      {/* min-h-[400px]: FORCE a minimum height on Mobile so it doesn't vanish */}
      <div className="bg-white relative w-full flex-1 min-h-[400px] flex flex-col">
        {previewHtml ? (
          <iframe
            key={currentQuestion?.id || 'preview'}
            srcDoc={previewHtml}
            className="w-full h-full border-0 flex-1"
            title="Bootstrap Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-lg font-medium">Live Preview</p>
              <p className="text-sm">Your Bootstrap code will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreviewPane;
