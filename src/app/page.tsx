import { BeneficiosSection } from '@/components/sections/beneficios-section';
import { CoberturaSection } from '@/components/sections/cobertura-section';
import { ContactoSection } from '@/components/sections/contacto-section';
import { EsenciaSection } from '@/components/sections/esencia-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProtocoloSection } from '@/components/sections/protocolo-section';
import { SobreMiSection } from '@/components/sections/sobre-mi-section';
import { TarifasSection } from '@/components/sections/tarifas-section';

// Una sección por opción del menú, en el mismo orden (ver NAV_LINKS): el
// menú de la home salta a cada una y marca la visible. Cada sección resume y
// enlaza a su página propia.
export default function Home() {
  return (
    <main>
      <HeroSection />
      {/* "Tratamientos" agrupa tres bloques: el scroll-spy observa el
          contenedor, así el menú marca Tratamientos en los tres. */}
      <div id="tratamientos" className="scroll-mt-20">
        <EsenciaSection />
        <BeneficiosSection />
        <ProtocoloSection />
      </div>
      <SobreMiSection />
      <TarifasSection />
      <CoberturaSection />
      <ContactoSection />
    </main>
  );
}
