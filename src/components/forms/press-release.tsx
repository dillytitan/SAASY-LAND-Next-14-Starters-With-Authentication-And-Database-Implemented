import React, { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import type { FC } from 'react';
import DropdownMenu from '../../components/forms/dropdown-modal'; // Adjust the path as necessary

export interface PressReleaseModalProps {
  pdfUrl: string;
  onClose: () => void;
  pressReleaseId: number | null; // Include this if it's genuinely needed
}

const PressReleaseModal: FC<PressReleaseModalProps> = ({ pdfUrl, onClose }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);  // For managing timeout to hide dropdown

  const showMenu = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    setShowDropdown(true);
  };

  const hideMenu = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setShowDropdown(false);
    }, 500); // 500 ms delay before hiding the dropdown
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
      <Draggable handle=".handle">
        <div className="w-full max-w-lg border-2 border-black bg-white dark:border-orange-500 dark:bg-black">
          <div className="flex items-center justify-between border-b-2 border-black px-4 py-1 dark:border-orange-500 handle">
            <p>learn.pdf</p>
          </div>
          <div className="flex justify-between">
            <div className="flex py-2 relative" onMouseLeave={hideMenu}>
              <div className="pl-4 cursor-pointer" onMouseEnter={showMenu}>
                File
                <DropdownMenu isVisible={showDropdown}>
                  <a href={pdfUrl} download="PressRelease.pdf" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Download File</a>
                </DropdownMenu>
              </div>
              <div className="pl-4">Help</div>
            </div>
            <button onClick={onClose} className="px-2 py-1 font-bold">X</button>
          </div>
          <iframe
            src={pdfUrl}
            title="Press Release PDF"
            width="100%"
            height="600px"
            className="border-2 border-black bg-white dark:border-orange-500 dark:bg-black"
          />
        </div>
      </Draggable>
    </div>
  );
};

export default PressReleaseModal;
