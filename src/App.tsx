/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CapabilitiesPage } from './pages/CapabilitiesPage';
import { LifecyclePage } from './pages/LifecyclePage';
import { LaboratoryPage } from './pages/LaboratoryPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { EngagementPage } from './pages/EngagementPage';
import { CapabilitiesDeckPage } from './pages/CapabilitiesDeckPage';
import { InteractiveRfqModal } from './components/InteractiveRfqModal';
import { PdfViewerModal } from './components/PdfViewerModal';

export default function App() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [initialModelId, setInitialModelId] = useState<string | undefined>(undefined);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const handleOpenRfq = (modelId?: string) => {
    setInitialModelId(modelId);
    setRfqModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Route change scroll position reset */}
      <ScrollToTop />

      {/* Top Bar Navigation (Top Bar Contract: 3 zones, single-line links) */}
      <Navbar 
        onOpenRfq={() => handleOpenRfq()} 
        onOpenPdf={() => setPdfModalOpen(true)} 
      />

      {/* Multipage Routes */}
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                onOpenRfq={() => handleOpenRfq()} 
                onOpenPdf={() => setPdfModalOpen(true)} 
              />
            } 
          />
          <Route 
            path="/capabilities" 
            element={
              <CapabilitiesPage 
                onOpenRfq={() => handleOpenRfq()} 
                onOpenPdf={() => setPdfModalOpen(true)} 
              />
            } 
          />
          <Route 
            path="/lifecycle" 
            element={
              <LifecyclePage 
                onOpenRfq={() => handleOpenRfq()} 
                onOpenPdf={() => setPdfModalOpen(true)} 
              />
            } 
          />
          <Route 
            path="/laboratory" 
            element={
              <LaboratoryPage 
                onOpenRfq={() => handleOpenRfq()} 
                onOpenPdf={() => setPdfModalOpen(true)} 
              />
            } 
          />
          <Route 
            path="/industries" 
            element={
              <IndustriesPage 
                onOpenRfq={() => handleOpenRfq()} 
                onOpenPdf={() => setPdfModalOpen(true)} 
              />
            } 
          />
          <Route 
            path="/engagement" 
            element={
              <EngagementPage 
                onOpenPdf={() => setPdfModalOpen(true)} 
              />
            } 
          />
          <Route 
            path="/deck" 
            element={<CapabilitiesDeckPage />} 
          />
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Corporate Engineering Footer */}
      <Footer 
        onOpenRfq={() => handleOpenRfq()} 
        onOpenPdf={() => setPdfModalOpen(true)} 
      />

      {/* Global Interactive Project Scope & RFQ Modal */}
      <InteractiveRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialModelId={initialModelId}
      />

      {/* Global PDF & Slide Deck Quick Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />
    </div>
  );
}
