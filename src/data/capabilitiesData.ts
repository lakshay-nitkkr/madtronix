export interface CapabilityItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  details?: string[];
  specs?: { label: string; value: string }[];
}

export interface Discipline {
  id: string;
  title: string;
  description: string;
  category: 'core' | 'advanced';
  iconName: string;
  tools: string[];
  deliverables: string[];
}

export interface LifecyclePhase {
  step: string;
  title: string;
  summary: string;
  focus: string;
  activities: string[];
  outputs: string[];
}

export interface IndustrySector {
  id: string;
  title: string;
  description: string;
  iconName: string;
  applications: string[];
  standards: string[];
}

export interface EngagementModel {
  id: string;
  title: string;
  description: string;
  badge: string;
  suitableFor: string;
  turnaround: string;
  scope: string[];
}

export const COMPANY_INFO = {
  name: "Madtronix Systems Private Limited",
  shortName: "Madtronix Systems",
  tagline: "High-Speed Hardware Engineering, Embedded Firmware & Turnkey Prototyping",
  headquarters: "Noida, India",
  website: "madtronixsystems.com",
  email: "contact@madtronixsystems.com",
  pdfPath: "/assets/aistudio/Madtronix_Systems_-_Capabilities_210007c4.pdf",
};

export const CORE_CAPABILITIES = {
  tag: "CORPORATE PROFILE",
  title: "Engineering Core Capabilities",
  lead: "Madtronix Systems delivers comprehensive electronic design services, transforming complex system specifications into production-grade hardware architectures.",
  pillars: [
    {
      id: "multilayer-pcb",
      title: "Multilayer PCB",
      description: "High-speed signal routing with controlled impedance.",
      details: "Stackup synthesis up to 16+ layers, microstrip & stripline impedance modeling (±5% tolerance), DDR4/DDR5 length-tuning, and differential pair skew matching under 2ps.",
      metric: "Up to 16+ Layers / ±5% Impedance",
    },
    {
      id: "firmware-engineering",
      title: "Firmware Engineering",
      description: "Bare-metal drivers and RTOS stack integration.",
      details: "Deterministic C/C++ architecture for FreeRTOS, Zephyr, and bare-metal architectures on ARM Cortex-M, RISC-V, and DSP cores with sub-microsecond interrupt latency.",
      metric: "FreeRTOS & Zephyr / Low-Latency",
    },
    {
      id: "rapid-prototyping",
      title: "Rapid Prototyping",
      description: "Quick-turn board bring-up and verification.",
      details: "In-house precision SMD assembly down to 0201 passives and 0.4mm pitch BGA/QFN components, staged power-rail sequencing, and oscilloscope-verified hardware bring-up.",
      metric: "Quick-Turn 7-10 Days Bring-Up",
    },
  ],
};

