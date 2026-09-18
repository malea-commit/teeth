import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  FlaskConical, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Sparkles,
  Layers
} from 'lucide-react';
import { biomarkersData } from '../data/biomarkersData';

export default function BiomarkersMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Oral Enzymatic Marker',
    'Systemic Inflammatory Marker',
    'Metabolic Biomarker',
    'Microbial & Virulence Marker',
    'Innate Immune Biomarker',
    'Epigenetic Liquid Biopsy'
  ];

  const filteredBiomarkers = biomarkersData.filter(b => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = 
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.systemicRelevance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.matrix.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clinicalRole.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="biomarkers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Salivary Diagnostics & Systemic Serology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Biomarker Matrix & Molecular Diagnostics
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Comparing oral fluid (saliva & gingival crevicular fluid) molecular diagnostics against conventional systemic serum markers. Discover how point-of-care chairside biomarkers identify collagen breakdown and vascular inflammation before irreversible organ injury.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search biomarkers, matrices, or conditions (e.g. 'aMMP-8', 'hs-CRP')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs sm:text-sm bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.slice(0, 4).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Biomarkers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredBiomarkers.map((bio) => (
            <div
              key={bio.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    {bio.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Matrix: {bio.matrix}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {bio.name}
                </h3>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  {bio.clinicalRole}
                </p>

                {/* Range Indicators */}
                <div className="grid grid-cols-2 gap-3 my-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Normal Homeostatic Level
                    </span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {bio.normalRange}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Pathologic / Active Stage
                    </span>
                    <span className="text-xs font-bold text-rose-700 flex items-center gap-1 mt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      {bio.elevatedRange}
                    </span>
                  </div>
                </div>

                {/* Systemic Relevance */}
                <div className="mb-3">
                  <span className="text-xs font-bold text-slate-900 block mb-1">
                    Systemic Disease Correlation:
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {bio.systemicRelevance}
                  </p>
                </div>
              </div>

              {/* Diagnostic Utility Banner */}
              <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3 text-xs text-teal-900 mt-4">
                <span className="font-bold block text-teal-950 mb-1 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Clinical & Point-of-Care Utility:
                </span>
                <p className="text-[11px] leading-relaxed text-teal-900">
                  {bio.diagnosticAdvantage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Point of Care Diagnostic Callout */}
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                The Future of Preventive Healthcare
              </span>
              <h3 className="text-2xl font-bold">
                Saliva: The Non-Invasive "Mirror of the Bloodstream"
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Whole saliva contains over 2,000 proteins, cytokines, antibodies, and microbial genomic elements filtered continuously from surrounding capillary beds. Unlike venipuncture, oral fluid sampling is completely non-invasive, painless, repeatable, and capable of generating real-time biomarker readings in under 5 minutes at chairside.
              </p>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-4 text-center shrink-0 w-full md:w-auto">
              <span className="text-3xl font-black text-teal-300 block">5 Min</span>
              <span className="text-xs text-slate-300 font-medium">Chairside aMMP-8 Readout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
