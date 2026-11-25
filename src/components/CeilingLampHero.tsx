import { MouseEvent, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HERO_CONTENT, SITE_BRAND } from '../data/content';

type LampStage = 'off' | 'cue' | 'lit';

export function CeilingLampHero() {
  const prefersReducedMotion = useReducedMotion();
  const [lampStage, setLampStage] = useState<LampStage>('off');
  const cueTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (cueTimerRef.current !== null) {
        window.clearTimeout(cueTimerRef.current);
      }
    };
  }, []);

  const handleScreenToggle = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a, button, input, select, textarea')) {
      return;
    }

    if (cueTimerRef.current !== null) {
      window.clearTimeout(cueTimerRef.current);
      cueTimerRef.current = null;
    }

    if (lampStage === 'off') {
      if (prefersReducedMotion) {
        setLampStage('lit');
        return;
      }
      setLampStage('cue');
      cueTimerRef.current = window.setTimeout(() => {
        setLampStage('lit');
        cueTimerRef.current = null;
      }, 360);
    } else {
      setLampStage('off');
    }
  };

  const isCue = lampStage === 'cue' || lampStage === 'lit';
  const isLit = lampStage === 'lit';

  return (
    <section
      id="inicio"
      aria-label="Apresentação principal — clique no ecrã para acender ou apagar a luz"
      onClick={handleScreenToggle}
      className="relative cursor-pointer select-none bg-[#131822] text-white"
    >
      {/* DESKTOP & TABLET FULL-BLEED CINEMATIC HERO (16:9 composition strictly matching reference image) */}
      <div className="relative hidden md:block w-full overflow-hidden bg-[#151921]">
        <div className="relative mx-auto w-full aspect-[1672/941]">
          {/* LAYER 1: Ambient Base Office Scene (Always visible — never black) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              filter: 'brightness(0.42) contrast(0.95) saturate(0.72)',
            }}
          >
            <img
              src={SITE_BRAND.heroPortraitPath}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center pointer-events-none"
            />
          </div>

          {/* LAYER 2: Illuminated Real Scene Revealed from the Ceiling Lamp */}
          <div
            className="absolute inset-0 overflow-hidden transition-opacity duration-[2100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: isLit ? 1 : isCue ? 0.16 : 0,
              maskImage:
                'radial-gradient(ellipse 68% 92% at 52% 6%, #000000 32%, rgba(0,0,0,0.88) 58%, rgba(0,0,0,0.25) 84%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 68% 92% at 52% 6%, #000000 32%, rgba(0,0,0,0.88) 58%, rgba(0,0,0,0.25) 84%, transparent 100%)',
            }}
          >
            <img
              src={SITE_BRAND.heroPortraitPath}
              alt="Eliana Quintas no seu escritório executivo sob o candeeiro de teto."
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover object-center pointer-events-none"
            />
          </div>

          {/* LAYER 3: Real Ceiling Lamp Diffuser State Overlay (38.05% left, 3.15% top) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 rounded-[100%] transition-opacity duration-[1900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: '38.05%',
              width: '24.55%',
              top: '3.15%',
              height: '6.25%',
              opacity: isLit ? 0 : 1,
              background: isCue
                ? 'radial-gradient(ellipse at center, rgba(214,174,106,0.52) 0%, #262932 68%, #171B23 100%)'
                : 'radial-gradient(ellipse at center, #232731 0%, #151921 85%)',
              boxShadow: isCue ? '0 2px 18px rgba(198,164,106,0.30)' : 'none',
            }}
          />

          {/* LAYER 4: Volumetric Warm Downward Light Beam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-[2100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: isLit ? 1 : isCue ? 0.2 : 0,
              background:
                'radial-gradient(ellipse 44% 68% at 50.3% 7%, rgba(252,226,166,0.22) 0%, rgba(214,174,106,0.08) 44%, transparent 76%)',
              mixBlendMode: 'screen',
            }}
          />

          {/* LAYER 5: Tightly Feathered Scrim Strictly on Left Text Zone (0..40.8%) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[2%] top-[17%] bottom-[3%] z-10 w-[39.5%]"
            style={{
              background:
                'radial-gradient(ellipse 92% 90% at 44% 52%, rgba(21, 24, 30, 0.96) 58%, rgba(21, 24, 30, 0.84) 78%, rgba(21, 24, 30, 0) 100%)',
            }}
          />

          {/* LAYER 6: Live Crisp Editorial Copy Locked Inside Left 34% — Zero Overlap on Eliana Quintas */}
          <div className="pointer-events-none absolute inset-0 z-20">
            <div className="pointer-events-auto absolute left-[5.5%] top-[20%] w-[34%] max-w-[500px]">
              <h1
                className="font-editorial font-medium leading-[0.98] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(1.45rem, 3.45vw, 3.85rem)' }}
              >
                <span className="block text-white whitespace-nowrap">
                  {HERO_CONTENT.headlineWhiteLine1}
                </span>
                <span className="block text-white whitespace-nowrap">
                  {HERO_CONTENT.headlineWhiteLine2}
                </span>
                <span className="block text-[#D7B473] whitespace-nowrap">
                  {HERO_CONTENT.headlineGoldLine1}
                </span>
                <span className="block text-[#D7B473] whitespace-nowrap">
                  {HERO_CONTENT.headlineGoldLine2}
                </span>
              </h1>

              <p
                className="mt-3 lg:mt-5 leading-relaxed text-white/88"
                style={{ fontSize: 'clamp(0.75rem, 1.05vw, 1.05rem)' }}
              >
                {HERO_CONTENT.introLine}
              </p>

              <div className="mt-4 lg:mt-7 flex flex-wrap items-center gap-2.5 lg:gap-3.5">
                <a
                  href="#consultoria"
                  className="inline-flex min-h-[36px] lg:min-h-[42px] items-center justify-center rounded-full bg-[#D7B473] px-4 py-1.5 lg:px-6 lg:py-2.5 text-[11px] lg:text-sm font-semibold text-[#101B32] whitespace-nowrap transition-colors duration-200 hover:bg-[#E3C58D]"
                >
                  {HERO_CONTENT.primaryCta}
                </a>

                <a
                  href="#servicos"
                  className="inline-flex min-h-[36px] lg:min-h-[42px] items-center justify-center rounded-full border border-[#D7B473]/55 bg-[#161A22]/55 px-4 py-1.5 lg:px-6 lg:py-2.5 text-[11px] lg:text-sm font-medium text-white whitespace-nowrap transition-colors duration-200 hover:border-[#D7B473] hover:text-[#D7B473]"
                >
                  {HERO_CONTENT.secondaryCta}
                </a>
              </div>
            </div>

            {/* Bottom-Left Scroll Indicator (Strictly inside left zone) */}
            <a
              href="#declaracoes-hero"
              className="pointer-events-auto group absolute left-[5.5%] bottom-[5%] inline-flex items-center gap-2.5 text-xs lg:text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <span className="flex h-7 w-4.5 lg:h-8 lg:w-5 items-start justify-center rounded-full border border-white/55 pt-1.5">
                <span className="h-1.5 w-0.5 rounded-full bg-white/80 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <span>{HERO_CONTENT.scrollCue}</span>
            </a>

            {/* Quiet Bottom-Right Click State Hint */}
            <span className="absolute right-[4%] bottom-[5%] text-[11px] font-medium text-white/55">
              {isLit ? 'Clique no ecrã para apagar a luz' : 'Clique no ecrã para acender a luz'}
            </span>
          </div>
        </div>
      </div>

      {/* MOBILE HERO (< md): Unobstructed Portrait & Ceiling Lamp Above, Seamless Text Extension Below */}
      <div className="md:hidden bg-[#151921]">
        <div className="relative aspect-[100/92] w-full overflow-hidden bg-[#151921]">
          {/* Ambient layer */}
          <div
            className="absolute inset-0"
            style={{ filter: 'brightness(0.42) contrast(0.95) saturate(0.72)' }}
          >
            <img
              src={SITE_BRAND.heroPortraitPath}
              alt=""
              aria-hidden="true"
              referrerPolicy="no-referrer"
              className="absolute top-0 -left-[59.9%] h-full w-auto max-w-none pointer-events-none"
            />
          </div>

          {/* Illuminated layer */}
          <div
            className="absolute inset-0 transition-opacity duration-[2100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: isLit ? 1 : isCue ? 0.16 : 0,
              maskImage:
                'radial-gradient(ellipse 85% 92% at 32% 8%, #000000 38%, rgba(0,0,0,0.85) 66%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 85% 92% at 32% 8%, #000000 38%, rgba(0,0,0,0.85) 66%, transparent 100%)',
            }}
          >
            <img
              src={SITE_BRAND.heroPortraitPath}
              alt="Eliana Quintas no seu escritório executivo sob o candeeiro de teto."
              referrerPolicy="no-referrer"
              className="absolute top-0 -left-[59.9%] h-full w-auto max-w-none pointer-events-none"
            />
          </div>

          {/* Left edge soft blend below lamp to hide any edge of left baked text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[15%] bottom-0 left-0 w-14 bg-gradient-to-r from-[#151921] via-[#151921]/90 to-transparent"
          />

          {/* Mobile lamp diffuser overlay aligned over ceiling lamp */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 rounded-[100%] transition-opacity duration-[1900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              left: '1.0%',
              width: '39.2%',
              top: '3.15%',
              height: '6.25%',
              opacity: isLit ? 0 : 1,
              background: isCue
                ? 'radial-gradient(ellipse at center, rgba(214,174,106,0.52) 0%, #262932 68%, #171B23 100%)'
                : 'radial-gradient(ellipse at center, #232731 0%, #151921 85%)',
            }}
          />

          {/* Bottom soft fade into office tone */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#151921] to-transparent"
          />
        </div>

        {/* Mobile Editorial Copy Cleanly Below Portrait — Zero Face Overlap */}
        <div className="px-5 pt-1 pb-9">
          <h1 className="font-editorial text-[2.2rem] font-medium leading-[1.0] tracking-tight">
            <span className="block text-white">
              {HERO_CONTENT.headlineWhiteLine1} {HERO_CONTENT.headlineWhiteLine2}
            </span>
            <span className="block text-[#D7B473]">
              {HERO_CONTENT.headlineGoldLine1} {HERO_CONTENT.headlineGoldLine2}
            </span>
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-white/85">
            {HERO_CONTENT.introLine}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <a
              href="#consultoria"
              className="inline-flex min-h-[42px] items-center justify-center rounded-full bg-[#D7B473] px-5 py-2 text-xs font-semibold text-[#101B32]"
            >
              {HERO_CONTENT.primaryCta}
            </a>
            <a
              href="#servicos"
              className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#D7B473]/55 px-5 py-2 text-xs font-medium text-white"
            >
              {HERO_CONTENT.secondaryCta}
            </a>
          </div>

          <p className="mt-4 text-[11px] font-medium text-white/55">
            {isLit ? 'Toque no ecrã para apagar a luz' : 'Toque no ecrã para acender a luz'}
          </p>
        </div>
      </div>

      {/* PROGRESSIVE SCROLL STATEMENTS STRIP */}
      <div
        id="declaracoes-hero"
        className="border-t border-white/10 bg-[#101B32] py-10 sm:py-14"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:gap-14 lg:px-8">
          {HERO_CONTENT.statements.map((item, idx) => (
            <motion.div
              key={item.index}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-baseline gap-4 border-b border-white/10 pb-5"
            >
              <span className="text-xs font-semibold tabular-nums text-[#C6A46A] shrink-0">
                {item.index}.
              </span>
              <p
                className="font-editorial text-xl sm:text-2xl font-medium leading-snug text-white/95"
                style={{ textWrap: 'balance' }}
              >
                {item.statement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
