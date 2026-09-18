export const biomarkersData = [
  {
    id: "ammp8",
    name: "Active Matrix Metalloproteinase-8 (aMMP-8)",
    matrix: "Saliva & Gingival Crevicular Fluid (GCF)",
    clinicalRole: "Real-Time Collagenolytic Tissue Destruction",
    normalRange: "< 20 ng/mL",
    elevatedRange: "> 25 ng/mL (High tissue breakdown risk)",
    systemicRelevance: "Cardiovascular arterial stiffness, rheumatoid arthritis joint destruction, diabetes microvascular injury.",
    diagnosticAdvantage: "Detects active subclinical periodontal and vascular collagen breakdown up to 6 months before visible radiographic alveolar bone loss occurs. Point-of-care (POC) chairside lateral flow test available.",
    category: "Oral Enzymatic Marker"
  },
  {
    id: "hscrp",
    name: "High-Sensitivity C-Reactive Protein (hs-CRP)",
    matrix: "Serum / Capillary Whole Blood",
    clinicalRole: "Systemic Vascular Inflammation Acute-Phase Reactant",
    normalRange: "< 1.0 mg/L (Low Risk)",
    elevatedRange: "1.0 – 3.0 mg/L (Average Risk); > 3.0 mg/L (High Risk)",
    systemicRelevance: "Coronary heart disease, myocardial infarction, stroke, metabolic syndrome, peripheral artery disease.",
    diagnosticAdvantage: "Severe untreated periodontitis independently increases hs-CRP by 1.2 to 2.5 mg/L, shifting moderate-risk patients into high-risk cardiac categories. Successfully reduced by 0.5-1.4 mg/L following periodontal therapy.",
    category: "Systemic Inflammatory Marker"
  },
  {
    id: "hba1c",
    name: "Hemoglobin A1c (Glycated Hemoglobin)",
    matrix: "Whole Blood / Capillary Fingerstick",
    clinicalRole: "Long-Term (90-Day) Glycemic Control",
    normalRange: "< 5.7% (Normal)",
    elevatedRange: "5.7% – 6.4% (Pre-diabetes); >= 6.5% (Diabetes)",
    systemicRelevance: "Type 1 & Type 2 Diabetes Mellitus, diabetic nephropathy, retinopathy, peripheral neuropathy.",
    diagnosticAdvantage: "Non-surgical periodontal scaling and root planing achieves a 0.3% - 0.5% absolute drop in HbA1c in diabetic patients, a therapeutic impact comparable to initiating an additional oral antidiabetic pharmaceutical.",
    category: "Metabolic Biomarker"
  },
  {
    id: "pg_load",
    name: "Porphyromonas gingivalis qPCR / Salivary Load",
    matrix: "Saliva / Subgingival Plaque Biofilm",
    clinicalRole: "Keystone Periodontopathogen & Citrullinating Agent",
    normalRange: "< 10^3 CFU/mL or Undetectable",
    elevatedRange: "> 10^4 CFU/mL (Moderate); > 10^5 CFU/mL (High Virulence)",
    systemicRelevance: "Atherosclerotic plaques, Alzheimer's neurofibrillary tangles, Rheumatoid Arthritis (anti-CCP generation), non-alcoholic steatohepatitis (NASH).",
    diagnosticAdvantage: "Expresses gingipains (Kgp, Rgp) and bacterial peptidylarginine deiminase (PPAD). Early identification enables targeted antimicrobial rinses and subgingival air polishing before systemic dissemination.",
    category: "Microbial & Virulence Marker"
  },
  {
    id: "fn_load",
    name: "Fusobacterium nucleatum FadA Adhesin",
    matrix: "Saliva / Subgingival Biofilm / Colonic Biopsy",
    clinicalRole: "Oncogenic Adhesin & Placental Invader",
    normalRange: "Low commensal baseline",
    elevatedRange: "Elevated gene copy ratio (FadA / universal 16S rRNA)",
    systemicRelevance: "Colorectal carcinoma progression, preterm low birth weight, chorioamnionitis, hepatic abscesses.",
    diagnosticAdvantage: "FadA binds vascular endothelial cadherin to cross the blood-placenta barrier and binds E-cadherin on intestinal cells to trigger beta-catenin signaling and oncogenic proliferation.",
    category: "Microbial & Virulence Marker"
  },
  {
    id: "calprotectin",
    name: "Calprotectin (S100A8 / S100A9 Heterodimer)",
    matrix: "Saliva, GCF & Stool",
    clinicalRole: "Neutrophilic Activation & Mucosal Infiltration",
    normalRange: "Salivary < 150 ng/mL",
    elevatedRange: "> 300 ng/mL in active inflammatory flare-up",
    systemicRelevance: "Inflammatory Bowel Disease (Crohn's, Ulcerative Colitis), Rheumatoid Arthritis, Behçet's disease.",
    diagnosticAdvantage: "Highly stable protein reflecting real-time neutrophil migration across oral and intestinal mucosal barriers.",
    category: "Innate Immune Biomarker"
  },
  {
    id: "il6",
    name: "Interleukin-6 (IL-6)",
    matrix: "Gingival Crevicular Fluid & Serum",
    clinicalRole: "Master Pro-inflammatory Cytokine & Pyrogen",
    normalRange: "< 5.0 pg/mL",
    elevatedRange: "> 12.0 pg/mL",
    systemicRelevance: "Atherosclerosis, cytokine release syndrome, osteoporosis (RANKL activation), Alzheimer's neuroinflammation.",
    diagnosticAdvantage: "Drives hepatic synthesis of hs-CRP and activates osteoclast differentiation via the RANKL pathway, mediating both jawbone and systemic bone resorption.",
    category: "Pro-Inflammatory Cytokine"
  },
  {
    id: "salivary_mirna",
    name: "Salivary microRNA Panel (miR-21, miR-146a, miR-155)",
    matrix: "Salivary Exosomes",
    clinicalRole: "Epigenetic Post-Transcriptional Regulators",
    normalRange: "Homeostatic baseline expression",
    elevatedRange: "> 3-fold upregulation",
    systemicRelevance: "Head and neck squamous cell carcinoma (HNSCC), pancreatic cancer, early myocardial ischemia.",
    diagnosticAdvantage: "Exosomal miRNAs are protected from salivary RNases, providing non-invasive 'liquid biopsy' signatures for early detection of systemic malignancies.",
    category: "Epigenetic Liquid Biopsy"
  }
];
