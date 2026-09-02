import { EventItem, TeamMember, Artwork, GazetteArticle, DonationTier } from '../types';

export const KSHESTRA_MANIFESTO = {
  eyebrow: "FOR THE ARTIST BY THE ARTIST",
  title: "The Kshestra Manifesto",
  ourBelief: "Creativity is not a luxury — It is the oxygen of a free, liberal, and progressive society. No artist should be silenced by money, fear, or lack of opportunity, and we act as a guiding spirit for them.",
  introductoryStatement: "Creativity is not a luxury — It is the oxygen of a free, liberal, and progressive society. No artist should be silenced by money, fear, or lack of opportunity, and we act as a guiding spirit for them.",
  principles: [
    {
      num: "01",
      title: "We Create Relentlessly",
      statement: "Art is not decoration, it’s expression, rebellion, and truth.",
      tangibleMechanism: "Free access to shared video/audio production gear, studio spaces, and subsidized materials so creators never stop producing."
    },
    {
      num: "02",
      title: "We Share Knowledge Freely",
      statement: "Gatekeeping kills creativity. If we know it, we teach it.",
      tangibleMechanism: "Zero-cost, artist-led technical masterclasses on AI workflows, sound engineering, lighting, and distribution."
    },
    {
      num: "03",
      title: "We Leave Ego at the Door",
      statement: "This is a society, not a competition. Collaboration > hierarchy.",
      tangibleMechanism: "Cross-discipline mixers and rapid-crew assembly tables pairing directors, writers, editors, and painters without bureaucratic friction."
    },
    {
      num: "04",
      title: "We Celebrate the Unfinished",
      statement: "Every sketch, draft, demo, or beat is welcome. Perfection is not required.",
      tangibleMechanism: "Regular 'Draft & Demo' open mics and critique circles where raw, evolving ideas receive constructive feedback in a safe space."
    },
    {
      num: "05",
      title: "We Uplift the Marginalized",
      statement: "If you have privilege, you share it. If you have access, you open doors.",
      tangibleMechanism: "Dedicated residency quotas and travel/living micro-stipends specifically reserved for underrepresented and grassroots creators."
    },
    {
      num: "06",
      title: "We Protect Expression",
      statement: "No censorship, no judgment — unless it spreads hate or violence.",
      tangibleMechanism: "Independent editorial control and open curation slots free from corporate sponsors or institutional interference."
    },
    {
      num: "07",
      title: "We Support Each Other",
      statement: "Emotionally, professionally, and financially when we can.",
      tangibleMechanism: "Emergency artist relief micro-grants, legal contract review support, and mental health check-ins for active residents."
    },
    {
      num: "08",
      title: "We Make Art for Society",
      statement: "Creativity is not selfish — it shapes culture, sparks freedom, and drives change.",
      tangibleMechanism: "Public art interventions, open-air cultural confluences, and community-driven storytelling projects addressing real local issues."
    },
    {
      num: "09",
      title: "We Keep It Transparent",
      statement: "No shady dealings. No favouritism. What we do and how we fund it is open.",
      tangibleMechanism: "Published quarterly fund allocations, open residency selection rubrics, and direct accountability to the artistic collective."
    },
    {
      num: "10",
      title: "We Pass It Forward",
      statement: "Every generation of artists empowers the next. That’s how the movement survives.",
      tangibleMechanism: "Mandatory alumni mentorship hours and direct pathways for experienced creators to teach incoming cohorts."
    }
  ],
  ourPromise: [
    "Your art will always have a platform.",
    "Your journey will always have guidance.",
    "Your circumstances will never define your access.",
    "And your work will always be met with dignity."
  ],
  movementBadge: {
    mantra: "Create. Share. Rebel. Uplift. Repeat.",
    declaration: "This is not just a trust — it's a movement.",
    pillars: ["Belong", "Create", "Liberate"]
  },
  closingCallout: "This is not just a trust — it's a movement. Create. Share. Rebel. Uplift. Repeat."
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "evt-kshestra-01",
    title: "Words Unspoken: An Open-Air Acoustic Confluence",
    date: "Saturday, October 10 · 6:30 PM IST",
    isoDate: "2026-10-10",
    time: "6:30 PM IST",
    venue: "The Courtyard Amphitheatre · South Kolkata",
    city: "South Kolkata",
    price: 199,
    category: "Live Performance & Acoustic Poetry",
    capacity: 120,
    availableTickets: 38,
    description: "An unplugged evening of raw spoken word, classical sarod/flute instrumentation, and unreleased regional songwriting under the twilight sky.",
    curatorNotes: "Lake Gardens Cultural Sanctum, South Kolkata. Nearest Metro: Rabindra Sarobar.",
    featuredArtists: ["Regional Acoustic Songwriters", "Classical Sarod Ensembles", "Spoken Word Collectives"],
    coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Live Performance & Acoustic Poetry", "Lake Gardens", "Community Entry · ₹199", "Acoustic Sarod & Flute"]
  },
  {
    id: "evt-kshestra-02",
    title: "The Augmented Canvas: Creative Tech Workflows for Visual Artists",
    date: "Sunday, October 18 · 4:00 PM IST",
    isoDate: "2026-10-18",
    time: "4:00 PM IST",
    venue: "Interactive Production Lab · Tollygunge Studio Floor, Kolkata",
    city: "Kolkata",
    price: 0,
    category: "Masterclass & Creative Technology",
    capacity: 150,
    availableTickets: 64,
    description: "A practical workshop led by working digital artists on deploying creative tools for early conceptual ideation, storyboarding, and rapid palette exploration without compromising your signature brushwork.",
    curatorNotes: "Free Registration (Trust Supported) / Optional ₹100 Patron Donation. Access link and studio screening pass emailed upon RSVP.",
    featuredArtists: ["Digital Conceptual Illustrators", "Storyboarding Designers", "Traditional Painters"],
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    tags: ["Masterclass & Creative Technology", "Tollygunge Sanctum", "Free / ₹100 Donation", "Digital Workflows"]
  },
  {
    id: "evt-kshestra-03",
    title: "The 48-Hour Crew Confluence: Directors Meet Editors",
    date: "Friday, October 23 · 5:00 PM IST",
    isoDate: "2026-10-23",
    time: "5:00 PM IST",
    venue: "Studio Floor · Tollygunge Studio District, Kolkata",
    city: "Tollygunge, Kolkata",
    price: 149,
    category: "Filmmaking & Matchmaking Lab",
    capacity: 75,
    availableTickets: 21,
    description: "Stop scouring forums. Sit down face-to-face with scriptwriters, actors, sound designers, and post-production artists ready to collaborate on our upcoming seasonal short-film cycle.",
    curatorNotes: "Floor 2, Kshestra Tolly Sanctum. Bring your scripts, showreels, and rough cuts.",
    featuredArtists: ["Indie Directors", "Film Editors", "Sound Designers", "Screenwriters"],
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
    tags: ["Filmmaking & Matchmaking Lab", "Tollygunge Studio", "General Pass · ₹149", "Crew Matchmaking"]
  }
];

