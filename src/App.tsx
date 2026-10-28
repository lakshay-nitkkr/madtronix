/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoreCapabilities } from './components/CoreCapabilities';
import { DisciplinesSection } from './components/DisciplinesSection';
import { LifecycleSection } from './components/LifecycleSection';
import { QualityAndStandards } from './components/QualityAndStandards';
import { LaboratorySection } from './components/LaboratorySection';
import { DefenseAerospace } from './components/DefenseAerospace';
import { IndustriesSection } from './components/IndustriesSection';
import { EngagementSection } from './components/EngagementSection';
import { Footer } from './components/Footer';
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
      {/* Top Bar Navigation */}
      <Navbar 
        onOpenRfq={() => handleOpenRfq()} 
        onOpenPdf={() => setPdfModalOpen(true)} 
      />

      {/* Main Corporate Content */}
      <main className="flex-1">
        {/* Page 1: Capability Overview & Hero */}
        <Hero 
          onOpenRfq={() => handleOpenRfq()} 
          onOpenPdf={() => setPdfModalOpen(true)} 
        />

        {/* Page 2: Engineering Core Capabilities & Stackup Synthesizer */}
        <CoreCapabilities 
          onOpenRfq={() => handleOpenRfq()} 
        />

        {/* Page 3 & 8: Specialized Engineering Disciplines, EMI/EMC, FPGA & RF */}
        <DisciplinesSection 
          onOpenRfq={() => handleOpenRfq()} 
        />

        {/* Page 4: End-to-End Development Lifecycle */}
        <LifecycleSection 
          onOpenRfq={() => handleOpenRfq()} 
        />

        {/* Page 5: Hardware Quality and SMT Precision */}
        <QualityAndStandards />

        {/* Page 6: In-House Laboratory Capabilities & Interactive Oscilloscope */}
        <LaboratorySection />

        {/* Page 7: Defense & Aerospace Engineering */}
        <DefenseAerospace 
          onOpenRfq={() => handleOpenRfq()} 
        />

        {/* Page 9: Industries Served */}
        <IndustriesSection 
          onOpenRfq={() => handleOpenRfq()} 
        />

        {/* Page 10: Flexible Commercial Collaboration */}
        <EngagementSection 
          onOpenRfq={handleOpenRfq} 
        />
      </main>

      {/* Corporate Engineering Footer */}
      <Footer 
        onOpenRfq={() => handleOpenRfq()} 
        onOpenPdf={() => setPdfModalOpen(true)} 
      />

      {/* Interactive Project Scope & RFQ Modal */}
      <InteractiveRfqModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        initialModelId={initialModelId}
      />

      {/* PDF & Slide Deck Viewer Modal */}
      <PdfViewerModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />
    </div>
  );
}
