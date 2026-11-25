import { ChangeEvent, useRef, useState } from 'react';
import { Camera, ImagePlus, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { EXPERIENCE_CONTENT, ExperienceCategory } from '../data/content';

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ExperienceCategory>('Todas');
  const [previewPhotos, setPreviewPhotos] = useState<Record<string, string>>({});
  const fileInputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  const visibleItems =
    activeCategory === 'Todas'
      ? EXPERIENCE_CONTENT.items
      : EXPERIENCE_CONTENT.items.filter((item) => item.category === activeCategory);

  const handlePhotoUpload = (itemId: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const objectUrl = URL.createObjectURL(file);
    setPreviewPhotos((prev) => {
      if (prev[itemId]) {
        URL.revokeObjectURL(prev[itemId]);
      }
      return { ...prev, [itemId]: objectUrl };
    });
  };

  const handleResetPhoto = (itemId: string) => {
    setPreviewPhotos((prev) => {
      if (prev[itemId]) {
        URL.revokeObjectURL(prev[itemId]);
      }
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    const input = fileInputsRef.current[itemId];
    if (input) input.value = '';
  };

  return (
    <section
      id="experiencia"
      aria-labelledby="experience-heading"
      className="bg-[#F7F5F0] text-[#101B32] py-16 sm:py-22 border-b border-[#E8E6E1]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Compact Header & Category Filter */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between pb-8 border-b border-[#E8E6E1]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6F36]">
              {EXPERIENCE_CONTENT.kicker}
            </p>
            <h2
              id="experience-heading"
              className="font-editorial mt-3 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-tight text-[#101B32]"
            >
              {EXPERIENCE_CONTENT.headline}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#101B32]/72">
              {EXPERIENCE_CONTENT.subtitle}
            </p>
          </div>

          <div
            role="group"
            aria-label="Filtrar atividades por área"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-[#E8E6E1] bg-white p-1 self-start lg:self-end"
          >
            {EXPERIENCE_CONTENT.categories.map((category) => {
              const isSelected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isSelected}
                  className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                    isSelected
                      ? 'bg-[#101B32] text-white'
                      : 'text-[#101B32]/72 hover:bg-[#F7F5F0] hover:text-[#101B32]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Emphasis Strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-[#101B32]/65">
          {EXPERIENCE_CONTENT.emphasisModes.map((mode, idx) => (
            <span key={mode} className="inline-flex items-center gap-4">
              <span>{mode}</span>
              {idx < EXPERIENCE_CONTENT.emphasisModes.length - 1 && (
                <span aria-hidden="true" className="text-[#C6A46A]">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Clean Gallery Grid */}
        <div className="mt-8 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {visibleItems.map((item, idx) => {
            const uploadedSrc = previewPhotos[item.id];
            return (
              <motion.article
                key={item.id}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-[#D8D4CA] bg-[#E8E6E1]">
                  {uploadedSrc ? (
                    <>
                      <img
                        src={uploadedSrc}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleResetPhoto(item.id)}
                        className="absolute bottom-2.5 right-2.5 inline-flex min-h-[34px] items-center gap-1.5 rounded-md bg-[#101B32]/85 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-[#101B32]"
                      >
                        <RotateCcw className="h-3 w-3 text-[#C6A46A]" />
                        <span>Repor</span>
                      </button>
                    </>
                  ) : (
                    <div className="relative flex h-full w-full flex-col items-center justify-between p-5 text-center">
                      <span className="self-end text-[11px] font-medium tabular-nums text-[#101B32]/45">
                        0{idx + 1}
                      </span>

                      <div className="flex flex-col items-center">
                        <Camera className="h-5 w-5 text-[#101B32]/45" />
                        <p className="mt-2 text-xs font-medium text-[#101B32]/70">
                          {item.placeholderCaption}
                        </p>
                      </div>

                      <div>
                        <input
                          ref={(el) => {
                            fileInputsRef.current[item.id] = el;
                          }}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handlePhotoUpload(item.id, e)}
                          className="sr-only"
                          id={`upload-${item.id}`}
                        />
                        <label
                          htmlFor={`upload-${item.id}`}
                          className="inline-flex min-h-[34px] cursor-pointer items-center gap-1.5 rounded-md border border-[#101B32]/15 bg-white/85 px-3 py-1 text-xs font-semibold text-[#101B32] transition-colors hover:border-[#C6A46A] hover:bg-white"
                        >
                          <ImagePlus className="h-3.5 w-3.5 text-[#8F6F36]" />
                          <span>Carregar foto</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3.5">
                  <p className="text-xs font-medium text-[#8F6F36]">{item.formatLabel}</p>
                  <h3 className="font-editorial mt-1 text-xl font-semibold text-[#101B32]">
                    {item.title}
                  </h3>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
