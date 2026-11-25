import { motion, useReducedMotion } from 'motion/react';
import { SERVICES_CONTENT } from '../data/content';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleRequestClick = (serviceTitle: string) => {
    onSelectService(serviceTitle);
    const target = document.getElementById('consultoria');
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const featuredServices = SERVICES_CONTENT.items.slice(0, 2);
  const additionalServices = SERVICES_CONTENT.items.slice(2);

  return (
    <section
      id="servicos"
      aria-labelledby="services-heading"
      className="bg-white text-[#101B32] py-16 sm:py-24 border-b border-[#E8E6E1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Header with Section Emphasis Strip */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between pb-10 border-b border-[#E8E6E1]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6F36]">
              {SERVICES_CONTENT.kicker}
            </p>
            <h2
              id="services-heading"
              className="font-editorial mt-3 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-tight text-[#101B32]"
              style={{ textWrap: 'balance' }}
            >
              {SERVICES_CONTENT.headline}
            </h2>
          </div>

          <p className="max-w-sm text-sm font-medium text-[#101B32]/72 lg:text-right">
            {SERVICES_CONTENT.emphasisSummary}
          </p>
        </div>

        {/* Row 1: Two Featured Services */}
        <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">
          {featuredServices.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-[#F7F5F0] transition-colors duration-200 hover:border-[#C6A46A]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#101B32]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs font-semibold tabular-nums text-[#8F6F36]">
                      {service.number}
                    </span>
                    <h3 className="font-editorial text-2xl font-semibold text-[#101B32]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#101B32]/78">
                    {service.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#E8E6E1] pt-4">
                  <span className="text-xs font-medium text-[#101B32]/65">{service.detail}</span>
                  <button
                    type="button"
                    onClick={() => handleRequestClick(service.title)}
                    className="inline-flex min-h-[38px] items-center justify-center rounded-md border border-[#101B32]/15 bg-white px-4 py-1.5 text-xs font-semibold text-[#101B32] whitespace-nowrap transition-colors hover:border-[#C6A46A] hover:text-[#8F6F36]"
                  >
                    Solicitar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Row 2: Three Core Services */}
        <div className="mt-7 grid grid-cols-1 gap-7 md:grid-cols-3">
          {additionalServices.map((service, idx) => (
            <motion.article
              key={service.id}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col overflow-hidden rounded-xl border border-[#E8E6E1] bg-white transition-colors duration-200 hover:border-[#C6A46A]"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#101B32]">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs font-semibold tabular-nums text-[#8F6F36]">
                      {service.number}
                    </span>
                    <h3 className="font-editorial text-[1.4rem] font-semibold leading-snug text-[#101B32]">
                      {service.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-[#101B32]/78">
                    {service.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-col gap-3 border-t border-[#E8E6E1] pt-4">
                  <span className="text-xs font-medium text-[#101B32]/65">{service.detail}</span>
                  <button
                    type="button"
                    onClick={() => handleRequestClick(service.title)}
                    className="inline-flex min-h-[38px] items-center justify-center self-start rounded-md border border-[#101B32]/15 bg-[#F7F5F0] px-4 py-1.5 text-xs font-semibold text-[#101B32] whitespace-nowrap transition-colors hover:border-[#C6A46A] hover:text-[#8F6F36]"
                  >
                    Solicitar
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
