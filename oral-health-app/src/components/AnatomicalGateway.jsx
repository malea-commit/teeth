import React, { useState } from 'react';
import { 
  Heart, 
  Brain, 
  Wind, 
  Activity, 
  Baby, 
  ShieldAlert, 
  Droplets, 
  Stethoscope, 
  Info, 
  ArrowRight,
  ChevronRight,
  GitFork,
  CheckCircle2
} from 'lucide-react';

export default function AnatomicalGateway({ onSelectCondition }) {
  const [selectedOrgan, setSelectedOrgan] = useState('heart');
  const [activePathwayFilter, setActivePathwayFilter] = useState('all');

  const pathways = [
    {
      id: 'all',
      name: 'All Pathways',
      desc: 'Overview of all biological dissemination routes'
    },
    {
      id: 'bacteremia',
      name: '1. Hematogenous Bacteremia',
      desc: 'Direct vascular infiltration via ulcerated pocket epithelium'
    },
    {
      id: 'inflammatory',
      name: '2. Systemic Cytokine Spillover',
      desc: 'Elevated IL-1β, IL-6, TNF-α stimulating hepatic hs-CRP'
    },
    {
      id: 'autoimmune',
      name: '3. Bacterial Citrullination',
      desc: 'PPAD enzyme generating neo-epitopes and ACPA antibodies'
    },
    {
      id: 'aspiration',
      name: '4. Aerodigestive Translocation',
      desc: 'Micro-aspiration into lungs and enteral seeding into gut/liver'
    }
  ];

  const organData = {
    heart: {
      id: 'heart',
      conditionId: 'cardiovascular',
      name: 'Cardiovascular System',
      organSubtitle: 'Coronary Arteries, Endothelium & Heart Valves',
      icon: Heart,
      color: 'rose',
      primaryPathway: 'bacteremia',
      riskStats: '2.8× Risk of Major Adverse Cardiac Events (MACE)',
      oralTrigger: 'Bleeding on Probing (BOP > 20%), Subgingival plaque',
      bacterialCulprits: ['Porphyromonas gingivalis', 'Treponema denticola', 'Streptococcus viridans'],
      pathophysiology: [
        'Epithelial ulceration in deep pockets allows oral anaerobes to enter microcirculation during chewing and toothbrushing.',
        'P. gingivalis expresses fimbriae (FimA) that invade arterial endothelial cells, promoting monocyte adhesion via VCAM-1/ICAM-1.',
        'Endothelial uptake of oxidized LDL leads to foam cell generation and unstable atherosclerotic core formation.',
        'Spillover of oral IL-6 drives hepatic synthesis of high-sensitivity CRP and fibrinogen, raising thrombosis likelihood.'
      ],
      clinicalSignificance: 'Patients with severe periodontitis have significantly increased carotid artery intima-media thickness (c-IMT). Periodontal therapy reduces hs-CRP by 0.5 mg/L and improves flow-mediated brachial dilation.'
    },
    brain: {
      id: 'brain',
      conditionId: 'neurodegenerative',
      name: 'Brain & Central Nervous System',
      organSubtitle: 'Hippocampus, Cortex & Neurovascular Unit',
      icon: Brain,
      color: 'purple',
      primaryPathway: 'bacteremia',
      riskStats: '1.7× Higher Long-Term Alzheimer’s & Dementia Hazard',
      oralTrigger: 'Chronic periodontitis > 10 yrs, missing functional teeth',
      bacterialCulprits: ['Porphyromonas gingivalis', 'Treponema denticola', 'Tannerella forsythia'],
      pathophysiology: [
        'P. gingivalis and its toxic cysteine proteases (Kgp, RgpB gingipains) traverse the blood-brain barrier via hematogenous transport or retrograde trigeminal nerve migration.',
        'Gingipains directly cleave human tau protein, generating pathogenic truncated tau fragments that polymerize into neurofibrillary tangles.',
        'Oral bacterial LPS activates brain microglia, provoking sustained neurotoxic release of TNF-α, IL-1β, and reactive oxygen species that destroy hippocampal synapses.',
        'Loss of natural teeth reduces masticatory sensory input to the hippocampus, compounding cognitive decline.'
      ],
      clinicalSignificance: 'Postmortem human brain autopsies identified P. gingivalis gingipains in over 90% of Alzheimer’s cases, with gingipain levels directly tracking cognitive decline scores before death.'
    },
    lungs: {
      id: 'lungs',
      conditionId: 'respiratory',
      name: 'Respiratory System & Lungs',
      organSubtitle: 'Bronchial Mucosa, Alveolar Septa & Pleura',
      icon: Wind,
      color: 'cyan',
      primaryPathway: 'aspiration',
      riskStats: '1.8–3.2× Hazard of Pneumonia / COPD Exacerbation',
      oralTrigger: 'Heavy dental plaque biofilm, uncleaned dentures, impaired swallow',
      bacterialCulprits: ['Streptococcus pneumoniae', 'Pseudomonas aeruginosa', 'P. gingivalis', 'Fusobacterium'],
      pathophysiology: [
        'Oropharynx is colonized by respiratory pathogens adhering to plaque pellicle.',
        'During sleep or dysphagia, microscopic droplets of infected saliva are aspirated into lower airways.',
        'Salivary enzymes (proteases, sialidases) strip protective mucins and fibronectin off bronchial respiratory epithelium.',
        'Unmitigated colonization incites intense neutrophilic infiltration, causing alveolar consolidation or triggering acute COPD exacerbations.'
      ],
      clinicalSignificance: 'Daily chlorhexidine oral decontamination in ICU mechanically ventilated patients reduces Ventilator-Associated Pneumonia (VAP) by 40%. Routine professional oral hygiene in nursing homes cuts pneumonia mortality by 30%.'
    },
    pancreas: {
      id: 'pancreas',
      conditionId: 'diabetes',
      name: 'Endocrine Pancreas & Metabolism',
      organSubtitle: 'Islets of Langerhans & Peripheral Insulin Receptors',
      icon: Activity,
      color: 'amber',
      primaryPathway: 'inflammatory',
      riskStats: '3.0× Increased Odds of Poor Glycemic Control (HbA1c > 8.0%)',
      oralTrigger: 'Strawberry gingivitis, multiple abscesses, severe xerostomia',
      bacterialCulprits: ['P. gingivalis', 'T. forsythia', 'Prevotella intermedia'],
      pathophysiology: [
        'Inflamed periodontal pockets discharge massive quantities of TNF-α and IL-6 into systemic circulation.',
        'TNF-α induces serine phosphorylation of Insulin Receptor Substrate-1 (IRS-1), blocking intracellular GLUT4 translocation and worsening peripheral insulin resistance.',
        'Hyperglycemia creates advanced glycation end-products (AGEs) in periodontal tissues, which bind RAGE receptors on macrophages to hyper-activate osteoclastic bone resorption.',
        'The relationship is strictly bidirectional: periodontitis worsens HbA1c; high blood sugar accelerates periodontal tissue loss.'
      ],
      clinicalSignificance: 'Systematic reviews prove periodontal therapy lowers HbA1c by ~0.43% (comparable to adding Metformin or an SGLT2 inhibitor), while decreasing diabetic microvascular complications.'
    },
    placenta: {
      id: 'placenta',
      conditionId: 'pregnancy',
      name: 'Feto-Placental Unit',
      organSubtitle: 'Choriodecidual Space, Amniotic Fluid & Umbilical Cord',
      icon: Baby,
      color: 'pink',
      primaryPathway: 'bacteremia',
      riskStats: '2.4–4.5× Risk of Preterm Birth & Low Birth Weight',
      oralTrigger: 'Pregnancy gingivitis, pyogenic granuloma, BOP > 30%',
      bacterialCulprits: ['Fusobacterium nucleatum', 'Campylobacter rectus', 'P. gingivalis'],
      pathophysiology: [
        'Elevated pregnancy hormones (progesterone, estrogen) increase gingival vascular permeability and alter subgingival microbiome.',
        'Fusobacterium nucleatum uses its FadA adhesin to penetrate maternal endothelial cells and colonize the choriodecidual tissue.',
        'Fetal-placental immune activation stimulates fetal and trophoblast secretion of Prostaglandin E2 (PGE2) and TNF-α.',
        'Premature amniotic PGE2 spike mimics the physiological trigger for myometrial uterine contractions, inducing preterm rupture of membranes.'
      ],
      clinicalSignificance: 'Fusobacterium nucleatum is the single most frequent oral pathogen recovered from amniotic fluid in preterm deliveries. Routine periodontal care during the 2nd trimester is safe and reduces localized inflammatory flares.'
    },
    joints: {
      id: 'joints',
      conditionId: 'rheumatoid',
      name: 'Synovial Joints & Musculoskeletal',
      organSubtitle: 'Synovium, Articular Cartilage & TMJ',
      icon: ShieldAlert,
      color: 'indigo',
      primaryPathway: 'autoimmune',
      riskStats: '2.8× Higher Prevalence in Patients with Rheumatoid Arthritis',
      oralTrigger: 'Deep pockets, rapid alveolar bone loss, severe TMJ clicking/pain',
      bacterialCulprits: ['Porphyromonas gingivalis', 'Aggregatibacter actinomycetemcomitans'],
      pathophysiology: [
        'P. gingivalis produces Peptidylarginine Deiminase (PPAD), an enzyme capable of post-translationally modifying human proteins by converting arginine residues into citrulline.',
        'Aggregatibacter actinomycetemcomitans secretes Leukotoxin A (LtxA), inducing hypercitrullination in human neutrophils.',
        'The host immune system fails to recognize these citrullinated neo-epitopes, triggering Anti-Citrullinated Protein Antibodies (ACPA / anti-CCP).',
        'Circulating ACPAs form immune complexes that home in on synovial joints, igniting destructive arthritis and pannus tissue formation.'
      ],
      clinicalSignificance: 'Periodontal infection can precede clinical rheumatoid arthritis joint stiffness by 5 to 10 years. Successful periodontal debridement improves the clinical Disease Activity Score (DAS28).'
    },
    kidneys: {
      id: 'kidneys',
      conditionId: 'kidney',
      name: 'Renal Glomeruli & Vasculature',
      organSubtitle: 'Glomerular Capillaries & Nephron Filtration',
      icon: Droplets,
      color: 'emerald',
      primaryPathway: 'inflammatory',
      riskStats: '32% Higher 5-Year Mortality in Hemodialysis Patients with Periodontitis',
      oralTrigger: 'Ammoniacal uremic breath, gingival enlargement, mucosal ulcers',
      bacterialCulprits: ['Gram-negative subgingival biofilm', 'P. gingivalis'],
      pathophysiology: [
        'Periodontitis maintains a continuous low-grade systemic endotoxemia that damages fragile glomerular endothelial fenestrations.',
        'Elevated blood urea nitrogen (BUN) passes into saliva, where bacterial urease splits urea into corrosive free ammonia, causing painful uremic stomatitis.',
        'Secondary hyperparathyroidism in CKD disrupts calcium-phosphate homeostasis, driving jawbone demineralization, lamina dura loss, and loose teeth.'
      ],
      clinicalSignificance: 'Periodontitis accelerates the annual rate of eGFR decline. Dental clearance is an absolute prerequisite prior to kidney transplantation to prevent life-threatening immunosuppressed sepsis.'
    },
    gut: {
      id: 'gut',
      conditionId: 'gastrointestinal',
      name: 'Gastrointestinal Tract & Liver',
      organSubtitle: 'Colonic Epithelium, Portal Vein & Hepatic Lobules',
      icon: Stethoscope,
      color: 'teal',
      primaryPathway: 'aspiration',
      riskStats: '2.1× Risk of Colorectal Neoplasia & NASH Progression',
      oralTrigger: 'Oral cobblestoning, snail-track aphthous ulcers, swollen lips',
      bacterialCulprits: ['Fusobacterium nucleatum', 'P. gingivalis'],
      pathophysiology: [
        'Humans swallow over 10^11 oral bacteria each day in normal salivary turnover.',
        'When gastric acid or intestinal barriers are compromised, F. nucleatum colonizes colonic crypts, binding E-cadherin to stimulate beta-catenin oncogenic signaling and accelerate colorectal neoplasia.',
        'Crohn’s disease frequently demonstrates oral mucosal cobblestoning and granulomatous lip swelling months before bowel complaints emerge.',
        'Translocation of P. gingivalis through the portal vein into liver parenchyma upregulates hepatic TLR4, converting simple steatosis into inflammatory NASH fibrosis.'
      ],
      clinicalSignificance: 'Oral signs (aphthae, lip swelling) can precede intestinal Crohn’s disease diagnosis by years. Oral F. nucleatum loads are emerging as non-invasive screening biomarkers for early colorectal polyps.'
    }
  };

  const currentOrgan = organData[selectedOrgan];

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200" id="anatomical-pathways">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <GitFork className="w-3.5 h-3.5" />
            <span>Interactive Biological Transmission Map</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Oral-to-Systemic Dissemination Pathways
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Explore how localized oral pathology propagates through 4 primary physiological routes to affect vital systemic organs and chronic disease states.
          </p>
        </div>

        {/* Pathway Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {pathways.map((p) => {
            const isSelected = activePathwayFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePathwayFilter(p.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 ring-2 ring-teal-500'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p.name}
              </button>
            );
          })}
        </div>

        {/* Interactive Layout: Organ Buttons / Grid + Deep Dive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Organ Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Select Target Organ System
              </span>
              <span className="text-xs text-teal-600 font-medium">8 Mapped End-Organs</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {Object.values(organData).map((organ) => {
                const Icon = organ.icon;
                const isSelected = selectedOrgan === organ.id;
                
                return (
                  <button
                    key={organ.id}
                    onClick={() => setSelectedOrgan(organ.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`p-2.5 rounded-xl ${
                        isSelected 
                          ? 'bg-teal-600 text-white shadow-sm' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">
                          {organ.name}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {organ.organSubtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="hidden sm:inline-block text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                          Active
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-teal-600 translate-x-0.5' : 'text-slate-300'}`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Organ Dossier Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
              {/* Card Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-teal-50 text-teal-700 border border-teal-200 shadow-xs">
                    {React.createElement(currentOrgan.icon, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                      Systemic Organ Target
                    </span>
                    <h3 className="text-2xl font-black text-slate-900">
                      {currentOrgan.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {currentOrgan.organSubtitle}
                    </p>
                  </div>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl px-3.5 py-2 text-right">
                  <span className="text-[11px] font-bold uppercase text-rose-700 block">Epidemiological Impact</span>
                  <span className="text-xs font-black text-rose-900">{currentOrgan.riskStats}</span>
                </div>
              </div>

              {/* Oral Presentation & Pathogen Culprits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    <Info className="w-3.5 h-3.5 text-teal-600" />
                    <span>Oral Indicator / Clinical Trigger</span>
                  </div>
                  <p className="text-xs text-slate-800 font-medium">
                    {currentOrgan.oralTrigger}
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-1.5 uppercase">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                    <span>Key Pathogen Culprits</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {currentOrgan.bacterialCulprits.map((b, i) => (
                      <span key={i} className="text-[11px] font-semibold italic bg-white border border-slate-300 text-slate-700 px-2 py-0.5 rounded-md">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step-by-Step Pathophysiology Flow */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-teal-600" />
                  <span>Molecular & Cellular Pathophysiology Cascade</span>
                </h4>
                <div className="space-y-2.5">
                  {currentOrgan.pathophysiology.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-teal-50/40 border border-teal-100 rounded-xl p-3">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Significance & Call to Action */}
              <div className="bg-slate-900 text-white rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-teal-400 mb-1 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clinical Significance & Intervention</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {currentOrgan.clinicalSignificance}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onSelectCondition && onSelectCondition(currentOrgan.conditionId)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <span>View Full Clinical Condition Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs text-slate-400 font-medium">
                  Evidence Tier: Meta-Analysis & In Vivo Validated
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