export const SPECIALIZED_DISCIPLINES: Discipline[] = [
  {
    id: "hw-arch",
    title: "Hardware Architecture",
    description: "Precision schematic capture and BOM optimization.",
    category: "core",
    iconName: "Cpu",
    tools: ["Altium Designer", "Cadence OrCAD", "Siemens PADS"],
    deliverables: ["Hierarchical Schematics", "Power Budget Spreadsheets", "Optimized Alternate-Sourced BOM"],
  },
  {
    id: "pcb-design",
    title: "High-Speed PCB Design",
    description: "EMI/EMC mitigation and impedance matching.",
    category: "core",
    iconName: "Layers",
    tools: ["Cadence Allegro", "Altium PCB", "HyperLynx SI"],
    deliverables: ["Gerber RS-274X / IPC-2581", "ODB++ Database", "Fabrication & Assembly Drawings"],
  },
  {
    id: "embedded-fw",
    title: "Embedded Firmware",
    description: "Low-latency firmware and secure telemetry stacks.",
    category: "core",
    iconName: "Code",
    tools: ["FreeRTOS", "Zephyr OS", "GCC ARM Toolchain", "CMake"],
    deliverables: ["Modular C/C++ Driver Packages", "Secure Bootloader & OTA", "Hardware Abstraction Layer (HAL)"],
  },
  {
    id: "emi-emc",
    title: "EMI / EMC Certification",
    description: "MIL-STD-461 & CISPR 32 compliant pre-compliance design.",
    category: "advanced",
    iconName: "Zap",
    tools: ["Near-Field Probes", "Spectrum Analyzers", "LISN Filters"],
    deliverables: ["Pre-compliance Radiated/Conducted Scans", "Ferrite & Snubber Optimization", "EMC Hardening Dossier"],
  },
  {
    id: "fpga-design",
    title: "High-Speed FPGA Design",
    description: "VHDL/Verilog DSP pipelines on AMD Xilinx & Intel SoC.",
    category: "advanced",
    iconName: "Binary",
    tools: ["AMD Vivado", "Intel Quartus Prime", "ModelSim"],
    deliverables: ["Synthesizable RTL Cores", "Timing Closure Reports (STA)", "Hardware In-The-Loop Simulation"],
  },
  {
    id: "rf-microwave",
    title: "RF & Microwave Routing",
    description: "Sub-6 GHz, Rogers substrates, LNA & PA circuit tuning.",
    category: "advanced",
    iconName: "Radio",
    tools: ["Keysight ADS", "Rogers 4350B / 4003C", "VNA Vector Analysis"],
    deliverables: ["Matched Coplanar Waveguides", "S-Parameter Characterization", "Smith Chart Impedance Tuning"],
  },
];

export const LIFECYCLE_STEPS: LifecyclePhase[] = [
  {
    step: "01",
    title: "Specification",
    summary: "Architecture freeze & power budget design.",
    focus: "Translating system requirements into hardened silicon topologies, component selections, and thermal/power envelopes.",
    activities: [
      "Power consumption budget analysis across operating modes",
      "Key component selection with long lifecycle guarantees",
      "Mechanical form-factor and connector pinout freeze",
      "System block diagrams & interconnect definition",
    ],
    outputs: ["System Architecture Document (SAD)", "Power Budget Model", "Preliminary Costed BOM"],
  },
  {
    step: "02",
    title: "Schematic & Layout",
    summary: "Multi-layer routing with signal integrity checks.",
    focus: "Hierarchical schematic capture followed by controlled-impedance layout, plane split isolation, and transmission line analysis.",
    activities: [
      "Multi-sheet schematic capture with rigorous ERC checks",
      "High-speed differential length and phase matching",
      "Return path reference ground plane continuity audit",
      "3D clearance verification with enclosure CAD files",
    ],
    outputs: ["Validated Schematics", "Production Gerbers (RS-274X / IPC-2581)", "DFM / DFA Verification Reports"],
  },
  {
    step: "03",
    title: "Board Bring-up",
    summary: "SMD assembly, voltage checks & bare-metal test.",
    focus: "Physical PCB population under IPC-A-610 standards, stepped voltage rail bring-up, and low-level peripheral verification.",
    activities: [
      "Precision paste stencil & reflow profile tuning",
      "Cold-start and staged power rail impedance checks",
      "JTAG boundary scan and clock oscillator characterization",
      "Bare-metal diagnostic firmware execution",
    ],
    outputs: ["Assembled Prototype Units", "Rail Power-Up Sequence Scope Logs", "Hardware Bring-Up Verification Report"],
  },
  {
    step: "04",
    title: "Validation",
    summary: "Environmental, thermal & compliance testing.",
    focus: "Stress testing under thermal, vibrational, and electromagnetic extremes to guarantee 24/7 mission-critical field reliability.",
    activities: [
      "Thermal infrared imaging under full electrical load",
      "Conducted & radiated emissions pre-compliance sweeps",
      "Continuous soak testing with automated telemetry logging",
      "Environmental chamber thermal cycling (-40°C to +85°C/+125°C)",
    ],
    outputs: ["Comprehensive Environmental Test Report", "EMC Pre-Compliance Profile", "Factory Production Test Fixture Specs"],
  },
];

