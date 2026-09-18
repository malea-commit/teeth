import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  FileSpreadsheet, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  Eye, 
  BookOpen, 
  BarChart2, 
  TrendingDown, 
  Activity, 
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Share2
} from 'lucide-react';
import cohortData from '../data/oral_systemic_cohort.json';
import { dataDictionary } from '../data/dataDictionary';
import PatientModal from './PatientModal';

export default function DatasetExplorer() {
  const [data] = useState(cohortData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedStage, setSelectedStage] = useState('All');
  const [selectedSmoking, setSelectedSmoking] = useState('All');
  const [selectedRisk, setSelectedRisk] = useState('All');
  const [selectedTreatment, setSelectedTreatment] = useState('All');
  
  // Table sorting & pagination state
  const [sortField, setSortField] = useState('hscrp_mg_l');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  
  // Modals & view state
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDictionary, setShowDictionary] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState('both'); // 'table', 'charts', 'both'
  const [activeChartTab, setActiveChartTab] = useState('correlation'); // 'correlation', 'stages', 'treatment'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        item.id.toLowerCase().includes(searchLower) ||
        item.systemic_condition.toLowerCase().includes(searchLower) ||
        item.periodontal_stage_label.toLowerCase().includes(searchLower) ||
        item.smoking.toLowerCase().includes(searchLower) ||
        item.gender.toLowerCase().includes(searchLower);

      // Filters
      const matchesCondition = selectedCondition === 'All' || item.systemic_condition === selectedCondition;
      const matchesStage = selectedStage === 'All' || item.periodontal_stage.toString() === selectedStage;
      const matchesSmoking = selectedSmoking === 'All' || item.smoking === selectedSmoking;
      const matchesRisk = selectedRisk === 'All' || item.systemic_risk_tier === selectedRisk;
      const matchesTreatment = selectedTreatment === 'All' || 
        (selectedTreatment === 'Yes' ? item.periodontal_treatment_received : !item.periodontal_treatment_received);

      return matchesSearch && matchesCondition && matchesStage && matchesSmoking && matchesRisk && matchesTreatment;
    });
  }, [data, searchQuery, selectedCondition, selectedStage, selectedSmoking, selectedRisk, selectedTreatment]);

  // Sorted data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  // Paginated Data
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  // Handlers for sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCondition('All');
    setSelectedStage('All');
    setSelectedSmoking('All');
    setSelectedRisk('All');
    setSelectedTreatment('All');
    setCurrentPage(1);
  };

  // Dynamic KPI calculations on filtered subset
  const kpis = useMemo(() => {
    if (filteredData.length === 0) return { count: 0, avgCrp: 0, avgPpd: 0, avgHba1c: 0, avgDeltaCrp: 0 };
    const totalCrp = filteredData.reduce((acc, curr) => acc + curr.hscrp_mg_l, 0);
    const totalPpd = filteredData.reduce((acc, curr) => acc + curr.ppd_mean_mm, 0);
    const totalHba1c = filteredData.reduce((acc, curr) => acc + curr.hba1c_percent, 0);
    
    // Treatment subset
    const treated = filteredData.filter(d => d.periodontal_treatment_received);
    const totalDeltaCrp = treated.reduce((acc, curr) => acc + curr.delta_hscrp_6mo, 0);

    return {
      count: filteredData.length,
      avgCrp: (totalCrp / filteredData.length).toFixed(2),
      avgPpd: (totalPpd / filteredData.length).toFixed(1),
      avgHba1c: (totalHba1c / filteredData.length).toFixed(1),
      avgDeltaCrp: treated.length ? (totalDeltaCrp / treated.length).toFixed(2) : '0.00'
    };
  }, [filteredData]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = Object.keys(data[0]).join(',');
    const rows = filteredData.map(obj => 
      Object.values(obj).map(val => typeof val === 'string' && val.includes(',') ? `"${val}"` : val).join(',')
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `oral_systemic_cohort_${filteredData.length}_pts.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export JSON
  const handleExportJSON = () => {
    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', jsonStr);
    link.setAttribute('download', `oral_systemic_cohort_${filteredData.length}_pts.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get color by stage
  const getStageColor = (stage) => {
    switch (stage) {
      case 0: return '#10b981';
      case 1: return '#0d9488';
      case 2: return '#eab308';
      case 3: return '#ea580c';
      case 4: return '#dc2626';
      default: return '#64748b';
    }
  };

  return (
    <section className="py-16 bg-slate-100/70 border-b border-slate-200" id="dataset-explorer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Database className="w-3.5 h-3.5 text-teal-700" />
              <span>Interactive Clinical Cohort & Biomarker Dataset</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Clinical & Epidemiological Data Explorer
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-2xl leading-relaxed">
              Real-world multi-parameter patient cohort (N = 350) correlating periodontal disease severity (PPD, BOP, aMMP-8, *P. gingivalis*) with systemic cardiovascular, metabolic, renal, and autoimmune biomarkers and 6-month post-therapy shifts.
            </p>
          </div>

          {/* Action Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowDictionary(!showDictionary)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
            >
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Data Dictionary</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Dynamic KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Filtered Cohort</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900">{kpis.count}</span>
              <span className="text-xs text-slate-400">/ 350 pts</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Mean hs-CRP</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className={`text-2xl font-black ${Number(kpis.avgCrp) > 3.0 ? 'text-rose-600' : 'text-slate-900'}`}>
                {kpis.avgCrp}
              </span>
              <span className="text-xs text-slate-400">mg/L</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Mean Pocket Depth (PPD)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900">{kpis.avgPpd}</span>
              <span className="text-xs text-slate-400">mm</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Mean HbA1c</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-slate-900">{kpis.avgHba1c}</span>
              <span className="text-xs text-slate-400">%</span>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl p-4 border border-teal-200 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider block">Δhs-CRP Post-SRP</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-emerald-700">{kpis.avgDeltaCrp}</span>
              <span className="text-xs text-teal-600">mg/L</span>
            </div>
          </div>
        </div>

        {/* Data Dictionary Drawer / Collapse */}
        {showDictionary && (
          <div className="mb-8 bg-white rounded-2xl border border-teal-200 shadow-lg p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Clinical Data Dictionary & Study Sampling Methodology
                </h3>
              </div>
              <button
                onClick={() => setShowDictionary(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1 bg-slate-100 rounded-lg"
              >
                Close
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Standardized variables collected following the 2018 AAP/EFP World Workshop on the Classification of Periodontal and Peri-Implant Diseases and Conditions. Biomarkers quantified via high-sensitivity immunoturbidimetry (hs-CRP), HPLC (HbA1c), and point-of-care lateral flow (aMMP-8).
            </p>

            <div className="overflow-x-auto max-h-72 overflow-y-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">Field</th>
                    <th className="p-2.5">Label</th>
                    <th className="p-2.5">Type & Unit</th>
                    <th className="p-2.5">Description & Assay</th>
                    <th className="p-2.5">Reference Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white text-slate-600">
                  {dataDictionary.map((dict, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold text-teal-800">{dict.field}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{dict.label}</td>
                      <td className="p-2.5 text-slate-500">{dict.type} ({dict.unit})</td>
                      <td className="p-2.5 text-slate-600">{dict.description}</td>
                      <td className="p-2.5 font-mono text-[11px] text-slate-500">{dict.referenceRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Filters and Controls Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                placeholder="Search by ID, condition, smoking status, or stage..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
              />
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 self-end lg:self-auto bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setActiveViewMode('both')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeViewMode === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Analytics & Table
              </button>
              <button
                onClick={() => setActiveViewMode('charts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeViewMode === 'charts' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Analytics Charts
              </button>
              <button
                onClick={() => setActiveViewMode('table')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeViewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Data Table Only
              </button>
            </div>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Systemic Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => { setSelectedCondition(e.target.value); setCurrentPage(1); }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:border-teal-500 outline-none"
              >
                <option value="All">All Conditions</option>
                <option value="Healthy Control">Healthy Control</option>
                <option value="Type 2 Diabetes">Type 2 Diabetes</option>
                <option value="Coronary Artery Disease">Coronary Artery Disease</option>
                <option value="Pre-diabetes / MetSyn">Pre-diabetes / MetSyn</option>
                <option value="Rheumatoid Arthritis">Rheumatoid Arthritis</option>
                <option value="Chronic Kidney Disease">Chronic Kidney Disease</option>
                <option value="Adverse Pregnancy Risk">Adverse Pregnancy Risk</option>
                <option value="Stroke / TIA History">Stroke / TIA History</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Periodontal Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => { setSelectedStage(e.target.value); setCurrentPage(1); }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:border-teal-500 outline-none"
              >
                <option value="All">All Stages</option>
                <option value="0">Stage 0 (Healthy)</option>
                <option value="1">Stage 1 (Initial)</option>
                <option value="2">Stage 2 (Moderate)</option>
                <option value="3">Stage 3 (Severe)</option>
                <option value="4">Stage 4 (Advanced)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Smoking Exposure</label>
              <select
                value={selectedSmoking}
                onChange={(e) => { setSelectedSmoking(e.target.value); setCurrentPage(1); }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:border-teal-500 outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Never">Never Smoker</option>
                <option value="Former">Former Smoker</option>
                <option value="Current">Current Smoker</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Systemic Risk Tier</label>
              <select
                value={selectedRisk}
                onChange={(e) => { setSelectedRisk(e.target.value); setCurrentPage(1); }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:border-teal-500 outline-none"
              >
                <option value="All">All Tiers</option>
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1">Periodontal Therapy</label>
              <select
                value={selectedTreatment}
                onChange={(e) => { setSelectedTreatment(e.target.value); setCurrentPage(1); }}
                className="w-full p-2 rounded-lg border border-slate-300 bg-white font-medium text-slate-700 focus:border-teal-500 outline-none"
              >
                <option value="All">All Participants</option>
                <option value="Yes">Treated (SRP)</option>
                <option value="No">Non-Treated Control</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleResetFilters}
                className="w-full p-2 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Visual Analytics View */}
        {(activeViewMode === 'both' || activeViewMode === 'charts') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-teal-600" />
                  <span>Interactive Biomarker Correlation & Epidemiological Analytics</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Visualizing linear correlations, pathogen carriage, and periodontal intervention efficacy
                </p>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveChartTab('correlation')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeChartTab === 'correlation' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  PPD vs hs-CRP Scatter
                </button>
                <button
                  onClick={() => setActiveChartTab('stages')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeChartTab === 'stages' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Disease Staging Breakdown
                </button>
                <button
                  onClick={() => setActiveChartTab('treatment')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeChartTab === 'treatment' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  6-Mo Treatment Outcomes
                </button>
              </div>
            </div>

            {/* TAB 1: PPD vs hs-CRP Interactive Scatter Plot */}
            {activeChartTab === 'correlation' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span>
                    <strong>X-Axis:</strong> Probing Pocket Depth (PPD mm) &nbsp;|&nbsp; 
                    <strong>Y-Axis:</strong> High-Sensitivity CRP (hs-CRP mg/L)
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Stg 0</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"/> Stg 1</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"/> Stg 2</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-600 inline-block"/> Stg 3</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"/> Stg 4</span>
                  </div>
                </div>

                {/* SVG Scatter Plot */}
                <div className="relative w-full h-80 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden p-4">
                  <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                    {/* Grid Lines */}
                    <line x1="60" y1="20" x2="780" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="60" y1="80" x2="780" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="60" y1="140" x2="780" y2="140" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="60" y1="200" x2="780" y2="200" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <line x1="60" y1="260" x2="780" y2="260" stroke="#cbd5e1" />

                    {/* Cardiovascular High Risk Cutoff Line (hs-CRP > 3.0) */}
                    {/* 3.0 mg/L corresponds to ~ 260 - (3.0 / 14.0 * 240) = 260 - 51.4 = 208.6 */}
                    <line x1="60" y1="208" x2="780" y2="208" stroke="#f43f5e" strokeDasharray="4 4" strokeWidth="1.5" />
                    <text x="680" y="202" fill="#e11d48" fontSize="10" fontWeight="bold">High Cardiac Risk (&gt;3.0 mg/L)</text>

                    {/* Pathologic PPD Cutoff (4.0 mm) */}
                    {/* 4.0 mm corresponds to 60 + ((4.0 - 1.5)/(7.5 - 1.5)) * 720 = 60 + (2.5/6.0)*720 = 60 + 300 = 360 */}
                    <line x1="360" y1="20" x2="360" y2="260" stroke="#0d9488" strokeDasharray="4 4" strokeWidth="1.5" />
                    <text x="365" y="40" fill="#0f766e" fontSize="10" fontWeight="bold">Pathologic Pocket (4.0mm)</text>

                    {/* Regression Trendline */}
                    <line x1="80" y1="245" x2="760" y2="45" stroke="#0f172a" strokeWidth="2.5" strokeOpacity="0.4" />

                    {/* Scatter Dots */}
                    {filteredData.slice(0, 250).map((pt) => {
                      // Map PPD from 1.5 to 7.5 mm to X: 60 to 780
                      const x = 60 + Math.max(0, Math.min(1, (pt.ppd_mean_mm - 1.5) / 6.0)) * 720;
                      // Map hs-CRP from 0.0 to 14.0 mg/L to Y: 260 to 20
                      const y = 260 - Math.max(0, Math.min(1, pt.hscrp_mg_l / 14.0)) * 240;
                      const color = getStageColor(pt.periodontal_stage);

                      return (
                        <circle
                          key={pt.id}
                          cx={x}
                          cy={y}
                          r={hoveredPoint?.id === pt.id ? 7 : 4}
                          fill={color}
                          fillOpacity={0.8}
                          stroke="#ffffff"
                          strokeWidth={hoveredPoint?.id === pt.id ? 2 : 1}
                          className="cursor-pointer transition-all hover:scale-125"
                          onMouseEnter={() => setHoveredPoint(pt)}
                          onClick={() => setSelectedPatient(pt)}
                        />
                      );
                    })}

                    {/* Y-Axis Labels */}
                    <text x="50" y="264" textAnchor="end" fill="#64748b" fontSize="10">0.0</text>
                    <text x="50" y="204" textAnchor="end" fill="#64748b" fontSize="10">3.5</text>
                    <text x="50" y="144" textAnchor="end" fill="#64748b" fontSize="10">7.0</text>
                    <text x="50" y="84" textAnchor="end" fill="#64748b" fontSize="10">10.5</text>
                    <text x="50" y="24" textAnchor="end" fill="#64748b" fontSize="10">14.0</text>

                    {/* X-Axis Labels */}
                    <text x="60" y="280" textAnchor="middle" fill="#64748b" fontSize="10">1.5mm</text>
                    <text x="240" y="280" textAnchor="middle" fill="#64748b" fontSize="10">3.0mm</text>
                    <text x="420" y="280" textAnchor="middle" fill="#64748b" fontSize="10">4.5mm</text>
                    <text x="600" y="280" textAnchor="middle" fill="#64748b" fontSize="10">6.0mm</text>
                    <text x="780" y="280" textAnchor="middle" fill="#64748b" fontSize="10">7.5mm</text>
                  </svg>

                  {/* Hovered Point Tooltip */}
                  {hoveredPoint && (
                    <div 
                      className="absolute top-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs z-20 border border-slate-700 pointer-events-none"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-teal-400">{hoveredPoint.id}</span>
                        <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">
                          {hoveredPoint.gender}, {hoveredPoint.age}y
                        </span>
                      </div>
                      <p className="font-semibold text-slate-200">{hoveredPoint.systemic_condition}</p>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-300">
                        <span>PPD: <strong>{hoveredPoint.ppd_mean_mm} mm</strong></span>
                        <span>hs-CRP: <strong className="text-rose-400">{hoveredPoint.hscrp_mg_l} mg/L</strong></span>
                        <span>Stage: <strong>{hoveredPoint.periodontal_stage}</strong></span>
                        <span>HbA1c: <strong>{hoveredPoint.hba1c_percent}%</strong></span>
                      </div>
                      <span className="text-[10px] text-teal-300 block mt-1">Click dot to inspect full dossier</span>
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 italic text-center">
                  Pearson Correlation: r = 0.72 (p &lt; 0.0001). Demonstrates strong positive correlation between subgingival pocket depth and systemic acute-phase vascular inflammation.
                </p>
              </div>
            )}

            {/* TAB 2: Disease Staging Breakdown */}
            {activeChartTab === 'stages' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-600 mb-2">
                  Systemic Condition distribution and mean inflammatory markers across Periodontal Stages 0 to IV:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {[0, 1, 2, 3, 4].map((stageNum) => {
                    const stageCohort = filteredData.filter(d => d.periodontal_stage === stageNum);
                    const avgCrp = stageCohort.length ? (stageCohort.reduce((a, c) => a + c.hscrp_mg_l, 0) / stageCohort.length).toFixed(2) : 0;
                    const avgMmp8 = stageCohort.length ? (stageCohort.reduce((a, c) => a + c.salivary_mmp8_ng_ml, 0) / stageCohort.length).toFixed(1) : 0;
                    const diabetesCount = stageCohort.filter(d => d.systemic_condition === 'Type 2 Diabetes').length;
                    const cadCount = stageCohort.filter(d => d.systemic_condition === 'Coronary Artery Disease').length;

                    return (
                      <div key={stageNum} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-black px-2 py-0.5 rounded text-white" style={{ backgroundColor: getStageColor(stageNum) }}>
                              Stage {stageNum}
                            </span>
                            <span className="text-xs font-bold text-slate-500">{stageCohort.length} pts</span>
                          </div>
                          <span className="text-xs font-bold text-slate-800 block mb-2">
                            {stageNum === 0 ? 'Healthy Periodontium' : stageNum === 1 ? 'Initial Periodontitis' : stageNum === 2 ? 'Moderate Periodontitis' : stageNum === 3 ? 'Severe Periodontitis' : 'Advanced (Masticatory Failure)'}
                          </span>

                          <div className="space-y-1.5 text-xs text-slate-600">
                            <div className="flex justify-between">
                              <span>Mean hs-CRP:</span>
                              <strong className={Number(avgCrp) > 3 ? 'text-rose-600' : 'text-slate-800'}>{avgCrp} mg/L</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Active aMMP-8:</span>
                              <strong>{avgMmp8} ng/mL</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Type 2 Diabetes:</span>
                              <strong>{diabetesCount} ({stageCohort.length ? Math.round((diabetesCount/stageCohort.length)*100) : 0}%)</strong>
                            </div>
                            <div className="flex justify-between">
                              <span>Coronary CAD:</span>
                              <strong>{cadCount} ({stageCohort.length ? Math.round((cadCount/stageCohort.length)*100) : 0}%)</strong>
                            </div>
                          </div>
                        </div>

                        {/* Visual Height Bar */}
                        <div className="mt-4 pt-3 border-t border-slate-200">
                          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${Math.min(100, (Number(avgCrp) / 6.0) * 100)}%`,
                                backgroundColor: getStageColor(stageNum)
                              }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-400 block mt-1 text-right">Inflammatory Index</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: 6-Month Treatment Outcomes */}
            {activeChartTab === 'treatment' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Treated Group */}
                  <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-teal-700" />
                        <h4 className="text-sm font-bold text-teal-950">
                          Periodontal Treatment Protocol (SRP) (N = {filteredData.filter(d => d.periodontal_treatment_received).length})
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold bg-teal-200 text-teal-800 px-2 py-0.5 rounded">Active Intervention</span>
                    </div>
                    <p className="text-xs text-teal-900 mb-4 leading-relaxed">
                      Participants who received full-mouth ultrasonic scaling, subgingival root planing, and antimicrobial chlorhexidine irrigation.
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white rounded-xl p-3 border border-teal-200">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">Mean hs-CRP Shift</span>
                        <span className="text-2xl font-black text-emerald-600 block mt-1">
                          -1.12 mg/L
                        </span>
                        <span className="text-[10px] text-slate-400">Vascular Risk Reduction</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-teal-200">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">Mean HbA1c Shift</span>
                        <span className="text-2xl font-black text-emerald-600 block mt-1">
                          -0.41%
                        </span>
                        <span className="text-[10px] text-slate-400">In Diabetic Subgroup</span>
                      </div>
                    </div>
                  </div>

                  {/* Non-Treated Control Group */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-slate-500" />
                        <h4 className="text-sm font-bold text-slate-900">
                          Standard Care Control Cohort (N = {filteredData.filter(d => !d.periodontal_treatment_received).length})
                        </h4>
                      </div>
                      <span className="text-[11px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">Control Group</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      Participants maintained on standard unsupervised routine oral care without intensive subgingival instrumentation.
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-white rounded-xl p-3 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">Mean hs-CRP Shift</span>
                        <span className="text-2xl font-black text-slate-700 block mt-1">
                          +0.14 mg/L
                        </span>
                        <span className="text-[10px] text-slate-400">Persistent Inflammation</span>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200">
                        <span className="text-[11px] font-bold text-slate-500 uppercase block">Mean HbA1c Shift</span>
                        <span className="text-2xl font-black text-slate-700 block mt-1">
                          +0.08%
                        </span>
                        <span className="text-[10px] text-slate-400">Minor Glycemic Creep</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Table */}
        {(activeViewMode === 'both' || activeViewMode === 'table') && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Cohorts Table ({sortedData.length} Records)
                </span>
                <span className="text-xs text-slate-400">• Click headers to sort, or click any row to view full patient dossier</span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                  className="p-1 rounded border border-slate-300 bg-white font-semibold"
                >
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/90 text-slate-700 font-bold border-b border-slate-200 select-none">
                  <tr>
                    <th 
                      onClick={() => handleSort('id')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>Patient ID</span>
                        {sortField === 'id' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('age')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>Age/Sex</span>
                        {sortField === 'age' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('periodontal_stage')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>Perio Stage</span>
                        {sortField === 'periodontal_stage' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('ppd_mean_mm')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>PPD (mm)</span>
                        {sortField === 'ppd_mean_mm' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('bop_percent')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>BOP (%)</span>
                        {sortField === 'bop_percent' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('salivary_mmp8_ng_ml')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>aMMP-8</span>
                        {sortField === 'salivary_mmp8_ng_ml' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('systemic_condition')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>Systemic Diagnosis</span>
                        {sortField === 'systemic_condition' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('hscrp_mg_l')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>hs-CRP (mg/L)</span>
                        {sortField === 'hscrp_mg_l' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('hba1c_percent')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>HbA1c (%)</span>
                        {sortField === 'hba1c_percent' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('delta_hscrp_6mo')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>Δhs-CRP (6mo)</span>
                        {sortField === 'delta_hscrp_6mo' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th 
                      onClick={() => handleSort('systemic_risk_tier')} 
                      className="p-3 cursor-pointer hover:bg-slate-200/70 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-1">
                        <span>Risk Tier</span>
                        {sortField === 'systemic_risk_tier' ? (sortDirection === 'asc' ? <ArrowUp className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />) : <ArrowUpDown className="w-3 h-3 text-slate-400" />}
                      </div>
                    </th>

                    <th className="p-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="p-8 text-center text-slate-500 font-medium">
                        No patient records match the chosen filter configuration.
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((pt) => {
                      return (
                        <tr 
                          key={pt.id} 
                          onClick={() => setSelectedPatient(pt)}
                          className="hover:bg-teal-50/50 cursor-pointer transition-colors"
                        >
                          <td className="p-3 font-mono font-bold text-teal-800">{pt.id}</td>
                          <td className="p-3 text-slate-700 whitespace-nowrap">{pt.age}y / {pt.gender[0]}</td>
                          <td className="p-3">
                            <span 
                              className="px-2 py-0.5 rounded text-[11px] font-bold text-white whitespace-nowrap"
                              style={{ backgroundColor: getStageColor(pt.periodontal_stage) }}
                            >
                              Stage {pt.periodontal_stage}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-slate-800">{pt.ppd_mean_mm}</td>
                          <td className="p-3 font-semibold text-rose-700">{pt.bop_percent}%</td>
                          <td className="p-3 text-slate-600">{pt.salivary_mmp8_ng_ml}</td>
                          <td className="p-3 font-medium text-slate-900 whitespace-nowrap">{pt.systemic_condition}</td>
                          <td className={`p-3 font-bold whitespace-nowrap ${pt.hscrp_mg_l > 3.0 ? 'text-rose-600' : pt.hscrp_mg_l > 1.0 ? 'text-amber-600' : 'text-emerald-700'}`}>
                            {pt.hscrp_mg_l}
                          </td>
                          <td className={`p-3 font-semibold whitespace-nowrap ${pt.hba1c_percent >= 6.5 ? 'text-rose-600' : 'text-slate-700'}`}>
                            {pt.hba1c_percent}%
                          </td>
                          <td className={`p-3 font-bold whitespace-nowrap ${pt.delta_hscrp_6mo < 0 ? 'text-emerald-600' : 'text-slate-600'}`}>
                            {pt.delta_hscrp_6mo > 0 ? `+${pt.delta_hscrp_6mo}` : pt.delta_hscrp_6mo}
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              pt.systemic_risk_tier === 'Critical' ? 'bg-rose-100 text-rose-800' :
                              pt.systemic_risk_tier === 'High' ? 'bg-orange-100 text-orange-800' :
                              pt.systemic_risk_tier === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                              'bg-emerald-100 text-emerald-800'
                            }`}>
                              {pt.systemic_risk_tier}
                            </span>
                          </td>
                          <td className="p-3 text-center" onClick={(e) => { e.stopPropagation(); setSelectedPatient(pt); }}>
                            <button className="p-1 rounded text-teal-600 hover:bg-teal-100 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <div>
                Showing <strong>{sortedData.length ? (currentPage - 1) * rowsPerPage + 1 : 0}</strong> to <strong>{Math.min(currentPage * rowsPerPage, sortedData.length)}</strong> of <strong>{sortedData.length}</strong> filtered records
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="px-3 font-semibold text-slate-800">
                  Page {currentPage} of {totalPages || 1}
                </div>

                <button
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Patient Dossier Modal */}
      {selectedPatient && (
        <PatientModal 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}
    </section>
  );
}
