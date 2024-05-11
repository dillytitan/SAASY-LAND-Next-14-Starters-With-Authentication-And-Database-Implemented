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
    description: "Description here",
    project: "Project details here",
    pressReleasePdf: "/tt-pr.pdf", // Path to the PDF
  },
  {
    name: "Jane Doe",
    description: "Artist 2 description",
    project: "Second project details",
    pressReleasePdf: "/pdfs/jane-doe-press-release.pdf", // Path to the PDF
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
      <Draggable>
        <div className="w-full max-w-lg border-2 border-black bg-white dark:border-orange-500 dark:bg-black">
          <div className="flex items-center justify-between border-b-2 border-black px-4 py-1 dark:border-orange-500">
            <p>artist.exe</p>
            <button onClick={onClose} className="px-2 py-1 font-bold">X</button>
          </div>
          <div className="h-96 overflow-auto bg-gray-100 p-2 text-black dark:bg-black dark:text-orange-500">
            {selectedArtist ? (
              <>
                <p className="border-2 border-black bg-white p-4 dark:border-orange-500 dark:bg-black">
                  <strong>{selectedArtist.name}</strong>
                </p>
                <p>{selectedArtist.description}</p>
                <p>{selectedArtist.project}</p>
                <button onClick={openPressRelease}>View Press Release</button>
                <button onClick={() => setSelectedArtist(null)}>Back to list</button>
              </>
            ) : (
              artists.map((artist, index) => (
                <p key={index} onClick={() => setSelectedArtist(artist)}>{artist.name}</p>
              ))
            )}
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