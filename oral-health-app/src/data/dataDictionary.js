export const dataDictionary = [
  {
    field: "id",
    label: "Patient ID",
    type: "String (Identifier)",
    unit: "N/A",
    description: "Unique de-identified research participant accession code (DS-1001 to DS-1350).",
    referenceRange: "DS-1001 – DS-1350"
  },
  {
    field: "age",
    label: "Age",
    type: "Integer",
    unit: "Years",
    description: "Chronological age at time of comprehensive periodontal and biomarker evaluation.",
    referenceRange: "22 – 79 years"
  },
  {
    field: "gender",
    label: "Biological Sex",
    type: "Categorical",
    unit: "N/A",
    description: "Biological sex assigned at birth (Male / Female).",
    referenceRange: "Male, Female"
  },
  {
    field: "smoking",
    label: "Smoking Status",
    type: "Categorical",
    unit: "N/A",
    description: "Tobacco exposure: Never (<100 lifetime cigarettes), Former (quit >12 mo), Current (active smoking/vaping).",
    referenceRange: "Never, Former, Current"
  },
  {
    field: "bmi",
    label: "Body Mass Index",
    type: "Float",
    unit: "kg/m²",
    description: "Ratio of body mass to square of height. Indicator for adiposity and metabolic syndrome risk.",
    referenceRange: "18.5 – 24.9 (Normal); >= 30.0 (Obese)"
  },
  {
    field: "periodontal_stage",
    label: "Periodontal Disease Stage",
    type: "Integer (0 to 4)",
    unit: "Stage (AAP/EFP 2018)",
    description: "Stage 0 = Healthy periodontium; Stage 1 = Initial periodontitis; Stage 2 = Moderate periodontitis; Stage 3 = Severe with potential tooth loss; Stage 4 = Advanced with masticatory breakdown.",
    referenceRange: "0, 1, 2, 3, 4"
  },
  {
    field: "ppd_mean_mm",
    label: "Mean Probing Pocket Depth (PPD)",
    type: "Float",
    unit: "Millimeters (mm)",
    description: "Average sulcular depth measured with a UNC-15 periodontal probe across 6 sites per tooth.",
    referenceRange: "< 3.0 mm (Normal sulcus); >= 4.0 mm (Pathologic pocket)"
  },
  {
    field: "bop_percent",
    label: "Bleeding on Probing (BOP)",
    type: "Integer",
    unit: "Percentage (%)",
    description: "Percentage of examined sites exhibiting bleeding within 15 seconds after gentle (0.25 N) probing. Primary clinical indicator of active mucosal epithelial ulceration.",
    referenceRange: "< 10% (Gingival health); >= 10% (Gingivitis/Active periodontitis)"
  },
  {
    field: "cal_mean_mm",
    label: "Clinical Attachment Loss (CAL)",
    type: "Float",
    unit: "Millimeters (mm)",
    description: "Distance from cementoenamel junction (CEJ) to base of the pocket, reflecting permanent periodontal connective tissue and bone loss.",
    referenceRange: "0.0 mm (Healthy); 1-2 mm (Mild); 3-4 mm (Moderate); >= 5 mm (Severe)"
  },
  {
    field: "missing_teeth",
    label: "Missing Teeth",
    type: "Integer",
    unit: "Teeth count (excluding 3rd molars)",
    description: "Count of permanent teeth lost due to periodontal breakdown or dental caries.",
    referenceRange: "0 – 28 teeth"
  },
  {
    field: "pgingivalis_log",
    label: "Salivary P. gingivalis Load",
    type: "Float",
    unit: "log₁₀ CFU / mL saliva",
    description: "Quantitative real-time PCR quantification of Porphyromonas gingivalis 16S rRNA gene copies in unstimulated whole saliva.",
    referenceRange: "< 2.0 (Low/Commensal); > 4.0 (High Virulence)"
  },
  {
    field: "salivary_mmp8_ng_ml",
    label: "Active Salivary MMP-8",
    type: "Float",
    unit: "ng / mL saliva",
    description: "Active collagenase-2 quantified via chairside lateral-flow immunoassay (POC-aMMP8). Early indicator of irreversible connective tissue breakdown.",
    referenceRange: "< 20.0 ng/mL (Non-destructive); >= 20.0 ng/mL (Active destruction)"
  },
  {
    field: "systemic_condition",
    label: "Primary Systemic Diagnosis",
    type: "Categorical",
    unit: "Clinical Diagnosis",
    description: "Primary diagnosed systemic chronic illness or Healthy Control status.",
    referenceRange: "T2D, CAD, Stroke History, MetSyn, RA, CKD, Pregnancy Risk, Control"
  },
  {
    field: "hba1c_percent",
    label: "Glycated Hemoglobin (HbA1c)",
    type: "Float",
    unit: "% total Hb",
    description: "Standard measure of 3-month glycemic exposure. Key indicator for diabetes diagnosis and monitoring.",
    referenceRange: "< 5.7% (Normal); 5.7-6.4% (Pre-DM); >= 6.5% (Diabetes)"
  },
  {
    field: "hscrp_mg_l",
    label: "High-Sensitivity C-Reactive Protein (hs-CRP)",
    type: "Float",
    unit: "mg / L",
    description: "Acute-phase hepatic reactant reflecting systemic and arterial vascular inflammation.",
    referenceRange: "< 1.0 mg/L (Low Risk); 1.0-3.0 (Average); > 3.0 (High Cardiovascular Risk)"
  },
  {
    field: "systolic_bp",
    label: "Systolic Blood Pressure",
    type: "Integer",
    unit: "mmHg",
    description: "Resting seated blood pressure measured via automated sphygmomanometer.",
    referenceRange: "< 120 mmHg (Normal); 120-129 (Elevated); >= 130 (Hypertension)"
  },
  {
    field: "diastolic_bp",
    label: "Diastolic Blood Pressure",
    type: "Integer",
    unit: "mmHg",
    description: "Resting seated diastolic vascular pressure.",
    referenceRange: "< 80 mmHg (Normal); >= 80 mmHg (Hypertension Stage 1)"
  },
  {
    field: "egfr",
    label: "Estimated GFR",
    type: "Float",
    unit: "mL / min / 1.73m²",
    description: "Estimated glomerular filtration rate calculated using the CKD-EPI 2021 creatinine equation.",
    referenceRange: ">= 90 (Normal); 60-89 (Mild decline); < 60 (Kidney Disease)"
  },
  {
    field: "periodontal_treatment_received",
    label: "Intervention Protocol Received",
    type: "Boolean",
    unit: "True / False",
    description: "Indicates whether participant received full-mouth ultrasonic scaling and root planing (SRP) and subgingival chlorhexidine irrigation.",
    referenceRange: "True, False"
  },
  {
    field: "delta_hba1c_6mo",
    label: "6-Month Change in HbA1c",
    type: "Float",
    unit: "Absolute % shift",
    description: "Post-intervention minus baseline HbA1c. Negative values indicate glycemic improvement.",
    referenceRange: "-1.2% to +0.3%"
  },
  {
    field: "delta_hscrp_6mo",
    label: "6-Month Change in hs-CRP",
    type: "Float",
    unit: "mg / L shift",
    description: "Post-intervention minus baseline hs-CRP. Negative values indicate reduction in systemic vascular inflammation.",
    referenceRange: "-3.8 to +0.5 mg/L"
  },
  {
    field: "systemic_risk_tier",
    label: "Integrated Systemic Risk Tier",
    type: "Categorical",
    unit: "Tier (Low, Moderate, High, Critical)",
    description: "Composite score synthesizing hs-CRP, HbA1c, periodontal staging, and systemic comorbidity burden.",
    referenceRange: "Low, Moderate, High, Critical"
  }
];