export const INITIAL_GALLERY_ITEMS: Artwork[] = [
  {
    id: "gal-01",
    title: "Echoes of the Soil",
    artist: "Monsoon Confluence Ensemble",
    year: "2026",
    medium: "Live Acoustic & Ambient Soundscape",
    dimensions: "South Kolkata Courtyard",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    description: "Traditional folk instrumentalists in communion with modern ambient synthesizers at the Monsoon Confluence.",
    provenance: "Gathering #04 · Performing Arts · Kolkata Courtyard",
    category: "Performing Arts",
    patronageStatus: "Permanent Collection"
  },
  {
    id: "gal-02",
    title: "Before the First Take",
    artist: "48-Hour Indie Film Collective",
    year: "2026",
    medium: "Cinematography & Scene Blocking",
    dimensions: "Tollygunge Studio Sanctum",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
    description: "Directors and camera operators refining scene blocking during the 48-Hour Indie Film Lab.",
    provenance: "Production Workshop #02 · Cinema · Tollygunge Studio Floor",
    category: "Cinema",
    patronageStatus: "Archived"
  },
  {
    id: "gal-03",
    title: "Unfinished Terracottas",
    artist: "Grassroots Artisans Collective",
    year: "2026",
    medium: "Hand-molded Clay & Experimental Ceramic",
    dimensions: "Sanctum Gallery Display",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=80",
    description: "Fine art residency exhibition showcasing experimental ceramic and canvas work by grassroots artisans.",
    provenance: "Residency Cycle Autumn · Visual Arts · Sanctum Gallery",
    category: "Visual Arts",
    patronageStatus: "Seeking Patronage",
    patronageAmount: 25000
  },
  {
    id: "gal-04",
    title: "The Circle of Voices",
    artist: "Writers & Dramatists Circle",
    year: "2026",
    medium: "Manuscript Reading & Spoken Word",
    dimensions: "Open Amphitheatre Sanctum",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80",
    description: "Poets and dramatists sharing original manuscripts under lantern light before open critique.",
    provenance: "Confluence #07 · Literature & Theatre · Open Amphitheatre",
    category: "Literature & Theatre",
    patronageStatus: "Permanent Collection"
  }
];

