import { motion, useReducedMotion } from 'motion/react';
import { ABOUT_CONTENT, SITE_BRAND } from '../data/content';

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="bg-[#F7F5F0] text-[#101B32] py-16 sm:py-22 border-b border-[#E8E6E1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Left Column */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6F36]">
              {ABOUT_CONTENT.kicker}
            </p>
            <h2
              id="about-heading"
              className="font-editorial mt-3 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-tight text-[#101B32]"
              style={{ textWrap: 'balance' }}
            >
              {ABOUT_CONTENT.headline}
            </h2>

            {/* Section Emphasis: Signature Positioning Statement */}
            <div className="mt-7 rounded-lg border border-[#E8E6E1] bg-white p-5">
              <p className="font-editorial text-xl italic font-medium leading-snug text-[#101B32]">
                “{ABOUT_CONTENT.emphasisQuote}”
              </p>
              <p className="mt-2.5 text-xs font-semibold text-[#8F6F36]">
                {SITE_BRAND.fullName} · {SITE_BRAND.roleSummary}
              </p>
            </div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="space-y-4 text-base leading-relaxed text-[#101B32]/82">
              {ABOUT_CONTENT.paragraphs.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-1 gap-6 border-t border-[#E8E6E1] pt-7 sm:grid-cols-3">
              {ABOUT_CONTENT.pillars.map((pillar, idx) => (
                <div key={pillar.title}>
                  <span className="text-xs font-semibold tabular-nums text-[#8F6F36]">
                    0{idx + 1}.
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[#101B32]">{pillar.title}</h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#101B32]/70">{pillar.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
