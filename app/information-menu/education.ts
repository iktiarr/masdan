export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  description: string;
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
  type: string;
}

export const educationData: EducationItem[] = [
  {
    institution: "Universitas Trunojoyo Madura",
    degree: "S1 Sistem Informasi",
    year: "2023 - Sekarang",
    description: "Capstone Project: Analisis Sistem Cerdas.",
    link: "https://www2.trunojoyo.ac.id/",
  },
  {
    institution: "SMA Negeri 1 Pademawu",
    degree: "IPA / MIPA",
    year: "2020 - 2023",
    description: "Lulus dengan predikat memuaskan.",
    link: "https://sman1pademawu.sch.id/",
  },
];

export const organizationData: OrgItem[] = [
//   { name: "Himpunan Mahasiswa TI", role: "Divisi Media", year: "2024", link: "#" },
//   { name: "BEM Fakultas", role: "Staff Advokasi", year: "2023", link: "#" },
//   { name: "Komunitas Coding", role: "Member", year: "2023", link: "#" },
  { name: "FPMP - Forum Persatuan Mahasiswa Pamekasan", role: "#", year: "2023 - Sekarang", link: "#" },
  { name: "EECOM - Engineering English Community", role: "#", year: "2023 - Sekarang", link: "#" },
  { name: "Triple - C", role: "#", year: "2025 - Sekarang", link: "#" },
  // ... tambahkan data organisasi lainnya di sini
];

// Masukkan 30 list pengalaman di sini
export const experienceData: ExperienceItem[] = [
  { company: "MDeveloper", role: "Founder", year: "2024-Now", type: "Business" },
  { company: "Program Sumba", role: "Volunteer", year: "Dec 2025", type: "Volunteer" },
  { company: "Freelance Client A", role: "Web Dev", year: "Oct 2025", type: "Freelance" },
  { company: "Lomba UI/UX", role: "Finalis", year: "Sep 2025", type: "Competition" },
  { company: "Bootcamp AI", role: "Peserta", year: "Aug 2025", type: "Course" },
  { company: "Toko Online B", role: "Frontend Dev", year: "Jul 2025", type: "Freelance" },
  { company: "Seminar Nasional", role: "Peserta", year: "Jun 2025", type: "Event" },
  { company: "MDeveloper", role: "Founder", year: "2024-Now", type: "Business" },
  { company: "Program Sumba", role: "Volunteer", year: "Dec 2025", type: "Volunteer" },
  { company: "Freelance Client A", role: "Web Dev", year: "Oct 2025", type: "Freelance" },
  { company: "Lomba UI/UX", role: "Finalis", year: "Sep 2025", type: "Competition" },
  { company: "Bootcamp AI", role: "Peserta", year: "Aug 2025", type: "Course" },
  { company: "Toko Online B", role: "Frontend Dev", year: "Jul 2025", type: "Freelance" },
  { company: "Seminar Nasional", role: "Peserta", year: "Jun 2025", type: "Event" },
  // ... Copy paste sampai 30 item
];