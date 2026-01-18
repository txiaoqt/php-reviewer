import React from 'react';
import Icon from '../../../components/AppIcon';

const CodeEditorWindow = ({
  fileName = "challenge.php",
  lineNumbers = [],
  codeLines = [],
  inputs = {},
  onInputChange = () => {},
  isShaking = false
}) => {

  const processHTML = (text) => {
    if (!text) return null;

    // Improved Regex:
    // 1. Matches text inside quotes (including the quotes)
    // 2. Matches tags (div, nav, etc.)
    // 3. Matches attributes (class, href, etc.)
    // 4. Matches brackets (<, >, /)
    // 5. Matches everything else as "text"
    const regex = /("[^"]*")|(\bdiv\b|\bnav\b|\bul\b|\bli\b|\ba\b|\bbutton\b|\bform\b|\bspan\b)|(\bclass\b|\btype\b|\bhref\b|\bid\b|\bplaceholder\b)|([<>/=])/g;

    // Split and filter empty parts
    const parts = text.split(regex).filter(part => part !== undefined && part !== '');

    return parts.map((part, i) => {
      let colorClass = "text-[#D4D4D4]"; // Default White-ish Gray (The fix you asked for)

      // 1. Strings (Green) - Check if it starts and ends with quotes
      if (part.startsWith('"') || part.startsWith("'")) {
        colorClass = "text-[#B5CEA8]";
      }

      // 2. Tags (Red)
      else if (['div', 'nav', 'ul', 'li', 'a', 'button', 'form', 'span'].includes(part)) {
        colorClass = "text-[#F97583]";
      }

      // 3. Attributes (Orange)
      else if (['class', 'type', 'href', 'id', 'placeholder'].includes(part)) {
        colorClass = "text-[#FF9800]";
      }

      // 4. Brackets & Equals (Gray)
      else if (['<', '>', '/', '='].includes(part)) {
        colorClass = "text-gray-400";
      }

      return <span key={i} className={colorClass}>{part}</span>;
    });
  };

  return (
    <div className={`bg-[#1e1e1e] rounded-lg overflow-hidden border border-[#333] shadow-xl ${isShaking ? 'animate-shake' : ''}`}>

      {/* macOS Window Header */}
      <div className="bg-[#252526] px-4 py-3 flex items-center gap-2 border-b border-[#1e1e1e]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-4 flex items-center gap-2 bg-[#1e1e1e] px-3 py-1 rounded border border-[#333]">
          <Icon name="FileCode" size={14} color="#0EA5E9" />
          <span className="text-sm text-slate-300 font-mono">{fileName}</span>
        </div>
      </div>

      <div className="p-4 md:p-6 overflow-x-auto font-mono text-sm md:text-base leading-relaxed">
        <div className="flex gap-4">

          {/* Line Numbers */}
          <div className="flex flex-col text-right select-none min-w-[2rem] pt-[2px]">
            {lineNumbers?.map((num) => (
              <div key={num} className="text-[#858585] leading-8 h-8">{num}</div>
            ))}
          </div>

          {/* Code Lines */}
          <div className="flex-1 min-w-0">
            {codeLines?.map((line, index) => (
              // Use flex items-center so inputs align with text baseline
              <div key={index} className="leading-8 h-8 flex items-center whitespace-pre">
                {line?.segments?.map((segment, segIndex) => {

                  // RENDER INPUT FIELDS
                  if (segment?.type === 'input') {
                    // FIX: Calculate width based on INPUT VALUE length, not placeholder
                    const valueLength = inputs?.[segment?.id]?.length || 0;
                    const width = Math.max(valueLength * 10, 40); // Min 40px, grows 10px per char

                    return (
                      <input
                        key={segIndex}
                        type="text"
                        value={inputs?.[segment?.id] || ''}
                        onChange={(e) => onInputChange(segment?.id, e?.target?.value)}
                        className="bg-transparent border-b border-gray-600 text-[#0EA5E9] outline-none px-1 mx-1 font-mono text-center h-6 focus:border-blue-500 focus:bg-blue-500/10 transition-all"
                        style={{ width: `${width}px` }}
                        autoComplete="off"
                      />
                    );
                  }

                  // RENDER TEXT SEGMENTS (With new coloring logic)
                  if (segment?.type === 'text') {
                    return (
                      <React.Fragment key={segIndex}>
                        {processHTML(segment.text)}
                      </React.Fragment>
                    );
                  }

                  return null;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorWindow;
