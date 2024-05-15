// ModalHeader.js

import React from 'react';

interface ModalHeaderProps {
  onClose: () => void;
  title: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, title }) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-black px-4 py-1 dark:border-orange-500">
        <p>{title}</p>
      </div>
      <div className="flex justify-between">
        <div className="flex py-2">
          <div className="pl-4">File</div>
          <div className="pl-4">Help</div>
        </div>
        <button onClick={onClose} className="px-2 py-1 font-bold">X</button>
      </div>
    </div>
  );
};