export const QUALITY_STANDARDS = {
  tag: "PROTOTYPING STANDARDS",
  title: "Hardware Quality and SMT Precision",
  lead: "From prototype batch to volume pilot run, our processes eliminate field defects and component vulnerabilities through rigorous IPC guidelines and lifecycle forecasting.",
  features: [
    {
      id: "ipc-compliance",
      title: "IPC Class 2 & 3 Compliance",
      description: "Precision surface-mount soldering with automated optical inspection.",
      details: "Certified solder joint integrity supporting Class 3 high-reliability military and aerospace criteria. 100% AOI inspection ensures zero solder bridges, tombstoning, or voiding.",
    },
    {
      id: "obsolescence",
      title: "Component Obsolescence Defense",
      description: "Proactive sourcing and pin-compatible alternate parts analysis.",
      details: "Every critical IC is paired with footprint-compatible drop-in alternatives, multi-distributor supply chain validation, and proactive silicon roadmap tracking.",
    },
    {
      id: "bom-cost",
      title: "BOM Cost Engineering",
      description: "Design optimization targeting high-yield mass production.",
      details: "Value engineering for volume manufacturing: passive component consolidation, standard footprint unification, and reduction of specialty layer-count costs.",
    },
  ],
};

export const LABORATORY_CAPABILITIES = {
  tag: "TESTING & VERIFICATION",
  title: "In-House Laboratory Capabilities",
  lead: "Our testing protocols catch signal flaws and thermal stress well before pilot manufacturing commits.",
  instruments: [
    {
      id: "signal-integrity",
      title: "Signal Integrity",
      description: "High-bandwidth mixed-domain oscilloscopes.",
      subtext: "Eye diagrams, rise/fall time timing jitter, DDR bus setup/hold margins, and reflection suppression analysis.",
      benchEquipment: "Mixed-Signal High-Bandwidth Storage Oscilloscopes, Active Differential Probes (GHz+)",
    },
    {
      id: "power-profiling",
      title: "Power Profiling",
      description: "Microamp-level telemetry power audits.",
      subtext: "Dynamic current profiling spanning sleep modes (sub-μA) to burst transmit peaks (multi-Amp) with high sampling rates.",
      benchEquipment: "Precision DC Power Analyzers, High-Speed Current Shunts, Digital Multimeters",
    },
    {
      id: "thermal-audits",
      title: "Thermal Audits",
      description: "Continuous infrared load monitoring.",
      subtext: "Calibrated thermal imaging to identify junction hot spots, inductor core saturation, and verify conduction heat-sink efficiency.",
      benchEquipment: "Radiometric Infrared Cameras, K-Type Thermal Data Loggers, Environmental Chambers",
    },
  ],
};

export const DEFENSE_AEROSPACE = {
  tag: "MISSION-CRITICAL ELECTRONICS",
  title: "Defense & Aerospace Engineering",
  lead: "Hardened hardware architectures designed to execute reliably in extreme environmental, vibrational, and thermal operating envelopes.",
  cards: [
    {
      id: "mil-std",
      title: "MIL-STD Ruggedization",
      description: "MIL-STD-810 environmental and shock survivability design.",
      details: "Conformal coating selection (silicone/polyurethane), potted sub-assemblies, high shock & vibration mechanical tie-downs, and salt fog resistance.",
      icon: "ShieldCheck",
    },
    {
      id: "tactical-avionics",
      title: "Tactical Avionics",
      description: "High-density flight telemetry and servo actuation systems.",
      details: "Redundant power rails, CAN-FD / ARINC-429 telemetry interfaces, deterministic motor PWM actuation, and hardware watchdog fail-safes.",
      icon: "Navigation",
    },
    {
      id: "extreme-thermal",
      title: "Extreme Thermal Limits",
      description: "-40°C to +125°C conduction cooling architectures.",
      details: "Heavy copper inner planes, thermal vias stitching, high-TG FR4 / polyimide laminates, and zero-fan passive chassis conduction designs.",
      icon: "ThermometerSnowflake",
    },
  ],
};

