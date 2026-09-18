import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  ExternalLink, 
  FileText, 
  CheckCircle, 
  BookmarkCheck, 
  TrendingUp,
  Award
} from 'lucide-react';
import { landmarkStudies } from '../data/studiesData';

export default function ResearchLibrary() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Diabetes & Metabolism', 'Neurology', 'Cardiovascular', 'Consensus Guidelines', 'Obstetrics', 'Gastroenterology & Oncology'];

  const filteredStudies = landmarkStudies.filter(s => {
    const matchesCat = selectedCat === 'All' || s.category === selectedCat;
    const matchesSearch = 
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.authors.toLowerCase().includes(search.toLowerCase()) ||
      s.journal.toLowerCase().includes(search.toLowerCase()) ||
      s.keyFinding.toLowerCase().includes(search.toLowerCase()) ||
      s.significance.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="evidence-library">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5 text-teal-700" />
            <span>Peer-Reviewed Clinical Evidence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Landmark Studies & International Consensus
          </h2>
          <p className="mt-3 text-slate-600 text-sm leading-relaxed">
            Key clinical trials, systematic reviews, and joint consensus statements from the European Federation of Periodontology (EFP), American Academy of Periodontology (AAP), and American Heart Association (AHA).
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search studies by author, journal, or condition..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-xs sm:text-sm bg-white outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCat === cat
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStudies.map((study) => (
            <div 
              key={study.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    {study.category}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {study.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug mt-2">
                  {study.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-medium italic">
                  {study.authors} — <span className="font-semibold text-slate-700 not-italic">{study.journal}</span>
                </p>

                <div className="my-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase mb-1">
                    Study Design:
                  </span>
                  {study.studyDesign}
                </div>

                <div className="mb-3 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-1">
                    Principal Finding:
                  </span>
                  <p className="leading-relaxed bg-teal-50/40 p-2.5 rounded-lg border border-teal-100">
                    {study.keyFinding}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2 text-xs text-slate-600 mb-3">
                  <Award className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed"><strong>Significance:</strong> {study.significance}</span>
                </div>

                {study.doi && (
                  <a
                    href={`https://doi.org/${study.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline"
                  >
                    <span>View via DOI: {study.doi}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
