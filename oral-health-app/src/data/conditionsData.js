export const systemicConditions = [
  {
    id: "cardiovascular",
    title: "Cardiovascular Disease & Atherosclerosis",
    category: "Cardiovascular",
    icon: "Heart",
    badge: "Strong Direct Link",
    oddsRatio: "OR: 2.2 – 3.8",
    color: "rose",
    executiveSummary: "Severe periodontitis induces chronic low-grade bacteremia and systemic cytokine spillover (IL-6, TNF-alpha), accelerating endothelial dysfunction, LDL oxidation, and atherosclerotic plaque destabilization.",
    biologicalMechanisms: [
      {
        title: "Bacteremia & Direct Plaque Infiltration",
        description: "Oral pathogens such as Porphyromonas gingivalis, Treponema denticola, and Fusobacterium nucleatum routinely enter the bloodstream through ulcerated periodontal pocket epithelium. P. gingivalis has been directly isolated and identified via PCR in human carotid and coronary atheromatous plaques."
      },
      {
        title: "Endothelial Dysfunction & Foam Cell Formation",
        description: "P. gingivalis fimbriae invade vascular endothelial cells, upregulating ICAM-1, VCAM-1, and E-selectin. This recruits monocytes that ingest oxidized low-density lipoproteins (ox-LDL), transforming into atherogenic foam cells."
      },
      {
        title: "Hepatic Acute-Phase Response Induction",
        description: "Spillover of oral IL-1beta and IL-6 into portal circulation stimulates hepatic synthesis of C-reactive protein (hs-CRP) and fibrinogen, promoting hypercoagulability and increased thrombus formation risk."
      }
    ],
    oralManifestations: [
      "Generalized deep periodontal pockets (>5 mm) with spontaneous bleeding",
      "Persistent subgingival calculus and purulent exudate",
      "Severe alveolar bone resorption out of proportion with age",
      "Tooth hypermobility and pathological migration"
    ],
    earlyWarningSigns: [
      "Frequent bleeding during gentle toothbrushing or flossing (BOP > 20%)",
      "Unexplained metallic taste or chronic halitosis resistant to mouthwash",
      "Dull ache in the mandibular bone without active dental caries"
    ],
    biomarkers: [
      { name: "hs-CRP", role: "Serum acute-phase reactant; >3.0 mg/L indicates high cardiac risk.", oralLink: "Periodontal therapy reduces hs-CRP by ~0.50 mg/L." },
      { name: "Active MMP-8 (aMMP-8)", role: "Collagenase breaking vascular matrix & periodontal ligament.", oralLink: "Elevated in gingival crevicular fluid." },
      { name: "Fibrinogen", role: "Coagulation factor elevating plasma viscosity.", oralLink: "Positively correlated with extent of bleeding on probing." }
    ],
    interventionalEvidence: "Randomized controlled trials demonstrate that intensive non-surgical periodontal treatment (scaling and root planing) significantly improves flow-mediated dilation (FMD) of the brachial artery at 6 months and reduces serum hs-CRP by 0.5 to 1.4 mg/L.",
    clinicalRecommendations: [
      "Cardiologists should routinely question patients regarding periodontal bleeding and refer for comprehensive periodontal probing.",
      "Hypertensive or CAD patients with active periodontitis should receive periodontal maintenance every 3 to 4 months.",
      "Periodontal debridement should be scheduled prior to elective valve replacement surgery to prevent infective endocarditis."
    ]
  },
  {
    id: "diabetes",
    title: "Type 2 Diabetes Mellitus (Bidirectional)",
    category: "Endocrine & Metabolic",
    icon: "Activity",
    badge: "Bidirectional Synergy",
    oddsRatio: "OR: 2.9 – 4.2",
    color: "amber",
    executiveSummary: "The quintessential bidirectional oral-systemic relationship: Periodontitis exacerbates peripheral insulin resistance via TNF-alpha; conversely, hyperglycemia drives advanced glycation end-products (AGEs) that destroy periodontal microvasculature.",
    biologicalMechanisms: [
      {
        title: "The Bidirectional Amplification Loop",
        description: "Periodontal inflammatory reservoirs discharge TNF-alpha and IL-6 into circulation, impairing IRS-1 phosphorylation and insulin receptor signaling in skeletal muscle and adipose tissues, elevating blood glucose."
      },
      {
        title: "AGE-RAGE Axis in Periodontal Tissues",
        description: "Prolonged hyperglycemia causes non-enzymatic glycation of collagen, forming Advanced Glycation End-products (AGEs). AGEs bind the RAGE receptor on macrophages and gingival fibroblasts, hyper-activating NF-kB, boosting reactive oxygen species (ROS), and triggering osteoclastogenesis."
      },
      {
        title: "Microvascular Basement Membrane Thickening",
        description: "Hyperglycemia alters gingival microcapillary architecture, slowing polymorphonuclear leukocyte (PMN) chemotaxis and impairing tissue oxygenation, creating an ideal niche for anaerobic pathogens."
      }
    ],
    oralManifestations: [
      "Rapidly progressing periodontitis with multiple periodontal abscesses",
      "Marked gingival proliferation with strawberry-red spongy margins",
      "Severe xerostomia (dry mouth) with secondary mucosal burning",
      "Opportunistic oral candidiasis (erythematous and pseudomembranous)",
      "Delayed socket healing and dry sockets post-extraction"
    ],
    earlyWarningSigns: [
      "Sudden flare-up of gum bleeding and loosening teeth in adults with weight gain",
      "Persistent oral thrush or angular cheilitis at the mouth corners",
      "Intense dry mouth accompanied by polydipsia (excessive thirst)"
    ],
    biomarkers: [
      { name: "HbA1c", role: "3-month average glycemic control measure.", oralLink: "Periodontal therapy yields a mean 0.3% - 0.5% HbA1c drop (comparable to adding a 2nd oral hypoglycemic agent)." },
      { name: "Salivary Glucose", role: "Diffuses from serum into salivary gland acini.", oralLink: "Parallels serum glucose levels during uncontrolled episodes." },
      { name: "IL-1beta in GCF", role: "Potent osteolytic and pro-inflammatory cytokine.", oralLink: "Directly correlates with periodontal pocket depth and insulin resistance." }
    ],
    interventionalEvidence: "The Cochrane Systematic Review (2022 update) confirms that periodontal treatment leads to an absolute reduction in HbA1c of 0.43% (4.7 mmol/mol) at 3-4 months, with sustained benefits over 6-12 months.",
    clinicalRecommendations: [
      "Dental clinics should implement point-of-care fingerstick HbA1c testing for adult patients presenting with unexplained Stage II-IV periodontitis.",
      "Endocrinologists should mandate annual comprehensive periodontal evaluations as standard diabetic complication screening (alongside retinopathy and nephropathy checks).",
      "Maintain tight oral hygiene regimen; prescribe chlorhexidine or cetylpyridinium chloride rinses during acute periodontal flare-ups."
    ]
  },
  {
    id: "neurodegenerative",
    title: "Alzheimer's Disease & Cognitive Decline",
    category: "Neurology",
    icon: "Brain",
    badge: "Emerging Molecular Target",
    oddsRatio: "HR: 1.7 – 2.4",
    color: "purple",
    executiveSummary: "Porphyromonas gingivalis and its toxic gingipain proteases traverse the blood-brain barrier via cranial nerves or hematogenous entry, inducing neuroinflammation, microglial activation, and accelerating tau hyperphosphorylation and amyloid-beta deposition.",
    biologicalMechanisms: [
      {
        title: "Gingipain Protease Neurotoxicity",
        description: "Dominy et al. (Science Advances, 2019) identified lysine-gingipain (Kgp) and arginine-gingipain (RgpB) in >90% of postmortem Alzheimer's brain samples. Gingipains cleave human tau protein, catalyzing neurofibrillary tangle formation and neuronal apoptosis."
      },
      {
        title: "Retrograde Trigeminal & Olfactory Nerve Transport",
        description: "Periodontal pathogens can migrate retrogradely along the trigeminal nerve branches directly into the pons and hippocampus, bypassing the restrictive systemic blood-brain barrier."
      },
      {
        title: "Microglial Priming & Chronic Neuroinflammation",
        description: "Circulating oral LPS (lipopolysaccharide) and TNF-alpha activate brain-resident microglia, triggering continuous release of neurotoxic cytokines that impair synaptic plasticity and hippocampal memory encoding."
      }
    ],
    oralManifestations: [
      "Progressive decline in dental self-care and rapid plaque accumulation",
      "Severe masticatory dysfunction and extensive tooth loss (>10 missing teeth)",
      "Food retention in vestibules and buccal sulci due to apraxia",
      "Denture-associated stomatitis and traumatic mucosal ulcers"
    ],
    earlyWarningSigns: [
      "Masticatory inefficiency: inability to chew fibrous foods or meats",
      "Neglect of familiar oral hygiene routines (forgetting to brush or rinse)",
      "Unexplained weight loss secondary to chewing pain or tooth mobility"
    ],
    biomarkers: [
      { name: "Salivary & Brain Gingipains (Rgp, Kgp)", role: "Extracellular cysteine endopeptidases of P. gingivalis.", oralLink: "Direct biomarker for periodontal virulence and neurodegenerative risk." },
      { name: "Serum P. gingivalis IgG", role: "Antibody titer reflecting chronic systemic pathogen exposure.", oralLink: "Associated with 2.1x increased rate of cognitive decline over 10-year follow-up." },
      { name: "TNF-alpha in Plasma", role: "Crosses damaged blood-brain barrier.", oralLink: "Suppressed following comprehensive dental debridement." }
    ],
    interventionalEvidence: "Longitudinal cohort studies indicate that patients with chronic periodontitis persisting for >10 years show a 70% higher risk of developing Alzheimer's disease compared to periodontally healthy age-matched peers. Small-molecule gingipain inhibitors are currently in clinical trials.",
    clinicalRecommendations: [
      "Incorporate masticatory performance assessments (number of functional occlusal pairs) into comprehensive geriatric exams.",
      "Caregivers of patients with mild cognitive impairment (MCI) should be trained in assisted toothbrushing and electric brush deployment.",
      "Periodontal maintenance should be maintained aggressively in middle age to reduce lifetime systemic pathogen burden."
    ]
  },
  {
    id: "pregnancy",
    title: "Adverse Pregnancy Outcomes (PTLBW & Preeclampsia)",
    category: "Obstetrics & Gynecology",
    icon: "Baby",
    badge: "Critical Obstetric Window",
    oddsRatio: "OR: 2.3 – 4.5",
    color: "pink",
    executiveSummary: "Maternal periodontitis acts as an inflammatory reservoir. Oral pathogens (Fusobacterium nucleatum, P. gingivalis) migrate hematogenously to colonize the placenta and fetal membranes, triggering premature prostaglandin E2 (PGE2) release and preterm labor.",
    biologicalMechanisms: [
      {
        title: "Hematogenous Placental Translocation",
        description: "Fusobacterium nucleatum produces FadA adhesin, allowing it to penetrate placental endothelial cells, enter the choriodecidual space, and breach the fetal-placental barrier. F. nucleatum is the most common oral anaerobe recovered from amniotic fluid in preterm births."
      },
      {
        title: "Prostaglandin E2 (PGE2) & Oxytocin Trigger",
        description: "Bacterial endotoxins stimulate maternal and trophoblast secretion of PGE2 and TNF-alpha. Elevated amniotic PGE2 mimics the natural hormonal trigger for uterine myometrial contractions and cervical effacement, inducing preterm labor."
      },
      {
        title: "Endothelial Dysfunction in Preeclampsia",
        description: "Systemic cytokine spillover from periodontal pockets impairs maternal endothelial nitric oxide synthase (eNOS), aggravating maternal hypertension and proteinuria characteristic of preeclampsia."
      }
    ],
    oralManifestations: [
      "'Pregnancy Gingivitis' with exaggerated, bright red bleeding margins",
      "Pregnancy epulis / pyogenic granuloma (benign hyperplastic vascular growth on interdental papillae)",
      "Marked dental hypermobility due to ligament laxity from progesterone",
      "Perimylolysis (enamel erosion) from severe hyperemesis gravidarum"
    ],
    earlyWarningSigns: [
      "Sudden severe bleeding on gentle brushing starting in the 1st or 2nd trimester",
      "Rapidly enlarging, painless localized red bleeding nodule on gums (pyogenic granuloma)",
      "Tooth sensitivity to cold resulting from acid reflux erosion"
    ],
    biomarkers: [
      { name: "FadA Adhesin (F. nucleatum)", role: "Bacterial surface protein facilitating placental endothelial invasion.", oralLink: "Detected in subgingival plaque and matched amniotic fluid samples." },
      { name: "PGE2 in Crevicular Fluid", role: "Labor-inducing prostaglandin.", oralLink: "Concentrations in GCF > 60 ng/mL strongly correlate with preterm birth (<37 weeks)." },
      { name: "Maternal Serum IL-6", role: "Amniotic inflammation marker.", oralLink: "Periodontal treatment during 2nd trimester lowers circulating IL-6." }
    ],
    interventionalEvidence: "Clinical trials indicate that performing safe non-surgical periodontal therapy (scaling and root planing) during the second trimester significantly reduces subgingival microbial loads and decreases localized inflammatory spikes without any teratogenic or obstetric hazards.",
    clinicalRecommendations: [
      "Obstetricians should include dental screening in routine pre-conception and first-trimester prenatal workups.",
      "Dental prophylaxis and gentle debridement are safe and recommended during the second trimester (14-28 weeks).",
      "Women with pyogenic granulomas should be reassured that they frequently regress post-partum, requiring surgical excision only if interfering with occlusion."
    ]
  },
  {
    id: "respiratory",
    title: "Respiratory Diseases (Pneumonia & COPD)",
    category: "Pulmonology",
    icon: "Wind",
    badge: "Direct Aspiration Pathway",
    oddsRatio: "RR: 1.8 – 3.2",
    color: "cyan",
    executiveSummary: "The oropharynx serves as the primary reservoir for respiratory pathogens. In micro-aspiration, salivary enzymes and periodontal bacteria degrade mucosal fibronectin, enabling virulent pulmonary pathogens to colonize the lower airway.",
    biologicalMechanisms: [
      {
        title: "Direct Micro-Aspiration of Biofilm",
        description: "During sleep or impaired swallow reflexes, microscopic droplets of saliva harboring oral bacteria (P. gingivalis, Streptococcus pneumoniae, Pseudomonas aeruginosa) are aspirated into the bronchial tree."
      },
      {
        title: "Salivary Cytokines Damaging Bronchial Epithelium",
        description: "Salivary hydrolytic enzymes and inflammatory cytokines (IL-1beta, TNF-alpha) alter the respiratory mucosal surface, destroying protective mucociliary clearance and facilitating bacterial adherence."
      },
      {
        title: "COPD Acute Exacerbation Cascade",
        description: "Recurrent seeding of periodontal pathogens into compromised lungs causes neutrophilic infiltration, goblet cell hyperplasia, and irreversible alveolar septal destruction in chronic obstructive pulmonary disease."
      }
    ],
    oralManifestations: [
      "Heavy tenacious plaque biofilms coating teeth and tongue dorsum",
      "Severe xerostomia from bronchodilator / anticholinergic inhalers",
      "Oral candidiasis from inhaled corticosteroid deposits on palate",
      "Impaired cough reflex and tongue coating index > 2"
    ],
    earlyWarningSigns: [
      "White curd-like plaques on soft palate following steroid inhaler use without water rinsing",
      "Chronic cough triggered by saliva pooling in the pharynx",
      "Persistent halitosis alongside productive morning sputum"
    ],
    biomarkers: [
      { name: "Salivary Neutrophil Elastase", role: "Enzyme degrading alveolar elastin and lung parenchymal fibers.", oralLink: "Derived from periodontal inflammatory exudate." },
      { name: "Pseudomonas / Klebsiella Dental Carriage", role: "Nosocomial pathogens colonizing dental plaque.", oralLink: "Major etiologic agent in hospital-acquired pneumonia (HAP) and ventilator-associated pneumonia (VAP)." }
    ],
    interventionalEvidence: "In ICU settings, twice-daily oral decontamination with 0.12% chlorhexidine gluconate oral rinse reduces the incidence of ventilator-associated pneumonia (VAP) by 35% to 45%. In nursing homes, professional dental hygiene reduced pneumonia mortality by 30%.",
    clinicalRecommendations: [
      "Hospitalized and intubated patients must receive strict q12h oral hygiene protocols including tooth brushing and chlorhexidine suction sponges.",
      "Asthma and COPD patients must be instructed to vigorously rinse and spit water after each use of steroid inhalers to avoid mucosal candidiasis.",
      "Nursing home staff must be provided designated training in daily assisted mechanical plaque removal for dysphagic elderly residents."
    ]
  },
  {
    id: "rheumatoid",
    title: "Rheumatoid Arthritis & Autoimmunity",
    category: "Rheumatology",
    icon: "ShieldAlert",
    badge: "Etiological Citrullination Trigger",
    oddsRatio: "OR: 2.8 – 4.0",
    color: "indigo",
    executiveSummary: "Porphyromonas gingivalis expresses Peptidylarginine Deiminase (PPAD), the only known bacterial enzyme capable of citrullinating human proteins. This breaks immune tolerance, generating Anti-Citrullinated Protein Antibodies (ACPA/anti-CCP) years before joint symptom onset.",
    biologicalMechanisms: [
      {
        title: "Bacterial Enzymatic Citrullination (PPAD)",
        description: "P. gingivalis PPAD converts C-terminal arginine residues in human fibrinogen and alpha-enolase into citrulline. The immune system recognizes these citrullinated neo-epitopes as foreign antigens, inducing high-affinity ACPA antibodies."
      },
      {
        title: "Cross-Reactivity & Synovial Joint Targeting",
        description: "Circulating ACPAs cross-react with citrullinated proteins inside synovial joints, attracting immune complexes, activating the complement cascade, and triggering synovial inflammation and pannus formation."
      },
      {
        title: "Shared Epitope HLA-DRB1 Interaction",
        description: "Individuals carrying the HLA-DRB1 'shared epitope' alleles exhibit a synergistic, multifold increase in RA risk when exposed to chronic periodontitis and cigarette smoking."
      }
    ],
    oralManifestations: [
      "Severe generalized bone loss with high tooth mobility",
      "Limited mouth opening and temporomandibular joint (TMJ) crepitus/erosion",
      "Secondary Sjögren's syndrome (severe xerostomia, glazed mucosa, rampant cervical caries)",
      "Difficulty maintaining oral hygiene due to arthritic hand and finger deformities"
    ],
    earlyWarningSigns: [
      "TMJ tenderness, morning jaw stiffness, and clicking during chewing",
      "Extremely dry mouth making swallowing dry foods impossible without liquids",
      "Simultaneous worsening of swollen finger joints and bleeding gums"
    ],
    biomarkers: [
      { name: "Anti-CCP / ACPA", role: "Specific autoantibodies diagnosing Rheumatoid Arthritis.", oralLink: "Correlates directly with salivary PPAD activity and P. gingivalis titers." },
      { name: "Calprotectin (S100A8/A9)", role: "Neutrophil activation marker in inflamed joints.", oralLink: "Highly elevated in both synovial fluid and gingival crevicular fluid." },
      { name: "Rheumatoid Factor (RF)", role: "Autoantibody targeting Fc portion of IgG.", oralLink: "Titer drops following successful comprehensive periodontal treatment." }
    ],
    interventionalEvidence: "Clinical studies show that treating periodontitis in RA patients significantly reduces the Disease Activity Score-28 (DAS28) and serum ESR/CRP levels, with efficacy comparable to escalating DMARD or anti-TNF therapy.",
    clinicalRecommendations: [
      "Patients newly diagnosed with ACPA-positive RA or early undifferentiated arthritis should receive an immediate periodontal examination.",
      "Recommend adaptive dental hygiene aids (e.g., wide-handle sonic electric toothbrushes, flosser grips) for patients with limited manual dexterity.",
      "Coordinate TMJ splint therapy and bite guards to prevent permanent articular disc resorption."
    ]
  },
  {
    id: "kidney",
    title: "Chronic Kidney Disease (CKD)",
    category: "Nephrology",
    icon: "Droplets",
    badge: "Reciprocal Inflammatory Worsening",
    oddsRatio: "HR: 1.6 – 2.5",
    color: "emerald",
    executiveSummary: "CKD patients experience marked oral changes including uremic stomatitis and bone demyelination (renal osteodystrophy). Simultaneously, untreated periodontitis accelerates renal function decline (eGFR drop) and increases mortality in hemodialysis patients.",
    biologicalMechanisms: [
      {
        title: "Systemic Inflammatory Endothelial Injury",
        description: "Periodontal cytokine release triggers glomerular capillary injury, proteinuria, and glomerulosclerosis, accelerating the transition toward end-stage renal disease (ESRD)."
      },
      {
        title: "Uremic Ammonia Hydrolysis in Saliva",
        description: "Elevated blood urea nitrogen (BUN) diffuses into saliva, where bacterial urease converts it into caustic free ammonia, destroying oral mucosal integrity and causing chemical uremic stomatitis."
      },
      {
        title: "Secondary Hyperparathyroidism Bone Resorption",
        description: "Disrupted vitamin D activation and calcium-phosphate imbalance lead to brown tumors of hyperparathyroidism, loss of the lamina dura around tooth roots, and spontaneous tooth drifting."
      }
    ],
    oralManifestations: [
      "Uremic fetor: characteristic ammoniacal, fishy breath odor",
      "Uremic stomatitis: painful, white or erythematous ulcerations on tongue and buccal mucosa",
      "Gingival enlargement secondary to calcium channel blockers (e.g., nifedipine, amlodipine)",
      "Loss of lamina dura and ground-glass radiographic appearance of the jawbones"
    ],
    earlyWarningSigns: [
      "Persistent metallic taste with dry, burning mouth",
      "Overgrown, fibrous gums covering tooth crowns in hypertensive kidney patients",
      "Recurrent mucosal ulcers that burn upon contact with acidic or salty food"
    ],
    biomarkers: [
      { name: "eGFR (Glomerular Filtration Rate)", role: "Measures overall kidney filtration.", oralLink: "Periodontitis is associated with a 30% faster annual decline in eGFR." },
      { name: "Salivary Urea Nitrogen (SUN)", role: "Direct reflection of serum BUN.", oralLink: "High SUN correlates with uremic stomatitis and oral mucosal breakdown." },
      { name: "Cystatin C", role: "Alternative sensitive marker for renal function.", oralLink: "Positively associated with periodontal inflammation severity." }
    ],
    interventionalEvidence: "Longitudinal cohort analyses show that hemodialysis patients with severe periodontitis have a 32% higher 5-year all-cause cardiovascular mortality risk compared to those with healthy periodontium. Periodontal scaling before kidney transplantation prevents infectious rejection episodes.",
    clinicalRecommendations: [
      "All patients being placed on the renal transplant waiting list must obtain complete dental clearance to eliminate potential septic foci.",
      "Dental procedures requiring bleeding in dialysis patients should be scheduled on non-dialysis days, after heparin clearance.",
      "Adjust antibiotic dosages for renally cleared medications (e.g., amoxicillin, cephalosporins) based on current eGFR."
    ]
  },
  {
    id: "gastrointestinal",
    title: "Gastrointestinal & Liver Pathologies (IBD, Colorectal, NASH)",
    category: "Gastroenterology",
    icon: "Stethoscope",
    badge: "Aerodigestive Microbiome Axis",
    oddsRatio: "OR: 2.1 – 3.4",
    color: "teal",
    executiveSummary: "Oral pathogens swallowed daily (over 10^11 bacteria/day) can overcome the gastric acid barrier during dysbiosis, colonizing the gut mucosa and liver via the portal vein. Fusobacterium nucleatum directly promotes colorectal carcinogenesis via FadA-E-cadherin binding.",
    biologicalMechanisms: [
      {
        title: "F. nucleatum Drive in Colorectal Cancer",
        description: "F. nucleatum selectively adheres to colorectal adenomas and adenocarcinomas via FadA adhesin, activating beta-catenin signaling, stimulating oncogenic gene transcription, and inhibiting NK-cell anti-tumor immunity via TIGIT receptor binding."
      },
      {
        title: "Crohn's Disease Mucosal Cobblestoning",
        description: "Crohn's disease frequently presents in the oral cavity months before intestinal manifestations. Granulomatous inflammation causes mucosal cobblestoning, deep linear ulcerations, and indurated lip swelling (orofacial granulomatosis)."
      },
      {
        title: "NASH & Gut-Liver Axis Progression",
        description: "P. gingivalis entering portal circulation upregulates hepatic TLR4 and lipid droplet accumulation, converting simple non-alcoholic fatty liver (NAFL) into inflammatory non-alcoholic steatohepatitis (NASH) and liver fibrosis."
      }
    ],
    oralManifestations: [
      "Cobblestone appearance of buccal mucosa with persistent mucosal tags",
      "Deep, painful, snail-track linear vestibular ulcers with hyperplastic folds",
      "Orofacial granulomatosis with persistent, painless enlargement of lips",
      "Pyostomatitis vegetans: multiple small, yellow-white pustules on erythematous gingiva"
    ],
    earlyWarningSigns: [
      "Recurrent aphthous ulcers occurring in crops with abdominal cramping and diarrhea",
      "Persistent swelling of one or both lips unresponsive to antihistamines",
      "Angular cheilitis and tongue depapillation from malabsorption of B-vitamins and iron"
    ],
    biomarkers: [
      { name: "Fecal & Salivary F. nucleatum", role: "Colon cancer biomarker.", oralLink: "High salivary and fecal F. nucleatum ratios serve as non-invasive biomarkers for early colorectal neoplasia." },
      { name: "Fecal Calprotectin", role: "Standard biomarker for intestinal inflammation.", oralLink: "Correlates with active oral mucosal Crohn's manifestations." },
      { name: "ALT / AST / GGT", role: "Liver enzyme panel.", oralLink: "Elevated liver enzymes in non-alcoholic fatty liver disease improve following periodontal therapy." }
    ],
    interventionalEvidence: "Eradication of oral reservoir bacteria through chlorhexidine and deep periodontal therapy in patients with non-alcoholic fatty liver disease (NAFLD) resulted in significant decreases in serum endotoxin levels and transaminases (AST/ALT) over 12 weeks.",
    clinicalRecommendations: [
      "Gastroenterologists should routinely inspect the oral cavity during initial IBD consultations; oral lesions can precede GI symptoms by up to 1-2 years.",
      "Patients with unexplained persistent orofacial granulomatosis or cobblestoning must be screened for subclinical ileocolonic Crohn's disease.",
      "Emphasize comprehensive tongue scraping and antimicrobial oral rinses to reduce daily swallowed pathogen loads."
    ]
  }
];
