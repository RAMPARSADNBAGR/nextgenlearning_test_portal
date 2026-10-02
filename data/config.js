// ===============================
// NextGen Learning - App Configuration
// ===============================
// Chapters are now auto-registered - you do NOT need to edit this file
// when adding a new test. Just:
//   1. Write question-source-private/<classId>/<subjectId>/<chapterId>.js
//   2. Run: node tools/build-public-questions.js
// That's it. See CHAPTER_META in any existing question-source-private
// file for how to set the chapter's title/time/marking.
//
// This file only needs editing when adding a brand-new CLASS or SUBJECT
// (rare), or a "Coming Soon" placeholder for a chapter you haven't
// written yet.
//
// Class 11 and Class 12 list every chapter as a "Coming Soon" placeholder.
// A placeholder disappears automatically once a test exists for it: name
// your test file <placeholder-id>.js, or <placeholder-id>-<anything>.js
// (e.g. morphology-flowering-plants-paper-1.js).

const APP_CONFIG = {

    // Global settings - one place to tune behaviour across the whole app
    settings: {

        // If true, answers are checked on the server (Google Apps Script)
        // and never sent to the student's browser - the secure option.
        // Requires the Google Sheet + AnswerKeys tab to be set up first
        // (see GOOGLE_SHEET_SETUP.md). If you haven't done that yet, leave
        // this as false so the app keeps working the old (simpler) way.
        serverSideScoring: false,

        // Shuffle the order questions appear in for each student, so
        // students sitting near each other don't see the same question at
        // the same time. Answer options are NOT shuffled (kept in original
        // order) to keep answer-checking simple and reliable.
        randomizeQuestionOrder: true,

        // Number of anti-cheating violations (see js/anticheat.js) allowed
        // before the test is auto-submitted.
        maxViolations: 3,

        // Block a student from taking the same chapter test twice, based
        // on their mobile number. Requires serverSideScoring to be on
        // (checked against your Google Sheet).
        preventReattempts: false

    },

    classes: [

        {
            id: "class8",
            name: "Class 8",
            subjects: [
                { id: "science", name: "Science", chapters: [] },
                { id: "math", name: "Mathematics", chapters: [] }
            ]
        },

        {
            id: "class9",
            name: "Class 9",
            subjects: [
                { id: "science", name: "Science", chapters: [] },
                { id: "math", name: "Mathematics", chapters: [] }
            ]
        },

        {
            id: "class10",
            name: "Class 10",
            subjects: [
                { id: "science", name: "Science", chapters: [] },
                { id: "math", name: "Mathematics", chapters: [] }
            ]
        },

        {
            id: "class11",
            name: "Class 11",
            subjects: [
                {
                    id: "biology",
                    name: "Biology",
                    chapters: [
                        { id: "the-living-world", title: "The Living World", available: false },
                        { id: "biological-classification", title: "Biological Classification", available: false },
                        { id: "plant-kingdom", title: "Plant Kingdom", available: false },
                        { id: "animal-kingdom", title: "Animal Kingdom", available: false },
                        { id: "morphology-flowering-plants", title: "Morphology of Flowering Plants", available: false },
                        { id: "anatomy-of-flowering-plants", title: "Anatomy of Flowering Plants", available: false },
                        { id: "structural-organisation-in-animals", title: "Structural Organisation in Animals", available: false },
                        { id: "cell-the-unit-of-life", title: "Cell: The Unit of Life", available: false },
                        { id: "biomolecules", title: "Biomolecules", available: false },
                        { id: "cell-cycle-and-cell-division", title: "Cell Cycle and Cell Division", available: false },
                        { id: "photosynthesis-in-higher-plants", title: "Photosynthesis in Higher Plants", available: false },
                        { id: "respiration-in-plants", title: "Respiration in Plants", available: false },
                        { id: "plant-growth-and-development", title: "Plant Growth and Development", available: false },
                        { id: "breathing-and-exchange-of-gases", title: "Breathing and Exchange of Gases", available: false },
                        { id: "body-fluids-and-circulation", title: "Body Fluids and Circulation", available: false },
                        { id: "excretory-products-and-their-elimination", title: "Excretory Products and their Elimination", available: false },
                        { id: "locomotion-and-movement", title: "Locomotion and Movement", available: false },
                        { id: "neural-control-and-coordination", title: "Neural Control and Coordination", available: false },
                        { id: "chemical-coordination-and-integration", title: "Chemical Coordination and Integration", available: false }
                    ]
                },
                {
                    id: "chemistry",
                    name: "Chemistry",
                    chapters: [
                        { id: "some-basic-concepts-of-chemistry", title: "Some Basic Concepts of Chemistry", available: false },
                        { id: "structure-of-atom", title: "Structure of Atom", available: false },
                        { id: "classification-of-elements-and-periodicity-in-properties", title: "Classification of Elements and Periodicity in Properties", available: false },
                        { id: "chemical-bonding-and-molecular-structure", title: "Chemical Bonding and Molecular Structure", available: false },
                        { id: "thermodynamics", title: "Thermodynamics", available: false },
                        { id: "equilibrium", title: "Equilibrium", available: false },
                        { id: "redox-reactions", title: "Redox Reactions", available: false },
                        { id: "organic-chemistry-some-basic-principles-and-techniques", title: "Organic Chemistry: Some Basic Principles and Techniques", available: false },
                        { id: "hydrocarbons", title: "Hydrocarbons", available: false }
                    ]
                },
                {
                    id: "physics",
                    name: "Physics",
                    chapters: [
                        { id: "units-and-measurements", title: "Units and Measurements", available: false },
                        { id: "motion-in-a-straight-line", title: "Motion in a Straight Line", available: false },
                        { id: "motion-in-a-plane", title: "Motion in a Plane", available: false },
                        { id: "laws-of-motion", title: "Laws of Motion", available: false },
                        { id: "work-energy-and-power", title: "Work, Energy and Power", available: false },
                        { id: "system-of-particles-and-rotational-motion", title: "System of Particles and Rotational Motion", available: false },
                        { id: "gravitation", title: "Gravitation", available: false },
                        { id: "mechanical-properties-of-solids", title: "Mechanical Properties of Solids", available: false },
                        { id: "mechanical-properties-of-fluids", title: "Mechanical Properties of Fluids", available: false },
                        { id: "thermal-properties-of-matter", title: "Thermal Properties of Matter", available: false },
                        { id: "thermodynamics", title: "Thermodynamics", available: false },
                        { id: "kinetic-theory", title: "Kinetic Theory", available: false },
                        { id: "oscillations", title: "Oscillations", available: false },
                        { id: "waves", title: "Waves", available: false }
                    ]
                }
            ]
        },

        {
            id: "class12",
            name: "Class 12",
            subjects: [
                {
                    id: "biology",
                    name: "Biology",
                    chapters: [
                        { id: "sexual-reproduction-in-flowering-plants", title: "Sexual Reproduction in Flowering Plants", available: false },
                        { id: "human-reproduction", title: "Human Reproduction", available: false },
                        { id: "reproductive-health", title: "Reproductive Health", available: false },
                        { id: "principles-of-inheritance-and-variation", title: "Principles of Inheritance and Variation", available: false },
                        { id: "molecular-basis-of-inheritance", title: "Molecular Basis of Inheritance", available: false },
                        { id: "evolution", title: "Evolution", available: false },
                        { id: "human-health-and-disease", title: "Human Health and Disease", available: false },
                        { id: "microbes-in-human-welfare", title: "Microbes in Human Welfare", available: false },
                        { id: "biotechnology-principles-and-processes", title: "Biotechnology: Principles and Processes", available: false },
                        { id: "biotechnology-and-its-applications", title: "Biotechnology and its Applications", available: false },
                        { id: "organisms-and-populations", title: "Organisms and Populations", available: false },
                        { id: "ecosystem", title: "Ecosystem", available: false },
                        { id: "biodiversity-and-conservation", title: "Biodiversity and Conservation", available: false }
                    ]
                },
                {
                    id: "chemistry",
                    name: "Chemistry",
                    chapters: [
                        { id: "solutions", title: "Solutions", available: false },
                        { id: "electrochemistry", title: "Electrochemistry", available: false },
                        { id: "chemical-kinetics", title: "Chemical Kinetics", available: false },
                        { id: "the-d-and-f-block-elements", title: "The d- and f-Block Elements", available: false },
                        { id: "coordination-compounds", title: "Coordination Compounds", available: false },
                        { id: "haloalkanes-and-haloarenes", title: "Haloalkanes and Haloarenes", available: false },
                        { id: "alcohols-phenols-and-ethers", title: "Alcohols, Phenols and Ethers", available: false },
                        { id: "aldehydes-ketones-and-carboxylic-acids", title: "Aldehydes, Ketones and Carboxylic Acids", available: false },
                        { id: "amines", title: "Amines", available: false },
                        { id: "biomolecules", title: "Biomolecules", available: false }
                    ]
                },
                {
                    id: "physics",
                    name: "Physics",
                    chapters: [
                        { id: "electric-charges-and-fields", title: "Electric Charges and Fields", available: false },
                        { id: "electrostatic-potential-and-capacitance", title: "Electrostatic Potential and Capacitance", available: false },
                        { id: "current-electricity", title: "Current Electricity", available: false },
                        { id: "moving-charges-and-magnetism", title: "Moving Charges and Magnetism", available: false },
                        { id: "magnetism-and-matter", title: "Magnetism and Matter", available: false },
                        { id: "electromagnetic-induction", title: "Electromagnetic Induction", available: false },
                        { id: "alternating-current", title: "Alternating Current", available: false },
                        { id: "electromagnetic-waves", title: "Electromagnetic Waves", available: false },
                        { id: "ray-optics-and-optical-instruments", title: "Ray Optics and Optical Instruments", available: false },
                        { id: "wave-optics", title: "Wave Optics", available: false },
                        { id: "dual-nature-of-radiation-and-matter", title: "Dual Nature of Radiation and Matter", available: false },
                        { id: "atoms", title: "Atoms", available: false },
                        { id: "nuclei", title: "Nuclei", available: false },
                        { id: "semiconductor-electronics-materials-devices-and-simple-circuits", title: "Semiconductor Electronics: Materials, Devices and Simple Circuits", available: false }
                    ]
                }
            ]
        }

    ]

};
