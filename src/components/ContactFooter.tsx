import { Mail, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT_CONTENT, NAV_LINKS, SITE_BRAND } from '../data/content';

export function ContactFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contactos"
      aria-labelledby="contact-heading"
      className="bg-[#101B32] text-white"
    >
      <div
        aria-hidden="true"
        className="h-px w-full bg-gradient-to-r from-transparent via-[#C6A46A]/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10 sm:pt-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A46A]">
              {CONTACT_CONTENT.kicker}
            </p>
            <h2
              id="contact-heading"
              className="font-editorial mt-3 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              {CONTACT_CONTENT.headline}
            </h2>
            <p className="mt-3 text-sm text-white/70">{CONTACT_CONTENT.emphasisLine}</p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border border-white/12 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A46A]">
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </div>
              <a
                href={`https://wa.me/${CONTACT_CONTENT.whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 block text-sm font-semibold tabular-nums text-white transition-colors hover:text-[#C6A46A]"
              >
                {CONTACT_CONTENT.whatsappDisplay}
              </a>
              <p className="mt-1 text-[11px] text-white/50">{CONTACT_CONTENT.whatsappNote}</p>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A46A]">
                <Mail className="h-3.5 w-3.5" />
                <span>Email</span>
              </div>
              <a
                href={`mailto:${CONTACT_CONTENT.emailDisplay}`}
                className="mt-2.5 block text-sm font-semibold text-white transition-colors hover:text-[#C6A46A] truncate"
                title={CONTACT_CONTENT.emailDisplay}
              >
                {CONTACT_CONTENT.emailDisplay}
              </a>
              <p className="mt-1 text-[11px] text-white/50">{CONTACT_CONTENT.emailNote}</p>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/[0.03] p-4">
              <p className="text-xs font-semibold text-[#C6A46A]">Instagram</p>
              <a
                href={CONTACT_CONTENT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-block text-sm font-semibold text-white transition-colors hover:text-[#C6A46A]"
              >
                {CONTACT_CONTENT.instagramHandle}
              </a>
              <p className="mt-1 text-[11px] text-white/50">Perfil oficial</p>
            </div>

            <div className="rounded-lg border border-white/12 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C6A46A]">
                <MapPin className="h-3.5 w-3.5" />
                <span>Atuação</span>
              </div>
              <p className="mt-2.5 text-sm font-semibold text-white">
                {CONTACT_CONTENT.locationLabel}
              </p>
              <p className="mt-1 text-[11px] text-white/50">Empresas e eventos</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="font-editorial text-xl font-semibold text-white">
              {SITE_BRAND.displayName}
            </span>
          </div>

          <nav aria-label="Navegação do rodapé" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-white/65 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="text-xs tabular-nums text-white/45">
            © {currentYear} {SITE_BRAND.fullName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
