import { Contact } from "@/components/Contact";
import { Diagnosis } from "@/components/Diagnosis";
import { Donate } from "@/components/Donate";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { HospitalTrust } from "@/components/HospitalTrust";
import { MedicalReport } from "@/components/MedicalReport";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Story } from "@/components/Story";

export default function Home() {
  return (
    <>
      <Hero />
      <Story />
      <Diagnosis />
      <HospitalTrust />
      <MedicalReport />
      <PhotoGallery />
      <Donate />
      <Contact />
      <FAQ />
    </>
  );
}
