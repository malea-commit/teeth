export const screeningQuestions = [
  {
    id: "bleeding_gums",
    category: "Oral Signs",
    question: "Do your gums bleed frequently when brushing, flossing, or eating hard food?",
    description: "Bleeding on probing or brushing indicates breakdown of the gingival epithelial barrier, allowing oral bacteria direct entry into the bloodstream.",
    weight: 2.5,
    relatedConditions: ["cardiovascular", "diabetes", "pregnancy"],
    options: [
      { label: "Never or rarely", value: 0 },
      { label: "Occasionally (1-2 times a week)", value: 1 },
      { label: "Frequently or spontaneously (daily)", value: 3 }
    ]
  },
  {
    id: "loose_teeth",
    category: "Oral Signs",
    question: "Have you noticed any loose, drifting, or elongated teeth, or new gaps between teeth?",
    description: "Signs of moderate-to-severe alveolar bone loss and advanced periodontitis (Stage III/IV).",
    weight: 3.0,
    relatedConditions: ["diabetes", "rheumatoid", "osteoporosis", "cardiovascular"],
    options: [
      { label: "No loose or shifting teeth", value: 0 },
      { label: "Mild looseness in 1-2 teeth", value: 2 },
      { label: "Multiple loose teeth or visible gaps developing", value: 4 }
    ]
  },
  {
    id: "dry_mouth",
    category: "Oral Signs",
    question: "Do you experience persistent dry mouth (xerostomia), needing liquids to swallow dry foods?",
    description: "Reduced saliva compromises mucosal antimicrobial defenses, buffering capacity, and tissue remineralization.",
    weight: 2.0,
    relatedConditions: ["diabetes", "rheumatoid", "kidney"],
    options: [
      { label: "Normal saliva flow", value: 0 },
      { label: "Occasional dryness at night", value: 1 },
      { label: "Severe, constant dry mouth or burning sensation", value: 3 }
    ]
  },
  {
    id: "taste_breath",
    category: "Oral Signs",
    question: "Do you have chronic bad breath (halitosis) or a persistent metallic/sweet/fishy taste?",
    description: "Volatile sulfur compounds indicate anaerobic subgingival flora; sweet acetone breath suggests ketoacidosis; fishy/ammoniacal odor suggests elevated blood urea.",
    weight: 1.8,
    relatedConditions: ["kidney", "diabetes", "respiratory"],
    options: [
      { label: "No abnormal taste or odor", value: 0 },
      { label: "Occasional mild halitosis", value: 1 },
      { label: "Persistent metallic, fruity, or ammonia-like breath", value: 3 }
    ]
  },
  {
    id: "ulcers_patches",
    category: "Oral Signs",
    question: "Do you experience recurrent mouth ulcers, persistent red/white patches, or swollen lips?",
    description: "Oral mucosal manifestations frequently reflect Crohn's disease, vitamin deficiencies, or systemic immunosuppression.",
    weight: 2.2,
    relatedConditions: ["gastrointestinal", "rheumatoid"],
    options: [
      { label: "None observed", value: 0 },
      { label: "Rare canker sores (1-2 per year)", value: 1 },
      { label: "Frequent deep ulcers, swollen lips, or cobble-stoned cheeks", value: 3 }
    ]
  },
  {
    id: "metabolic_history",
    category: "Systemic Risk Factors",
    question: "Have you been diagnosed with pre-diabetes, Type 2 diabetes, or have strong family history?",
    description: "Hyperglycemia and periodontitis mutually fuel each other via advanced glycation end-products and TNF-alpha.",
    weight: 2.8,
    relatedConditions: ["diabetes", "cardiovascular"],
    options: [
      { label: "No diabetes history / Normal HbA1c", value: 0 },
      { label: "Pre-diabetes or family history", value: 2 },
      { label: "Diagnosed Type 2 Diabetes (HbA1c > 7.0%)", value: 4 }
    ]
  },
  {
    id: "cardio_history",
    category: "Systemic Risk Factors",
    question: "Do you have high blood pressure, elevated cholesterol, or a history of cardiovascular events?",
    description: "Periodontal bacteremia triggers platelet aggregation and arterial endothelial dysfunction.",
    weight: 2.5,
    relatedConditions: ["cardiovascular"],
    options: [
      { label: "Optimal blood pressure & lipids", value: 0 },
      { label: "Treated hypertension or borderline lipids", value: 2 },
      { label: "Coronary artery disease, stent, angina, or stroke history", value: 4 }
    ]
  },
  {
    id: "smoking_status",
    category: "Systemic Risk Factors",
    question: "What is your tobacco or vaping usage status?",
    description: "Nicotine masks gingival bleeding while impairing microvascular perfusion and PMN immune response.",
    weight: 2.5,
    relatedConditions: ["cardiovascular", "respiratory", "rheumatoid"],
    options: [
      { label: "Never smoked", value: 0 },
      { label: "Former smoker (>1 year quit)", value: 1 },
      { label: "Current smoker or daily vaping", value: 3 }
    ]
  },
  {
    id: "joint_status",
    category: "Systemic Risk Factors",
    question: "Do you suffer from morning joint stiffness, tender fingers/wrists, or jaw joint pain?",
    description: "Bacterial citrullination by P. gingivalis triggers ACPAs that attack synovial joints and TMJ articular cartilage.",
    weight: 2.2,
    relatedConditions: ["rheumatoid"],
    options: [
      { label: "No joint symptoms", value: 0 },
      { label: "Occasional mild joint ache or TMJ click", value: 1 },
      { label: "Diagnosed Rheumatoid Arthritis or severe morning stiffness > 45 mins", value: 3 }
    ]
  },
  {
    id: "pregnancy_status",
    category: "Systemic Risk Factors",
    question: "Are you currently pregnant or planning a pregnancy in the near future?",
    description: "Periodontal bacteria (F. nucleatum) can colonize the placenta, triggering preterm prostaglandin synthesis.",
    weight: 2.0,
    relatedConditions: ["pregnancy"],
    options: [
      { label: "Not pregnant", value: 0 },
      { label: "Planning pregnancy soon", value: 1 },
      { label: "Currently pregnant (1st, 2nd, or 3rd trimester)", value: 3 }
    ]
  }
];
