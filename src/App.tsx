import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutSection } from './components/AboutSection';
import { CeilingLampHero } from './components/CeilingLampHero';
import { ConsultationSection } from './components/ConsultationSection';
import { ContactFooter } from './components/ContactFooter';
import { ExperienceSection } from './components/ExperienceSection';
import { Navbar } from './components/Navbar';
import { ServicesSection } from './components/ServicesSection';
import { SERVICES_CONTENT } from './data/content';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>(
    SERVICES_CONTENT.items[0].title
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F7F5F0] text-[#101B32]">
        <Navbar />
        <main>
          <CeilingLampHero />
          <AboutSection />
          <ServicesSection onSelectService={setSelectedService} />
          <ExperienceSection />
          <ConsultationSection
            selectedService={selectedService}
            onServiceChange={setSelectedService}
          />
        </main>
        <ContactFooter />
      </div>
    </MotionConfig>
  );
}
