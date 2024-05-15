// DropdownMenu.tsx
import React from 'react';
import type { FC } from 'react';

interface DropdownMenuProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const DropdownMenu: FC<DropdownMenuProps> = ({ isVisible, children }) => {
  return (
    <div className={`absolute mt-2 py-1 w-48 bg-white rounded shadow-lg border border-gray-200 cursor-pointer ${isVisible ? 'block' : 'hidden'}`}>
      {children}
    </div>
  );
};

export default DropdownMenu;