export const INITIAL_GUARDIANS: TeamMember[] = [
  {
    id: "guard-01",
    name: "Tamohan",
    role: "Founder & Chief Visionary",
    bio: "A cultural strategist and filmmaker committed to dismantling gatekept networks. Tamohan conceived Kshestra as a direct response to the systemic isolation faced by grassroots creators, establishing physical art sanctuaries with shared production resources in Kolkata.",
    fullBio: "Tamohan has championed decentralized cultural spaces across South Asia. His focus centers on eliminating the middleman between independent makers and real production resources.",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    medium: "Filmmaking, Cultural Strategy, Sanctum Architecture",
    quote: "Art is not a luxury, an afterthought, or an idle hobby. It is the fundamental architecture of human conscience."
  },
  {
    id: "guard-02",
    name: "Oindrila",
    role: "Chairperson & Cultural Curator",
    bio: "An artist and creative director dedicated to preserving indigenous art forms while encouraging avant-garde experimentation. Oindrila steers the trust's cultural ethos, exhibition curations, and community residency initiatives.",
    fullBio: "Oindrila coordinates our regional research circles, indigenous pigment labs, and seasonal open-air exhibitions.",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    medium: "Curatorial Direction, Visual Arts & Living Archives",
    quote: "We preserve indigenous memory not by locking it in glass cabinets, but by placing it in the hands of hungry young creators."
  },
  {
    id: "guard-03",
    name: "Nayanika",
    role: "Vice Chairperson & Community Director",
    bio: "Writer and creative organizer specializing in cross-disciplinary initiatives. Nayanika leads Kshestra's regional outreach, member growth, and strategic community alliances across India.",
    fullBio: "Nayanika designs our cross-discipline matchmaking circles and manages relationships with regional artist guilds.",
    portrait: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    medium: "Literature, Community Organizing, Creative Outreach",
    quote: "Great art is born in communion. When we tear down isolation, the creative impulse becomes unstoppable."
  },
  {
    id: "guard-04",
    name: "Shubhadeep",
    role: "General Secretary & Systems Architect",
    bio: "Technology consultant and media archivist. Shubhadeep manages the trust’s digital governance, community infrastructure, and technical platforms that keep our open directories functional and secure.",
    fullBio: "Shubhadeep builds open-source digital infrastructure for decentralized archiving and zero-fee artist discovery.",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    medium: "Digital Governance, Media Archiving, Open Platforms",
    quote: "Technology is a tool of liberation. We build systems that automate the tedium so artists can stay in flow."
  },
  {
    id: "guard-05",
    name: "Vireshwar",
    role: "Treasurer & Financial Custodian",
    bio: "Financial advisor and arts advocate. Vireshwar oversees the allocation of public donations, micro-grants, and institutional audits to guarantee that every rupee raised directly empowers resident artists.",
    fullBio: "Vireshwar enforces strict 100% transparent fiscal oversight, micro-stipend disbursements, and trust compliance.",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    medium: "Fiscal Stewardship, Non-Profit Governance, Micro-Grants",
    quote: "Dignity in craft begins with economic stability. Every contribution is accounted for down to the last rupee."
  },
  {
    id: "guard-06",
    name: "Aryan",
    role: "Head of Artist Relations & Talent Liaison",
    bio: "Actor and community coordinator. Aryan acts as the personal bridge between aspiring creators, workshop mentors, and incoming studio scouts, ensuring no new talent gets lost in the crowd.",
    fullBio: "Aryan runs the weekly matchmaking circles and rapid-crew assembly tables at the Kolkata sanctum.",
    portrait: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    medium: "Theatre Arts, Talent Coordination, Mentorship Liaison",
    quote: "No passionate creator should ever have to stand outside the door wondering if their voice belongs."
  },
  {
    id: "guard-07",
    name: "Sayan",
    role: "Design Lead & Head of Visual Identity",
    bio: "Multidisciplinary brand designer and founder of design agency Saypollo. Sayan architects Kshestra’s visual systems, spatial design touchpoints, and creative identity, ensuring every medium honors the collective's raw, uncompromising aesthetic.",
    fullBio: "Sayan oversees all visual languages, typography pairings, physical sanctum spatial signage, and printed dispatches.",
    portrait: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
    medium: "Brand Systems, Typography, Spatial Design & Saypollo",
    quote: "Aesthetics are not superficial decoration; they are the physical manifestation of our collective soul."
  }
];

