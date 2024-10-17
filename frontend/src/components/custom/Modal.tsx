import React from 'react';
import { Button } from "@/components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;  // Callback for when "Yes" is clicked
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-background rounded-md w-11/12 md:w-1/3">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="flex justify-end p-4 border-t gap-2">
          <Button onClick={onConfirm}>
            Yes
          </Button>
          <Button onClick={onClose} variant='secondary'>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
