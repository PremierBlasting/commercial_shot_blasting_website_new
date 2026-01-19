export interface CaseStudy {
  title: string;
  client: string;
  challenge: string;
  solution: string;
  result: string;
  image: string;
}

export interface ServiceData {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroImage: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  applications: string[];
  caseStudies: CaseStudy[];
  faqs: { question: string; answer: string }[];
}

export const services: ServiceData[] = [
  {
    id: "warehouse-racking",
    title: "Warehouse Racking & Pallet Rack Frames",
    shortTitle: "Warehouse Racking",
    tagline: "Professional Shot Blasting for Storage Infrastructure",
    description: "Our specialist warehouse racking shot blasting service provides comprehensive surface preparation for pallet racking systems, storage frames, and industrial shelving. We remove rust, old powder coating, paint, and contaminants from racking components, preparing them for refinishing or galvanizing. Whether you're refurbishing existing warehouse infrastructure or preparing new racking for protective coatings, our precision techniques ensure optimal surface preparation for long-lasting durability.",
    heroImage: "/service-warehouse-racking.png",
    benefits: [
      "Complete removal of rust, old coatings, and corrosion",
      "Extends the service life of warehouse racking systems",
      "Prepares surfaces for powder coating or galvanizing",
      "Improves safety by restoring structural integrity",
      "Cost-effective alternative to replacing entire racking systems",
      "Environmentally responsible process with recyclable media"
    ],
    process: [
      { step: 1, title: "Assessment", description: "We inspect the racking components to determine the appropriate blast media, pressure settings, and surface preparation requirements for your specific system." },
      { step: 2, title: "Disassembly & Transport", description: "If required, we can coordinate the disassembly and transport of racking components to our blasting facility for optimal treatment." },
      { step: 3, title: "Shot Blasting", description: "Our skilled technicians systematically blast all racking surfaces, removing rust, old coatings, and contaminants to achieve the specified cleanliness standard." },
      { step: 4, title: "Quality Inspection", description: "We conduct thorough quality checks to ensure all surfaces meet the required profile and cleanliness specifications for coating adhesion." },
      { step: 5, title: "Finishing & Return", description: "Cleaned components are prepared for powder coating, painting, or galvanizing, and can be returned to your site ready for installation." }
    ],
    applications: [
      "Pallet racking uprights and beams",
      "Cantilever racking systems",
      "Drive-in and drive-through racking",
      "Mezzanine floor support structures",
      "Industrial shelving units",
      "Warehouse storage frames",
      "Distribution center racking",
      "Cold storage racking systems"
    ],
    caseStudies: [
      {
        title: "Distribution Center Racking Refurbishment",
        client: "National Logistics Company",
        challenge: "A 50,000 sq ft distribution center required complete refurbishment of corroded pallet racking systems. Rust and damaged powder coating compromised both safety and appearance.",
        solution: "We systematically removed, transported, and shot blasted over 200 racking components, removing all rust and old coatings. Components were then powder coated and reinstalled.",
        result: "The client saved over 60% compared to new racking replacement costs, with all components restored to like-new condition and certified safe for continued use.",
        image: "/service-warehouse-racking.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast racking on-site or does it need to be removed?",
        answer: "For optimal results, we typically recommend removing racking components and transporting them to our facility. This allows for complete 360-degree coverage and better containment of blast media. However, for certain situations, on-site blasting can be arranged."
      },
      {
        question: "How long does the warehouse racking blasting process take?",
        answer: "Timeline depends on the quantity and condition of components. A typical pallet racking bay (2 uprights and 4 beams) can be processed in 1-2 days. We can provide a detailed timeline after assessing your specific requirements."
      },
      {
        question: "Will shot blasting damage the structural integrity of the racking?",
        answer: "No, when performed correctly by trained professionals, shot blasting actually reveals the true condition of the metal and prepares it for protective coatings that enhance longevity. We use appropriate blast media and pressure settings to clean without damaging the substrate."
      },
      {
        question: "Can you coordinate powder coating after blasting?",
        answer: "Yes, we work with trusted powder coating partners and can arrange complete refurbishment services including blasting, coating, and reinstallation of your warehouse racking systems."
      }
    ]
  },
  {
    id: "pipework",
    title: "Process Pipework, Spools & Manifolds",
    shortTitle: "Process Pipework",
    tagline: "Precision Cleaning for Industrial Pipework Systems",
    description: "Our specialized pipework shot blasting service delivers exceptional surface preparation for industrial process pipework, spools, manifolds, and piping systems. We provide precision cleaning that meets the stringent cleanliness standards required by food processing, pharmaceutical, chemical, and other regulated industries. Our techniques remove mill scale, rust, weld discoloration, and contaminants while preserving the integrity of critical pipework components, preparing them for protective coatings, galvanizing, or direct use in hygienic applications.",
    heroImage: "/service-pipework.png",
    benefits: [
      "Meets stringent cleanliness standards for regulated industries",
      "Removes mill scale, rust, and weld discoloration",
      "Prepares surfaces for stainless steel passivation",
      "Suitable for food-grade and pharmaceutical applications",
      "Preserves dimensional tolerances and surface integrity",
      "Faster and more consistent than manual cleaning methods"
    ],
    process: [
      { step: 1, title: "Specification Review", description: "We review your cleanliness requirements, material specifications, and industry standards to determine the appropriate blast media and process parameters." },
      { step: 2, title: "Component Preparation", description: "Pipework components are inspected, masked if necessary, and positioned for optimal blast coverage while protecting threaded connections and critical surfaces." },
      { step: 3, title: "Precision Blasting", description: "Using fine-grade blast media and controlled pressure, we systematically clean all pipework surfaces to achieve the specified cleanliness level without damaging the substrate." },
      { step: 4, title: "Cleanliness Verification", description: "We conduct thorough inspections and, where required, perform cleanliness testing to verify compliance with industry standards such as ISO 8501 or SSPC specifications." },
      { step: 5, title: "Packaging & Delivery", description: "Cleaned components are carefully packaged to maintain cleanliness during transport and delivered ready for installation or further processing." }
    ],
    applications: [
      "Food processing pipework and spools",
      "Pharmaceutical process piping",
      "Chemical plant manifolds and headers",
      "Dairy industry stainless steel pipework",
      "Brewery and beverage processing pipes",
      "Hygienic process equipment",
      "Oil and gas pipeline spools",
      "Water treatment system pipework"
    ],
    caseStudies: [
      {
        title: "Food Processing Plant Pipework Upgrade",
        client: "International Food Manufacturer",
        challenge: "A food processing facility required shot blasting of 150 stainless steel pipe spools and manifolds to meet stringent hygiene standards before installation in a new production line.",
        solution: "We processed all components using fine-grade aluminum oxide media, achieving SA 2.5 cleanliness standard. Each component was inspected and certified to meet food-grade requirements.",
        result: "All pipework passed third-party hygiene audits and was successfully installed, meeting project deadlines and enabling the facility to achieve BRC certification.",
        image: "/service-pipework.png"
      }
    ],
    faqs: [
      {
        question: "What cleanliness standards can you achieve for pipework?",
        answer: "We can achieve various cleanliness standards including SA 2.5, SA 3, and specific industry requirements for food-grade, pharmaceutical, and chemical applications. We work to ISO 8501, SSPC, and other internationally recognized standards."
      },
      {
        question: "Can you blast stainless steel pipework without damaging it?",
        answer: "Yes, we use appropriate blast media such as aluminum oxide or glass bead, combined with controlled pressure settings, to clean stainless steel without embedding contaminants or damaging the passive layer. We can also coordinate passivation services after blasting."
      },
      {
        question: "Do you provide certification for food-grade or pharmaceutical pipework?",
        answer: "Yes, we can provide material certificates, process documentation, and cleanliness certification as required for regulated industries. We maintain full traceability and quality records for all processed components."
      },
      {
        question: "What size pipework can you accommodate?",
        answer: "We can process pipework ranging from small bore (1/2 inch) up to large diameter pipes and manifolds. Our facility can accommodate spools up to 6 meters in length. Contact us to discuss your specific requirements."
      }
    ]
  },
  {
    id: "telecom-towers",
    title: "Telecom Masts & Lattice Towers",
    shortTitle: "Telecom Towers",
    tagline: "Specialist Shot Blasting for Telecommunications Infrastructure",
    description: "Our specialist telecommunications tower shot blasting service provides comprehensive surface preparation for telecom masts, lattice towers, antenna supports, and associated infrastructure. We remove rust, old galvanizing, paint, and corrosion from tower components, preparing them for hot-dip galvanizing, protective coatings, or structural repairs. Whether you're refurbishing existing telecommunications infrastructure or preparing new tower sections for protective treatments, our precision techniques ensure optimal surface preparation for maximum corrosion protection and extended service life.",
    heroImage: "/service-telecom-tower.png",
    benefits: [
      "Prepares surfaces for hot-dip galvanizing",
      "Removes rust, old coatings, and corrosion",
      "Extends the service life of telecommunications infrastructure",
      "Meets specifications for structural steel preparation",
      "Improves coating adhesion and corrosion protection",
      "Cost-effective refurbishment alternative to tower replacement"
    ],
    process: [
      { step: 1, title: "Structural Assessment", description: "We inspect tower components to assess condition, determine appropriate blast media, and identify any structural concerns that may require attention before coating." },
      { step: 2, title: "Component Preparation", description: "Tower sections, legs, bracing members, and mounting brackets are prepared for blasting. Critical areas such as bolt holes and connection points are protected as required." },
      { step: 3, title: "Shot Blasting", description: "Using appropriate blast media and pressure settings, we systematically clean all tower surfaces to achieve the specified cleanliness standard, typically SA 2.5 or SA 3 for galvanizing." },
      { step: 4, title: "Quality Verification", description: "We conduct thorough inspections to ensure all surfaces meet the required cleanliness and profile specifications for galvanizing or coating application." },
      { step: 5, title: "Galvanizing Coordination", description: "Cleaned components are transported to galvanizing facilities or coating applicators, with timing coordinated to minimize surface oxidation before treatment." }
    ],
    applications: [
      "Telecommunications lattice towers",
      "Monopole mast sections",
      "Guyed tower components",
      "Antenna mounting brackets and platforms",
      "Tower leg sections and bracing members",
      "Microwave dish support structures",
      "Tower foundation anchor bolts",
      "Climbing ladder and safety systems"
    ],
    caseStudies: [
      {
        title: "Regional Telecom Tower Refurbishment Program",
        client: "National Telecommunications Provider",
        challenge: "A telecommunications company required refurbishment of 25 lattice towers across the region. Corrosion had compromised the existing galvanized coating, and structural assessments mandated complete re-galvanizing.",
        solution: "We systematically dismantled, transported, and shot blasted all tower components, removing rust and old galvanizing. Components were then hot-dip galvanized and reinstalled with upgraded mounting hardware.",
        result: "All 25 towers were successfully refurbished and certified for continued service, extending their operational life by an estimated 25+ years and ensuring compliance with structural safety standards.",
        image: "/service-telecom-tower.png"
      }
    ],
    faqs: [
      {
        question: "Can you blast telecommunications towers on-site?",
        answer: "For optimal results and to meet galvanizing specifications, we typically recommend removing tower components and processing them at our facility. This ensures complete coverage and the cleanliness standards required for hot-dip galvanizing. On-site blasting can be arranged for coating repairs but may not meet galvanizing specifications."
      },
      {
        question: "What surface preparation standard is required for galvanizing?",
        answer: "Hot-dip galvanizing typically requires SA 2.5 or SA 3 surface preparation to ISO 8501 standards. We routinely achieve these specifications and can provide certification as required by galvanizing facilities."
      },
      {
        question: "How do you handle the logistics of tower dismantling and transport?",
        answer: "We can coordinate with specialist tower erection companies to handle dismantling, transport, and reinstallation. Alternatively, if you have your own contractors, we can work with them to ensure smooth coordination of the refurbishment process."
      },
      {
        question: "Can you blast tower components that have been previously galvanized?",
        answer: "Yes, we can remove old galvanizing, rust, and corrosion from previously galvanized components, preparing them for re-galvanizing. This is a common requirement for tower refurbishment projects where the original galvanizing has deteriorated."
      }
    ]
  }
];

export function getServiceById(id: string): ServiceData | undefined {
  return services.find(service => service.id === id);
}