export const INITIAL_DISPATCHES: GazetteArticle[] = [
  {
    id: "dsp-01",
    title: "Why We Must Dismantle the Myth of the \"Starving Genius\"",
    author: "The Kshestra Editorial Desk",
    authorRole: "Editorial Collective",
    date: "Autumn Dispatches · 2026",
    readTime: "4 Min Read",
    issueNumber: "Dispatch #01",
    category: "Cultural Commentary",
    excerpt: "Romanticizing an artist's struggle is a convenient way for exploitative systems to avoid paying fair compensation. Here is why dignity in craft must begin with economic stability and collective ownership.",
    content: [
      "For centuries, romantic mythology has told us that suffering produces genius—that an artist must be hungry, isolated, and desperate to create profound work. This is not romantic; it is an extractive lie.",
      "Romanticizing struggle allows gatekeepers, corporate middlemen, and exploitative platforms to demand free labor under the guise of 'exposure'. When an artist is forced to scramble for survival, their mental space is stolen from their craft.",
      "At Kshestra, we believe creation is survival. Sustaining the maker through free studio tools, emergency micro-grants, and fair compensation is not charity—it is basic infrastructure for human culture.",
      "When we remove economic desperation, artists do not become lazy; they become fearless."
    ],
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80",
    tags: ["Cultural Commentary", "Economic Dignity", "Collective Ownership"]
  },
  {
    id: "dsp-02",
    title: "Notes from the Editing Suite: The Rhythm of Regional Cinema",
    author: "Resident Editor",
    authorRole: "Kshestra Cinema Lab",
    date: "Field Journal · 2026",
    readTime: "6 Min Read",
    issueNumber: "Dispatch #02",
    category: "Craft & Production Lab",
    excerpt: "Pacing isn't just a technical choice; it is a cultural pulse. How independent editors are reimagining traditional narrative structures for modern international film circuits.",
    content: [
      "Cinema from South Asia does not breathe at the hyper-compressed rhythm of Western three-act blockbusters. Our sense of time is rooted in seasonal monsoons, river tides, and slow evening twilights.",
      "In the editing suite at Kshestra Tolly Sanctum, we work with young directors to explore how lingering on an empty courtyard or holding a cut on an actor's unsaid word carries profound emotional gravity.",
      "By mastering modern non-linear editing software and color grading pipelines while honoring regional cadence, independent creators are crafting cinema that is simultaneously authentic and world-class."
    ],
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80",
    tags: ["Craft & Production Lab", "Cinema Pacing", "Regional Narratives"]
  },
  {
    id: "dsp-03",
    title: "Can an Algorithm Understand Soul? A Painter’s Honest Take on AI",
    author: "Fine Arts Resident",
    authorRole: "Kshestra Studio Residency",
    date: "Studio Dispatch · 2026",
    readTime: "5 Min Read",
    issueNumber: "Dispatch #03",
    category: "Modern Toolsets",
    excerpt: "Moving past fear and sensationalism: how using generative software as a digital sketchpad helped me paint faster without diluting my intent or brushstroke integrity.",
    content: [
      "When generative image models first surged, the immediate reaction was terror. Would brushes become obsolete? Would our years of anatomical study and pigment chemistry be reduced to a prompt?",
      "After three months of hands-on experimentation in Kshestra's creative technology lab, my perspective changed completely. The algorithm does not have intent, heartache, or memories of wet clay.",
      "What it does have is rapid ideation speed. Using generative sketches for lighting studies and color palette explorations saved me twenty hours of tedious prep work, allowing me to spend all my physical energy in front of the actual canvas.",
      "Technology is our tool of liberation, never replacement. We master new mediums to amplify human expression, never to sell our soul."
    ],
    coverImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80",
    tags: ["Modern Toolsets", "Painter's Perspective", "Creative Technology"]
  }
];

export const INITIAL_DONATION_TIERS: DonationTier[] = [
  {
    id: "tier-ember",
    name: "Kindle the Flame",
    amount: 500,
    description: "Provides basic raw art supplies (canvases, gouache, clay, microphone cables) for one resident student.",
    benefits: [
      "Name acknowledged in Digital Benefactors Registry",
      "Bi-weekly Dispatches & Field Journals",
      "Immediate 80G Tax Exemption Receipt"
    ]
  },
  {
    id: "tier-studio",
    name: "Sanctum Studio Patron",
    amount: 2500,
    description: "Funds 50 hours of free rehearsal space, audio recording gear, and workshop materials for grassroots creators.",
    benefits: [
      "All previous benefits",
      "VIP Invitation to all intimate Gathering previews",
      "Exclusive seasonal printed Dispatch booklet by Saypollo",
      "Direct meet-and-greet with resident fellowship artists"
    ],
    highlight: true
  },
  {
    id: "tier-fellowship",
    name: "Creator Fellowship Guardian",
    amount: 10000,
    description: "Funds an entire 3-month living stipend and production budget for an emerging independent creator.",
    benefits: [
      "All previous benefits",
      "Dedicated patron credit on one completed indie film/exhibition",
      "Permanent engraved plaque at Kolkata Sanctum",
      "Private annual dinner with Trustees & Guardians"
    ]
  }
];
