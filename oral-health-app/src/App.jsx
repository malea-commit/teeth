import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AnatomicalGateway from './components/AnatomicalGateway';
import ConditionsExplorer from './components/ConditionsExplorer';
import DatasetExplorer from './components/DatasetExplorer';
import BiomarkersMatrix from './components/BiomarkersMatrix';
import ClinicalScreener from './components/ClinicalScreener';
import ResearchLibrary from './components/ResearchLibrary';
import Footer from './components/Footer';
import cohortData from './data/oral_systemic_cohort.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('pathways');
  const [selectedConditionId, setSelectedConditionId] = useState(null);

  const handleSelectCondition = (conditionId) => {
    setSelectedConditionId(conditionId);
    setActiveTab('conditions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadDatasetCSV = () => {
    if (!cohortData || cohortData.length === 0) return;
    const headers = Object.keys(cohortData[0]).join(',');
    const rows = cohortData.map(obj => 
      Object.values(obj).map(val => typeof val === 'string' && val.includes(',') ? `"${val}"` : val).join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oral_systemic_cohort_full_350_patients.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-teal-200 selection:text-teal-900">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onDownloadDataset={handleDownloadDatasetCSV} 
      />

      {/* Hero Banner (Always shown at top with key metrics and quick navigation) */}
      <HeroSection 
        setActiveTab={setActiveTab} 
        onSelectCondition={handleSelectCondition} 
      />

      {/* Navigation Tab Bar for fast switching */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {[
              { id: 'pathways', label: '1. Anatomical Pathways' },
              { id: 'conditions', label: '2. Systemic Conditions' },
              { id: 'dataset', label: '3. Clinical Dataset (350 Pts)', highlight: true },
              { id: 'biomarkers', label: '4. Biomarkers Matrix' },
              { id: 'screener', label: '5. Clinical Screener' },
              { id: 'studies', label: '6. Landmark Studies' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 460, behavior: 'smooth' });
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-700 text-white shadow-sm ring-2 ring-teal-500/30'
                    : tab.highlight
                    ? 'bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="flex-1">
        {activeTab === 'pathways' && (
          <AnatomicalGateway onSelectCondition={handleSelectCondition} />
        )}

        {activeTab === 'conditions' && (
          <ConditionsExplorer selectedConditionId={selectedConditionId} />
        )}

        {activeTab === 'dataset' && (
          <DatasetExplorer />
        )}

        {activeTab === 'biomarkers' && (
          <BiomarkersMatrix />
        )}

        {activeTab === 'screener' && (
          <ClinicalScreener onSelectCondition={handleSelectCondition} />
        )}

        {activeTab === 'studies' && (
          <ResearchLibrary />
        )}
      </main>

      {/* Global Clinical Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
