import React, { useState } from 'react';

export function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-medium rounded shadow-lg whitespace-nowrap z-50 pointer-events-none">
          {text}
        </div>
      )}
    </div>
  );
}
