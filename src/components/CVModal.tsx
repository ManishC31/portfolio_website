import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CVModal = ({ isOpen, onClose }: CVModalProps) => {
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl h-[85vh] card-futuristic flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <h3 className="font-display font-semibold text-lg text-foreground">
                Resume — Manish Chavan
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="/Manish_Chavan_CV.pdf"
                  download="Manish_Chavan_CV.pdf"
                  className="btn-primary-glow !py-2 !px-4 !text-sm flex items-center gap-2"
                >
                  <Download size={16} /> Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 overflow-auto flex flex-col items-center bg-muted/30 p-4 gap-4">
              <Document
                file="/Manish_Chavan_CV.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Loading PDF...
                  </div>
                }
                error={
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Failed to load PDF.
                  </div>
                }
              >
                {Array.from({ length: numPages }, (_, i) => (
                  <Page
                    key={i + 1}
                    pageNumber={i + 1}
                    width={Math.min(800, window.innerWidth - 80)}
                    renderTextLayer
                    renderAnnotationLayer
                    className="mb-4 shadow-lg"
                  />
                ))}
              </Document>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
