import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >

          {/*  Modal Box */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg mx-4 max-h-[90vh] flex flex-col rounded-2xl shadow-2xl bg-black/50 backdrop-blur-xl border border-white/10"
          >

            {/*  Glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-orange-600/5 opacity-0 hover:opacity-100 blur-xl transition"></div>

            {/*  Header */}
            <div className="relative z-10 px-6 py-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">
                {title}
              </h3>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-red-400 text-2xl leading-none transition"
              >
                &times;
              </button>
            </div>

            {/*  Body */}
            <div className="relative z-10 p-6 overflow-y-auto text-gray-300">
              {children}
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;