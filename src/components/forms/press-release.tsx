import React from 'react';
import Draggable from 'react-draggable';
import type { FC } from 'react';
interface PressRelease {
    id: number;
    title: string;
    content: string;
  }

  interface PressReleaseModalProps {
    pressReleaseId: number | null;
    pdfUrl: string;
    onClose: () => void;
  }
  
//   const pressReleases: PressRelease[] = [
//     { id: 1, title: "Tan Tan's Release", content: "Details of Tan Tan's press release..." },
//     { id: 2, title: "Jane Doe's Release", content: "Details of Jane Doe's press release..." },
//     // Add other press releases
//   ];

interface PressReleaseModalProps {
  onClose: () => void;
}

const PressReleaseModal: FC<PressReleaseModalProps> = ({ pdfUrl, onClose }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
        <Draggable handle=".handle">
          <div className="w-full max-w-lg border-2 border-black bg-white dark:border-orange-500 dark:bg-black">
            <div className="flex items-center justify-between border-b-2 border-black px-4 py-1 dark:border-orange-500 handle">
              <p>learn.pdf</p>
              
            </div>
            <div className="flex justify-between">
              <div className="flex py-2">
              <div className="pl-4">File</div>
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