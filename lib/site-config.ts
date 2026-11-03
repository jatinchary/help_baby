export const siteConfig = {
  siteUrl: "https://help-hania-anam.vercel.app",
  analyticsEndpoint: "",
  seo: {
    title: "Help Hania Anam Fight Leukemia | Support Her Treatment",
    description:
      "Three-year-old Hania has B-Cell Acute Lymphoblastic Leukemia. Her verified Rainbow Children's Hospital report is here. Donate directly to her family via UPI.",
    ogImage: "/photos/hania-og.jpg",
  },
  patient: {
    name: "Baby Hania Anam",
    shortName: "Hania",
    age: "3 years 2 months",
    gender: "Female",
    guardian: "Mr. Mohd Shareef",
    city: "Hyderabad, Telangana, India",
    photo: "/photos/hania.webp",
    avatar: "/photos/hania-avatar.jpg",
    photoAlt:
      "Baby Hania Anam, a three-year-old girl in a pink striped dress, resting on a hospital bed",
  },
  diagnosis: {
    primary: "B-Cell Acute Lymphoblastic Leukemia (B-ALL)",
    short: "B-ALL leukemia",
    details:
      "CALLA-positive, CNS-negative, FISH negative / standard cytogenetics, good prednisolone response",
    stage: "Induction Week 4",
    admissionDate: "30 August 2026",
    dischargeDate: "31 August 2026",
    nextReview: "05 September 2026",
    conditionAtDischarge: "Active, afebrile and hemodynamically stable",
    weightOnAdmission: "14.5 kg",
    procedures: [
      "Bone Marrow Aspiration (sample sent for MRD — report awaited)",
      "Lumbar Puncture with intrathecal chemotherapy",
    ],
    chemotherapy: [
      {
        drug: "Inj. Daunorubicin",
        dose: "12 mg",
        week: "Week 4",
        date: "30-08-2026",
      },
      {
        drug: "Inj. Vincristine",
        dose: "0.8 mg",
        week: "Week 4",
        date: "30-08-2026",
      },
      {
        drug: "Triple Intrathecal Chemotherapy (Methotrexate + Cytarabine + Hydrocortisone)",
        dose: "10 mg + 10 mg + 25 mg",
        week: "Week 3",
        date: "31-08-2026",
      },
    ],
  },
  hospital: {
    name: "Rainbow Children's Hospital",
    branch: "Banjara Hills, Hyderabad",
    tagline: "It takes a lot to treat the little.",
    website: "https://www.rainbowhospitals.in",
    emergencyPhones: ["040-44665555", "040-23551555", "+91-9100925516"],
    tollFree: "1800 2122",
    uhid: "BAH-00662657",
    uhidMasked: "BAH-00****57",
    ipNo: "IP5-00178621",
    ipNoMasked: "IP5-00****21",
    primaryDoctor: {
      name: "Dr. Sirisha Rani",
      qualifications:
        "MD Peds (PGIMER), DNB, MRCPCH (UK), Fellow Ped Hemato-Oncology & BMT (UK)",
      role: "Senior Consultant Haemato-Oncologist / BMT, Head of the Department",
      licenseNo: "40525",
    },
    coConsultants: [
      {
        name: "Dr. Sandhya V.",
        qualifications: "MD (Pediatrics), FNB PHO",
        role: "Consultant Pediatrician & Hemato-Oncologist",
      },
      {
        name: "Dr. Nalla Anuraag Reddy",
        qualifications: "MD (Pediatrics), FIAP PHO",
        role: "Pediatric Blood & Marrow Transplant, Hemato-Oncologist",
      },
    ],
  },
  gallery: [
    {
      src: "/photos/hania.webp",
      alt: "Hania resting on a hospital bed in a pink striped dress, looking towards the camera",
      caption: "Hania during her hospital stay in Hyderabad",
    },
  ],
  report: {
    pdfPath: "/docs/discharge-summary.pdf",
    pageImages: [
      "/docs/page-1.webp",
      "/docs/page-2.webp",
      "/docs/page-3.webp",
      "/docs/page-4.webp",
      "/docs/page-5.webp",
    ],
    pageCount: 5,
    title: "Discharge Summary — Rainbow Children's Hospital",
    disclaimer:
      "This is the authentic, unedited discharge summary from Rainbow Children's Hospital. Shared with the family's consent.",
  },
  donation: {
    upiId: "8142099682@axl",
    upiIdNote:
      "UPI ID decoded directly from the family's official QR code. If your bank app does not recognise it, please call the family before donating.",
    payeeName: "SHAREEF MOHD",
    presets: [500, 1000, 2000, 5000],
    bank: null as
      | null
      | {
          holder: string;
          number: string;
          ifsc: string;
          name: string;
        },
    formEndpoint: "",
  },
  contact: {
    phone: "+918142099682",
    displayPhone: "+91 81420 99682",
    whatsapp: "918142099682",
    whatsappMessage:
      "Hello, I saw Hania's website and would like to support her treatment.",
    email: "",
  },
  story: {
    quote:
      "Hania is a fighter. With the right treatment and a little help from people like you, she can get back to being a happy little girl.",
    paragraphs: [
      "Hania is three years old. In August 2026, after a series of tests at Rainbow Children's Hospital in Hyderabad, her parents were given the news no family is ever prepared for: Hania has B-Cell Acute Lymphoblastic Leukemia (B-ALL). She was admitted on 30 August 2026 to begin chemotherapy.",
      "Hania is currently in Induction Week 4 of her treatment. She has received Daunorubicin and Vincristine, along with triple intrathecal chemotherapy, and her doctors have noted a good response to prednisolone. Her treatment will continue for many months through consolidation and maintenance phases, with regular blood tests, hospital stays and reviews. Every contribution helps cover chemotherapy, hospitalisation, medicines and the family's travel to the hospital.",
      "Hania's parents, Mr. and Mrs. Shareef, are doing everything they can to give her the best possible chance. Your donation — and every share — means they do not have to face this alone. Thank you for helping Hania get back to being a happy, healthy little girl.",
    ],
  },
  timeline: [
    {
      title: "Diagnosis",
      date: "August 2026",
      description:
        "B-Cell Acute Lymphoblastic Leukemia (B-ALL) confirmed at Rainbow Children's Hospital, Hyderabad.",
      status: "complete",
    },
    {
      title: "Induction Chemotherapy",
      date: "Week 4 · current",
      description:
        "Daunorubicin, Vincristine and triple intrathecal chemotherapy. Bone marrow aspiration sent for MRD.",
      status: "current",
    },
    {
      title: "Consolidation",
      date: "Next phase",
      description:
        "Stronger chemotherapy to clear any remaining leukemia cells and reduce the risk of relapse.",
      status: "upcoming",
    },
    {
      title: "Maintenance",
      date: "Long term",
      description:
        "Lower-dose chemotherapy and regular monitoring to keep the leukemia in remission.",
      status: "upcoming",
    },
    {
      title: "Follow-up",
      date: "Ongoing",
      description:
        "Regular OPD reviews, blood tests and long-term monitoring as Hania grows up.",
      status: "upcoming",
    },
  ],
  faqs: [
    {
      question: "Is this real? How can I verify Hania's diagnosis?",
      answer:
        "Yes. Hania is a real three-year-old patient at Rainbow Children's Hospital, Banjara Hills, Hyderabad. Her original discharge summary is published on this site in full — all five pages — along with the treating doctor's name, qualifications and license number. You can also call the hospital on 040-44665555 or 1800 2122 to verify the UHID and IP number shown on the report.",
    },
    {
      question: "Where does my money go?",
      answer:
        "Donations go directly to Hania's father, Mr. Mohd Shareef, through the UPI ID and QR code shown in the Donate section. There is no middleman, platform fee or agency involved. The money is used for her chemotherapy, hospitalisation, medicines, blood tests and travel to the hospital.",
    },
    {
      question: "Can I donate from outside India?",
      answer:
        "The UPI QR code works with Indian bank accounts and UPI apps such as Google Pay, PhonePe, Paytm and BHIM. If you are outside India, please contact the family on WhatsApp to ask about an international transfer option before sending money.",
    },
    {
      question: "How will I know my donation was received?",
      answer:
        "After donating, tap \"I've donated\" and send the family a short WhatsApp message with your name and amount. This helps them thank you personally and keep a record of every contribution.",
    },
    {
      question: "Can I visit Hania?",
      answer:
        "Hania's immune system is very weak during chemotherapy, so visitors are limited for her safety. Please message the family on WhatsApp first — they will let you know if a visit is possible. Calls and messages of support are always welcome.",
    },
    {
      question: "How is the medical report verified?",
      answer:
        "The discharge summary is the original scanned document issued by Rainbow Children's Hospital on 31 August 2026. It carries the hospital's UHID (BAH-00662657), IP number, treating consultant details and the signature of the hospital's registrar. The version on this site is unedited; only the family's home address has been withheld for privacy.",
    },
  ],
  consent:
    "This website shares Hania's medical information with the full consent of her parents, Mr. & Mrs. Shareef, to raise funds for her cancer treatment.",
} as const;

export type SiteConfig = typeof siteConfig;

const inrNumber = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

export function formatInr(amount: number) {
  return `INR ${inrNumber.format(amount)}`;
}