export const INDUSTRIES_SERVED: IndustrySector[] = [
  {
    id: "defense-tactical",
    title: "Defense & Tactical",
    description: "Rugged communications, SDR & radar signal units.",
    iconName: "Shield",
    applications: [
      "Software Defined Radio (SDR) Frontends",
      "Battlefield Rugged Data Links",
      "Radar Signal Processing Modules",
      "Secure Encrypted Telemetry Hardware",
    ],
    standards: ["MIL-STD-810H", "MIL-STD-461G", "IPC-A-610 Class 3"],
  },
  {
    id: "emobility-ev",
    title: "E-Mobility & EV",
    description: "BMS controllers, DC fast chargers & telematics units.",
    iconName: "BatteryCharging",
    applications: [
      "High-Voltage Battery Management Systems (BMS)",
      "Isolated CAN-FD Automotive Gateways",
      "DC Fast Charger Controller Boards",
      "Fleet Telematics & GPS Tracking Units",
    ],
    standards: ["ISO 26262 ASIL Concepts", "CISPR 25 Automotive EMC", "AEC-Q Qualified Passives"],
  },
  {
    id: "uav-drones",
    title: "UAV & Drones",
    description: "Lightweight flight controllers & power distribution.",
    iconName: "Plane",
    applications: [
      "Compact Autopilot & Navigation Subsystems",
      "Integrated High-Current Power Distribution Boards",
      "Gimbal & Servo Actuator Controllers",
      "Long-Range Telemetry Transceivers",
    ],
    standards: ["High-Vibration Shock Isolation", "Ultralight PCB Stackups", "Redundant IMU Arrays"],
  },
  {
    id: "industrial-iot",
    title: "Industrial IoT",
    description: "Cellular & LoRa edge gateways for telemetry systems.",
    iconName: "Wifi",
    applications: [
      "Multi-Sensor Smart Factory Edge Gateways",
      "Low-Power LoRaWAN Environmental Nodes",
      "4G/5G Cellular Telemetry Field Modems",
      "Industrial Modbus / RS-485 Data Loggers",
    ],
    standards: ["IEC 61000-4 Surge / ESD", "IP67 Enclosure Integration", "Ultra-Low Standby Sleep Profiling"],
  },
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: "turnkey-npi",
    title: "Turnkey Product NPI",
    description: "Complete ownership from architecture concept to factory-ready Gerber files.",
    badge: "Ideal for OEM product rollouts",
    suitableFor: "Companies seeking a reliable end-to-end electronic engineering partner from initial system concept through certified production units.",
    turnaround: "8 to 16 Weeks to Pilot Production",
    scope: [
      "System architecture freeze & power budget modeling",
      "Schematic capture, multi-layer high-speed layout & 3D clearance",
      "BOM optimization & supply chain risk mitigation",
      "Prototype SMD assembly & bring-up verification",
      "Pre-compliance test execution & manufacturing handover package",
    ],
  },
  {
    id: "ondemand-rd",
    title: "On-Demand R&D Burst",
    description: "Supplemental engineering support for high-density layout and firmware milestones.",
    badge: "Ideal for overloaded hardware teams",
    suitableFor: "In-house engineering divisions requiring specialized surge bandwidth for complex layout, DDR routing, or RTOS driver bring-up.",
    turnaround: "Immediate Sprint Integration (1-4 Weeks)",
    scope: [
      "High-density interconnect (HDI) PCB routing & layer optimization",
      "Bare-metal device driver development & RTOS porting",
      "Critical DDR4/5, PCIe, and RF impedance tuning",
      "Hardware bug isolation & schematic peer reviews",
      "Real-time laboratory testing and measurement services",
    ],
  },
  {
    id: "design-optimization",
    title: "Design Optimization",
    description: "Board revamps for cost reduction, obsolescence fixes, and EMC pass guarantee.",
    badge: "Ideal for active volume products",
    suitableFor: "Existing hardware products experiencing supply chain obsolescence, EMC compliance hurdles, or seeking lower manufacturing cost.",
    turnaround: "3 to 6 Weeks Rapid Turnaround",
    scope: [
      "BOM scrubbing & drop-in second-source part qualification",
      "EMC/EMI redesign for MIL-STD-461 & CISPR 32 compliance",
      "Layer count reduction & PCB panelization yield optimization",
      "Thermal conduction enhancement for extended temperature limits",
      "Drop-in board respins with 100% pin-compatibility guaranteed",
    ],
  },
];
