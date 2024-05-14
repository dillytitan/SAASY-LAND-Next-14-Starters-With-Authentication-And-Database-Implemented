// artistModal.tsx
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import type { FC } from 'react';
import PressReleaseModal from './press-release';

interface ArtistModalProps {
  artistName: string;
  onClose: () => void;
}

export interface Artist {
  name: string;
  description: string;
  project: string;
  pressReleasePdf: string; // Path to the artist's press release PDF
}

export interface PressReleaseModalProps {
  pdfUrl: string;
  onClose: () => void;
}

export interface PressReleaseModalProps {
  pressReleaseId: number | null;
  onClose: () => void;
}
const artists: Artist[] = [
  {
    name: "Tan Tan",
    description: "Tan-Tan is a traditionally trained Flemish painter. Her fusion of neo-classicist art, with anime/manga comes to fruition through an innate and harnessed use of color, composition, and a deep understanding of form and light. Working both with traditional oils and the more new-age digital media (3D and animation), her images evoke a sense of deep conceptual and metaphorical truths expressed through an amalgamation of different styles.",
    project: "Project details here",
    pressReleasePdf: "/tt-pr.pdf", // Path to the PDF
  },


  // More artists here
];

const ArtistModal: FC<ArtistModalProps> = ({ onClose }) => {
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const openPressRelease = () => {
    if (selectedArtist) {
      setPdfUrl(selectedArtist.pressReleasePdf);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-25">
      <Draggable handle=".handle">
  <div className="w-full max-w-lg border-2 border-black bg-white dark:border-orange-500 dark:bg-black">
    <div className="handle flex items-center justify-between border-b-2 border-black px-4 py-1 dark:border-orange-500">
      <div className="handle">artist.exe</div>
      
    </div>
    <div className="modal-content">
          <div className="h-auto overflow-auto bg-gray-100  text-black dark:bg-black dark:text-orange-500">
          <div className="flex justify-between  w-full dark:text-orange-500">
  <div className="flex py-2 dark:text-white">
    <div className="pl-4">File</div>
    <div className="pl-4">Help</div>
  </div>
  <div>
    <button onClick={onClose} className="px-2 py-2 font-bold dark:text-white">X</button>
  </div>
</div>
           {selectedArtist ? (
              <>
              <div className ="pb-4">
                <p className="border-y-2 border-black bg-white p-4 dark:border-orange-500 dark:bg-black">
                  <strong className="uppercase dark:text-white">{selectedArtist.name}</strong>
                </p>
                <p className="uppercase p-4">{selectedArtist.description}</p>
                {/* <p>{selectedArtist.project}</p> */}
                <div className="pl-4">
                <button className="uppercase underline" onClick={openPressRelease}>Learn More</button>
                </div>
                <div className="pl-4">
                <button className="uppercase underline" onClick={() => setSelectedArtist(null)}>Back to list</button>
                </div>
                </div>
              </>
            ) : (
              artists.map((artist, index) => (
                <p className="p-4 h-[300px] border-t-2 dark:border-orange-500 cursor-pointer" key={index} onClick ={() => setSelectedArtist(artist)}>{artist.name}</p>
                
              ))
            )}

          </div>
        </div>
        
        </div>
        </Draggable>
      {/* Show the relevant press release modal if requested */}
      {pdfUrl && (
        <PressReleaseModal
          pdfUrl={pdfUrl}
          onClose={() => setPdfUrl(null)} pressReleaseId={null}        />
      )}
    </div>
    
  );
};

export default ArtistModal;