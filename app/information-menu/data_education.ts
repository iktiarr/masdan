export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  link: string;
}

export interface OrgItem {
  name: string;
  role: string;
  year: string;
  link: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  year: string;
}

export const educationData: EducationItem[] = [
  {
    institution: "Universitas Trunojoyo Madura",
    degree: "S1 Sistem Informasi",
    year: "2023 - Sekarang",
    link: "https://www2.trunojoyo.ac.id/",
  },
  {
    institution: "SMA Negeri 1 Pademawu",
    degree: "IPA / MIPA",
    year: "2020 - 2023",
    link: "https://sman1pademawu.sch.id/",
  },
];

export const organizationData: OrgItem[] = [
  { name: "Osis SMAN 1 Pademawu", role: "Sekretaris", year: "2025 - Sekarang", link: "#" },
  { name: "FPMP - Forum Persatuan Mahasiswa Pamekasan", role: "#", year: "2023 - Sekarang", link: "#" },
  { name: "EECOM - Engineering English Community", role: "#", year: "2023 - Sekarang", link: "#" },
  { name: "Triple - C", role: "#", year: "2025 - Sekarang", link: "#" },
];

// Masukkan 30 list pengalaman di sini
export const experienceData: ExperienceItem[] = [
  { company: "FPMP", role: "Staff Sie Perkap Basic Of Training FPMP 2025", year: "2025"},
  { company: "Gerakan Mengajar Desa", role: "Tutor Inspriratif Generasi Desa", year: "2026"},
  
];