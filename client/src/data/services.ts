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
    id: "steel-shot-blasting",
    title: "Steel Shot Blasting",
    shortTitle: "Steel",
    tagline: "High-Performance Cleaning for Steel Structures",
    description: "Our steel shot blasting service delivers superior surface preparation for all types of steel structures. Using advanced abrasive blasting technology, we remove rust, mill scale, old coatings, and contaminants to create the ideal surface profile for protective coating adhesion. Whether you're preparing structural steel for a new coating system or restoring aged infrastructure, our precision techniques ensure optimal results every time.",
    heroImage: "/images/premier/warehouse-bars-after.jpeg",
    benefits: [
      "Complete removal of rust, mill scale, and old coatings",
      "Creates optimal surface profile for coating adhesion",
      "Extends the lifespan of steel structures",
      "Environmentally friendly process with recyclable media",
      "Faster and more thorough than manual methods",
      "Suitable for both new construction and restoration"
    ],
    process: [
      { step: 1, title: "Assessment", description: "We inspect the steel surface to determine the appropriate blast media and pressure settings for your specific requirements." },
      { step: 2, title: "Preparation", description: "The work area is prepared with containment systems to capture spent media and debris, ensuring a clean and safe environment." },
      { step: 3, title: "Blasting", description: "Our skilled technicians apply the shot blasting process, systematically treating all surfaces to achieve the specified cleanliness standard." },
      { step: 4, title: "Inspection", description: "We conduct thorough quality checks to ensure the surface meets the required profile and cleanliness specifications." },
      { step: 5, title: "Cleanup", description: "All debris and spent media are collected and disposed of responsibly, leaving your site clean and ready for coating." }
    ],
    applications: [
      "Structural steel beams and columns",
      "Steel bridges and overpasses",
      "Storage tanks and vessels",
      "Pipeline systems",
      "Steel fabrications",
      "Industrial machinery frames"
    ],
    caseStudies: [
      {
        title: "Industrial Warehouse Framework",
        client: "Manufacturing Facility, Birmingham",
        challenge: "A 50,000 sq ft warehouse had severe rust and coating failure on its steel framework, threatening structural integrity.",
        solution: "We deployed our mobile shot blasting equipment to treat all exposed steel surfaces, achieving SA 2.5 cleanliness standard.",
        result: "The framework was restored to bare metal, allowing for a new protective coating system that will protect the structure for 20+ years.",
        image: "/images/premier/warehouse-bars-before.jpeg"
      },
      {
        title: "Historic Railway Bridge Restoration",
        client: "Network Rail, Yorkshire",
        challenge: "A Victorian-era railway bridge required complete surface preparation while maintaining its heritage features.",
        solution: "Using precision shot blasting with fine media, we carefully removed decades of corrosion without damaging decorative ironwork.",
        result: "The bridge was successfully restored and recoated, preserving its historic character while ensuring another century of service.",
        image: "/images/premier/warehouse-bars-after.jpeg"
      }
    ],
    faqs: [
      { question: "What cleanliness standards can you achieve?", answer: "We can achieve all industry-standard cleanliness levels from SA 1 to SA 3, depending on your coating requirements. Most projects require SA 2.5 (near-white metal) for optimal coating adhesion." },
      { question: "How long does steel shot blasting take?", answer: "Project duration depends on the surface area and condition. A typical structural steel project of 1,000 sq meters can be completed in 2-3 days." },
      { question: "Is shot blasting suitable for all steel types?", answer: "Yes, we adjust our media and pressure settings to suit different steel grades and thicknesses, from heavy structural sections to thin sheet metal." }
    ]
  },
  {
    id: "concrete-preparation",
    title: "Concrete Preparation",
    shortTitle: "Concrete",
    tagline: "Surface Profiling for Optimal Coating Adhesion",
    description: "Professional concrete preparation is essential for any successful flooring or coating project. Our shot blasting services create the perfect surface profile on concrete floors, removing laitance, contaminants, and existing coatings while opening up the pores of the concrete for maximum adhesion. From warehouse floors to car parks, we prepare surfaces that ensure your coating system performs to its full potential.",
    heroImage: "/images/premier/warehouse-outside-after.jpeg",
    benefits: [
      "Creates consistent surface profile across large areas",
      "Removes laitance, oils, and contaminants",
      "Opens concrete pores for better coating penetration",
      "Dust-free operation with integrated vacuum systems",
      "Faster than grinding or acid etching",
      "No chemicals or water required"
    ],
    process: [
      { step: 1, title: "Surface Analysis", description: "We test the concrete hardness and assess existing coatings to determine the optimal blast pattern and media size." },
      { step: 2, title: "Area Preparation", description: "Edges, joints, and obstacles are marked. Our self-contained equipment requires minimal site preparation." },
      { step: 3, title: "Shot Blasting", description: "Our ride-on or walk-behind machines systematically blast the floor, with integrated dust collection for a clean process." },
      { step: 4, title: "Edge Work", description: "Hand-held equipment is used to treat edges, corners, and areas inaccessible to larger machines." },
      { step: 5, title: "Profile Verification", description: "We measure the surface profile to confirm it meets the coating manufacturer's specifications." }
    ],
    applications: [
      "Warehouse and factory floors",
      "Car park decks",
      "Commercial kitchens",
      "Retail spaces",
      "Sports facilities",
      "External concrete areas"
    ],
    caseStudies: [
      {
        title: "Distribution Centre Floor Preparation",
        client: "Logistics Company, Manchester",
        challenge: "A 100,000 sq ft distribution centre floor needed preparation for a new epoxy coating system, with minimal disruption to operations.",
        solution: "Working in phases over weekends, we shot blasted the entire floor area, achieving CSP 3-4 profile throughout.",
        result: "The new epoxy system bonded perfectly, and the client reported zero coating failures after 3 years of heavy forklift traffic.",
        image: "/images/premier/warehouse-outside-before.jpeg"
      },
      {
        title: "Multi-Storey Car Park Deck",
        client: "Shopping Centre, Leeds",
        challenge: "Deteriorating waterproof coating on a busy car park deck needed removal before applying a new membrane system.",
        solution: "We removed the failed coating and prepared all deck surfaces, including ramps and stairwells, to receive the new waterproofing.",
        result: "The new membrane system was successfully applied, eliminating water ingress issues that had plagued the structure for years.",
        image: "/images/premier/warehouse-outside-after.jpeg"
      }
    ],
    faqs: [
      { question: "What surface profile can you achieve on concrete?", answer: "We can achieve Concrete Surface Profiles (CSP) from 1 to 9, depending on your coating requirements. Most epoxy and polyurethane systems require CSP 3-5." },
      { question: "Can you work in occupied buildings?", answer: "Yes, our equipment features integrated dust collection systems, allowing us to work in occupied spaces with minimal disruption. We can also work in phases to maintain access." },
      { question: "How do you handle existing coatings?", answer: "Our shot blasting process effectively removes most existing coatings, including epoxies, polyurethanes, and paints. Multiple passes may be required for thick or heavily bonded coatings." }
    ]
  },
  {
    id: "automotive-restoration",
    title: "Automotive Restoration",
    shortTitle: "Automotive",
    tagline: "Precision Cleaning for Vehicle Restoration",
    description: "Restore your classic car, motorcycle, or commercial vehicle to its former glory with our specialist automotive shot blasting services. We carefully remove rust, paint, and underseal from chassis, body panels, and components, revealing clean metal ready for restoration. Our controlled blasting techniques ensure thorough cleaning without warping thin panels or damaging delicate areas.",
    heroImage: "/images/premier/gate-metal-after.jpeg",
    benefits: [
      "Complete removal of rust, paint, and underseal",
      "Reveals hidden corrosion for proper repair",
      "No heat distortion on body panels",
      "Reaches areas inaccessible to other methods",
      "Ideal preparation for welding and bodywork",
      "Suitable for all vehicle types and sizes"
    ],
    process: [
      { step: 1, title: "Vehicle Assessment", description: "We examine your vehicle to identify areas of concern and discuss your restoration goals and timeline." },
      { step: 2, title: "Disassembly Support", description: "We can advise on which components to remove before blasting, or blast assembled sections as required." },
      { step: 3, title: "Media Selection", description: "We choose the appropriate blast media based on the metal thickness and condition to ensure safe, effective cleaning." },
      { step: 4, title: "Precision Blasting", description: "Our technicians carefully blast all surfaces, adjusting pressure and technique for different areas and metal thicknesses." },
      { step: 5, title: "Protective Priming", description: "We can apply etch primer immediately after blasting to prevent flash rust and protect the bare metal." }
    ],
    applications: [
      "Classic car chassis and body shells",
      "Motorcycle frames and components",
      "Commercial vehicle chassis",
      "Wheels and suspension parts",
      "Engine components",
      "Agricultural vehicle restoration"
    ],
    caseStudies: [
      {
        title: "1967 Jaguar E-Type Restoration",
        client: "Private Collector, Cotswolds",
        challenge: "A barn-find E-Type with extensive rust and multiple layers of paint needed complete stripping for a concours restoration.",
        solution: "We carefully blasted the entire body shell and chassis, using fine media on thin panels and more aggressive treatment on structural areas.",
        result: "The owner discovered the car was more original than expected, with factory markings preserved. The restoration won its class at a national concours.",
        image: "/images/premier/gate-metal-after.jpeg"
      },
      {
        title: "Fleet of Vintage Buses",
        client: "Heritage Transport Museum",
        challenge: "Six vintage buses from the 1950s-60s required chassis and panel preparation for museum display restoration.",
        solution: "We established an on-site blasting facility to process all vehicles efficiently, treating chassis, panels, and components.",
        result: "All six buses were successfully restored and are now star attractions at the museum, with the blasting work praised for its quality.",
        image: "/images/premier/shot-blasting-gate.jpeg"
      }
    ],
    faqs: [
      { question: "Will shot blasting warp my body panels?", answer: "When performed correctly, shot blasting does not warp panels. We use appropriate media and pressure settings for thin metal, and our experienced technicians know how to treat different areas safely." },
      { question: "Can you blast assembled vehicles?", answer: "Yes, we can blast vehicles in various states of assembly. However, removing glass, trim, and mechanical components before blasting usually gives better results and protects these parts." },
      { question: "How quickly should the metal be primed after blasting?", answer: "Bare metal should be primed within 24-48 hours to prevent flash rust. We offer immediate etch priming as part of our service to protect your vehicle." }
    ]
  },
  {
    id: "marine-services",
    title: "Marine Services",
    shortTitle: "Marine",
    tagline: "Hull and Deck Surface Preparation",
    description: "The marine environment presents unique challenges for surface preparation. Our marine shot blasting services are designed to tackle the tough conditions of boats, ships, and offshore structures. We remove marine growth, antifouling coatings, rust, and corrosion to prepare surfaces for new protective systems that will withstand the harshest maritime conditions.",
    heroImage: "/images/premier/steel-container-after.jpeg",
    benefits: [
      "Removes antifouling, marine growth, and corrosion",
      "Prepares surfaces for marine-grade coatings",
      "Suitable for steel and aluminium vessels",
      "Mobile service for boatyards and marinas",
      "Extends vessel lifespan and performance",
      "Compliant with marine environmental regulations"
    ],
    process: [
      { step: 1, title: "Vessel Survey", description: "We assess the hull condition, existing coatings, and substrate type to plan the most effective treatment approach." },
      { step: 2, title: "Environmental Setup", description: "Containment systems are installed to capture all blast media and debris, meeting marina and environmental requirements." },
      { step: 3, title: "Hull Blasting", description: "We systematically blast the hull surfaces, removing all coatings and corrosion to reveal clean substrate." },
      { step: 4, title: "Detail Work", description: "Anodes, through-hulls, and other fittings are carefully treated or masked as required." },
      { step: 5, title: "Surface Preparation", description: "The prepared surface is cleaned and checked before handover for immediate coating application." }
    ],
    applications: [
      "Yacht and boat hulls",
      "Commercial vessel maintenance",
      "Offshore platform structures",
      "Marina infrastructure",
      "Propellers and running gear",
      "Deck surfaces and superstructures"
    ],
    caseStudies: [
      {
        title: "Historic Sailing Vessel Restoration",
        client: "Maritime Heritage Trust",
        challenge: "A 100-year-old steel-hulled sailing vessel required complete hull preparation for a heritage restoration project.",
        solution: "Working in dry dock, we carefully removed decades of coatings and corrosion, revealing the original hull plating for assessment.",
        result: "The survey revealed the hull was in better condition than expected. After repairs and recoating, the vessel returned to active sailing.",
        image: "/images/premier/steel-container-after.jpeg"
      },
      {
        title: "Commercial Fishing Fleet",
        client: "Fishing Cooperative, Cornwall",
        challenge: "A fleet of 12 fishing vessels needed hull preparation during their annual maintenance period, with tight scheduling constraints.",
        solution: "We established an efficient workflow, blasting and preparing two vessels per week to meet the fleet's return-to-service deadlines.",
        result: "All vessels were completed on schedule with improved hull performance, and the cooperative has engaged us for annual maintenance since.",
        image: "/images/premier/storage-unit-after.jpeg"
      }
    ],
    faqs: [
      { question: "Can you work at our marina or boatyard?", answer: "Yes, we offer mobile marine blasting services and can set up at most marina and boatyard locations. We bring all necessary containment and collection equipment." },
      { question: "What about environmental regulations?", answer: "We use approved containment systems and dispose of all waste through licensed facilities. Our processes comply with Environment Agency and marina regulations." },
      { question: "Can you blast aluminium boats?", answer: "Yes, we use appropriate media and techniques for aluminium substrates, achieving excellent surface preparation without damaging the softer metal." }
    ]
  },
  {
    id: "agricultural-equipment",
    title: "Agricultural Equipment",
    shortTitle: "Agricultural",
    tagline: "Restoring Farm Machinery to Peak Condition",
    description: "Agricultural equipment faces some of the toughest operating conditions, from corrosive fertilizers to constant exposure to the elements. Our shot blasting services restore farm machinery, implements, and structures to like-new condition, removing years of rust, old paint, and accumulated grime. Proper surface preparation extends equipment life and ensures protective coatings perform at their best.",
    heroImage: "/images/premier/steel-container-commercial-after.jpeg",
    benefits: [
      "Removes rust, old paint, and agricultural residues",
      "Prepares surfaces for durable protective coatings",
      "Extends machinery lifespan significantly",
      "Improves equipment appearance and resale value",
      "Reveals hidden corrosion for repair",
      "Cost-effective alternative to replacement"
    ],
    process: [
      { step: 1, title: "Equipment Inspection", description: "We assess the machinery condition and identify areas requiring special attention or repair before blasting." },
      { step: 2, title: "Preparation", description: "Bearings, seals, and sensitive components are masked or removed to protect them during the blasting process." },
      { step: 3, title: "Blasting", description: "All metal surfaces are thoroughly blasted to remove corrosion and old coatings, creating an ideal surface for repainting." },
      { step: 4, title: "Inspection", description: "The cleaned surfaces are inspected for any damage or wear that was hidden beneath the old finish." },
      { step: 5, title: "Priming", description: "We can apply primer immediately after blasting to protect the bare metal until final painting." }
    ],
    applications: [
      "Tractors and combine harvesters",
      "Trailers and transport equipment",
      "Ploughs and cultivation equipment",
      "Grain handling systems",
      "Livestock equipment",
      "Farm buildings and structures"
    ],
    caseStudies: [
      {
        title: "Vintage Tractor Collection",
        client: "Agricultural Museum, Norfolk",
        challenge: "A collection of 20 vintage tractors spanning 1920-1970 needed restoration for a new museum exhibition.",
        solution: "We established a production line approach, blasting chassis, wheels, and body panels for each tractor systematically.",
        result: "All tractors were beautifully restored and now form the centrepiece of the museum's agricultural heritage exhibition.",
        image: "/images/premier/steel-container-commercial-after.jpeg"
      },
      {
        title: "Grain Storage Facility",
        client: "Farming Cooperative, Lincolnshire",
        challenge: "Steel grain silos and handling equipment showed significant corrosion after 30 years of service.",
        solution: "We blasted all steel surfaces including silos, conveyors, and structural supports, preparing them for a new coating system.",
        result: "The refurbished facility looks and performs like new, with the protective coatings expected to last another 25+ years.",
        image: "/images/premier/storage-unit-before.jpeg"
      }
    ],
    faqs: [
      { question: "Can you come to our farm?", answer: "Yes, we offer mobile services and can blast equipment on-site at your farm. This is often more practical for large machinery that's difficult to transport." },
      { question: "How do you protect bearings and seals?", answer: "We carefully mask all bearings, seals, hydraulic fittings, and other sensitive components before blasting. We can also advise on which parts to remove beforehand." },
      { question: "Is it worth restoring old equipment?", answer: "Often yes - quality older machinery can be restored to excellent condition for a fraction of replacement cost. We can assess your equipment and advise on the best approach." }
    ]
  },
  {
    id: "infrastructure-projects",
    title: "Infrastructure Projects",
    shortTitle: "Infrastructure",
    tagline: "Large-Scale Surface Preparation Solutions",
    description: "From bridges and tunnels to water treatment facilities and power stations, infrastructure projects demand the highest standards of surface preparation. Our experienced teams and extensive equipment fleet can handle projects of any scale, delivering consistent quality across thousands of square meters. We work to the most demanding specifications and maintain full compliance with health, safety, and environmental requirements.",
    heroImage: "/images/premier/steel-balustrade.jpeg",
    benefits: [
      "Capability for large-scale projects",
      "Experienced in working to strict specifications",
      "Full health and safety compliance",
      "Environmental containment systems",
      "Flexible scheduling for minimal disruption",
      "Comprehensive documentation and reporting"
    ],
    process: [
      { step: 1, title: "Project Planning", description: "We work with project managers and engineers to develop detailed method statements and schedules." },
      { step: 2, title: "Site Setup", description: "Access equipment, containment systems, and welfare facilities are established according to project requirements." },
      { step: 3, title: "Execution", description: "Our teams systematically work through the project, maintaining quality standards and programme targets." },
      { step: 4, title: "Quality Assurance", description: "Regular inspections and testing ensure all work meets the specified standards throughout the project." },
      { step: 5, title: "Handover", description: "Comprehensive documentation is provided, and surfaces are protected ready for the next phase of work." }
    ],
    applications: [
      "Highway and railway bridges",
      "Water treatment facilities",
      "Power generation plants",
      "Tunnels and underpasses",
      "Flood defence structures",
      "Industrial facilities"
    ],
    caseStudies: [
      {
        title: "Major River Crossing Refurbishment",
        client: "Highways Authority",
        challenge: "A 500-meter steel bridge required complete repainting, with surface preparation needed on 15,000 sq meters of steelwork.",
        solution: "Working from suspended access platforms, our team blasted all surfaces over a 12-week programme, achieving SA 2.5 throughout.",
        result: "The project was completed on schedule and budget, with the new coating system providing 25-year protection for this critical crossing.",
        image: "/images/premier/steel-balustrade.jpeg"
      },
      {
        title: "Water Treatment Works Upgrade",
        client: "Water Utility Company",
        challenge: "Aging steel tanks and pipework at a treatment works needed preparation for new protective coatings while maintaining operations.",
        solution: "We developed a phased approach, taking individual tanks out of service for blasting while others maintained supply.",
        result: "All structures were successfully treated without any interruption to water supply, extending the facility's operational life by decades.",
        image: "/images/premier/commercial-unit-shot-blasting.jpeg"
      }
    ],
    faqs: [
      { question: "What specifications do you work to?", answer: "We work to all major industry specifications including ISO 8501, SSPC, and NACE standards. We can also work to client-specific requirements and coating manufacturer specifications." },
      { question: "How do you manage health and safety on large projects?", answer: "We maintain comprehensive RAMS (Risk Assessments and Method Statements) for all projects, hold principal contractor status, and our teams are fully trained in working at height, confined spaces, and other high-risk activities." },
      { question: "Can you work around live operations?", answer: "Yes, we have extensive experience working on operational sites. We develop detailed programmes to minimise disruption and can work nights and weekends if required." }
    ]
  }
];

export const getServiceById = (id: string): ServiceData | undefined => {
  return services.find(service => service.id === id);
};

export const getServiceByShortTitle = (shortTitle: string): ServiceData | undefined => {
  return services.find(service => service.shortTitle.toLowerCase() === shortTitle.toLowerCase());
};
