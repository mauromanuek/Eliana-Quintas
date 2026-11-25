import { FormEvent, useEffect, useRef, useState } from 'react';
import { AlertCircle, Calendar, CheckCircle2, MessageCircle, RotateCcw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { CONSULTATION_CONTENT, CONTACT_CONTENT, SERVICES_CONTENT } from '../data/content';

interface ConsultationSectionProps {
  selectedService: string;
  onServiceChange: (service: string) => void;
}

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;
type DatePreset = 'today' | 'tomorrow' | 'calendar';

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatReadableDate(iso: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

export function ConsultationSection({
  selectedService,
  onServiceChange,
}: ConsultationSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const now = new Date();
  const todayIso = toLocalIsoDate(now);
  const tomorrowDate = new Date(now);
  tomorrowDate.setDate(now.getDate() + 1);
  const tomorrowIso = toLocalIsoDate(tomorrowDate);

  const [dateMode, setDateMode] = useState<DatePreset>('today');
  const [showCalendarInput, setShowCalendarInput] = useState(false);

  const [values, setValues] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: selectedService || SERVICES_CONTENT.items[0].title,
    preferredDate: todayIso,
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<FormValues | null>(null);

  useEffect(() => {
    if (selectedService) {
      setValues((prev) => ({ ...prev, serviceType: selectedService }));
      setSubmittedSummary(null);
    }
  }, [selectedService]);

  const handleSelectDatePreset = (preset: DatePreset) => {
    setDateMode(preset);
    if (preset === 'today') {
      setShowCalendarInput(false);
      handleFieldChange('preferredDate', todayIso);
    } else if (preset === 'tomorrow') {
      setShowCalendarInput(false);
      handleFieldChange('preferredDate', tomorrowIso);
    } else {
      setShowCalendarInput(true);
      window.setTimeout(() => {
        const input = dateInputRef.current;
        if (!input) return;
        input.focus();
        if (typeof input.showPicker === 'function') {
          try {
            input.showPicker();
          } catch {
            // Fallback: standard visible input below remains interactive
          }
        }
      }, 20);
    }
  };

  const validate = (form: FormValues): FormErrors => {
    const nextErrors: FormErrors = {};

    if (form.fullName.trim().length < 3) {
      nextErrors.fullName = 'Indique o seu nome completo.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = 'Introduza um email válido.';
    }

    const digitsOnly = form.phone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.phone = 'Indique um telefone ou WhatsApp válido.';
    }

    if (!form.serviceType) {
      nextErrors.serviceType = 'Selecione um serviço.';
    }

    if (!form.preferredDate) {
      nextErrors.preferredDate = 'Escolha uma data preferida.';
    } else if (form.preferredDate < todayIso) {
      nextErrors.preferredDate = 'A data não pode ser anterior a hoje.';
    }

    if (form.description.trim().length < 10) {
      nextErrors.description = 'Descreva brevemente o pedido.';
    }

    return nextErrors;
  };

  const handleFieldChange = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (field === 'serviceType') {
      onServiceChange(value);
    }
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmittedSummary({ ...values });
  };

  const handleResetForm = () => {
    setSubmittedSummary(null);
    setDateMode('today');
    setShowCalendarInput(false);
    setValues({
      fullName: '',
      email: '',
      phone: '',
      serviceType: selectedService || SERVICES_CONTENT.items[0].title,
      preferredDate: todayIso,
      description: '',
    });
    setErrors({});
  };

  const buildWhatsAppHref = (summary: FormValues) => {
    const dateLabel =
      summary.preferredDate === todayIso
        ? `Hoje (${formatReadableDate(summary.preferredDate)})`
        : summary.preferredDate === tomorrowIso
          ? `Amanhã (${formatReadableDate(summary.preferredDate)})`
          : formatReadableDate(summary.preferredDate);

    const message = [
      'Olá Eliana Quintas, gostaria de solicitar uma consultoria:',
      '',
      `*Nome:* ${summary.fullName.trim()}`,
      `*Email:* ${summary.email.trim()}`,
      `*Telefone / WhatsApp:* ${summary.phone.trim()}`,
      `*Serviço:* ${summary.serviceType}`,
      `*Data preferida:* ${dateLabel}`,
      `*Descrição:* ${summary.description.trim()}`,
    ].join('\n');

    return `https://wa.me/${CONTACT_CONTENT.whatsappDigits}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section
      id="consultoria"
      aria-labelledby="consultation-heading"
      className="bg-white text-[#101B32] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6F36]">
              {CONSULTATION_CONTENT.kicker}
            </p>
            <h2
              id="consultation-heading"
              className="font-editorial mt-3 text-3xl sm:text-4xl font-semibold leading-[1.12] tracking-tight text-[#101B32]"
              style={{ textWrap: 'balance' }}
            >
              {CONSULTATION_CONTENT.headline}
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#101B32]/75">
              {CONSULTATION_CONTENT.description}
            </p>

            {/* Section Emphasis: 3-step consultation orientation */}
            <div className="mt-7 space-y-2.5 border-t border-[#E8E6E1] pt-5">
              {CONSULTATION_CONTENT.steps.map((step) => (
                <p key={step} className="text-xs font-semibold tabular-nums text-[#101B32]/78">
                  {step}
                </p>
              ))}
            </div>

            <p className="mt-6 text-xs leading-relaxed text-[#101B32]/55">
              {CONSULTATION_CONTENT.demoNotice}
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="rounded-xl border border-[#E8E6E1] bg-[#F7F5F0] p-6 sm:p-9">
              {submittedSummary ? (
                <div role="status" aria-live="polite" className="space-y-6">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#101B32] text-[#C6A46A]">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-2xl font-semibold text-[#101B32]">
                        Pedido preparado para envio
                      </h3>
                      <p className="mt-1 text-sm text-[#101B32]/72">
                        Confira os dados abaixo e clique em Enviar no WhatsApp para concluir o contacto.
                      </p>
                    </div>
                  </div>

                  <dl className="divide-y divide-[#E8E6E1] rounded-lg border border-[#E8E6E1] bg-white px-5 py-1 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-3">
                      <dt className="text-[#101B32]/65">Nome</dt>
                      <dd className="font-semibold text-[#101B32] sm:col-span-2">
                        {submittedSummary.fullName}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-3">
                      <dt className="text-[#101B32]/65">Email / Telefone</dt>
                      <dd className="tabular-nums text-[#101B32] sm:col-span-2">
                        {submittedSummary.email} · {submittedSummary.phone}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-3">
                      <dt className="text-[#101B32]/65">Serviço / Data</dt>
                      <dd className="tabular-nums font-medium text-[#8F6F36] sm:col-span-2">
                        {submittedSummary.serviceType} · {formatReadableDate(submittedSummary.preferredDate)}
                      </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-2.5 sm:grid-cols-3">
                      <dt className="text-[#101B32]/65">Descrição</dt>
                      <dd className="text-[#101B32]/82 sm:col-span-2">
                        {submittedSummary.description}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3.5">
                    <a
                      href={buildWhatsAppHref(submittedSummary)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2.5 rounded-md bg-[#101B32] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B2C4F]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#C6A46A]" />
                      <span>Enviar no WhatsApp ({CONTACT_CONTENT.whatsappDisplay})</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[#101B32]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#101B32] transition-colors hover:border-[#C6A46A]"
                    >
                      <RotateCcw className="h-4 w-4 text-[#8F6F36]" />
                      <span>Editar dados</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="consultation-name"
                        className="block text-xs font-semibold uppercase tracking-wide text-[#101B32]/80"
                      >
                        Nome completo
                      </label>
                      <input
                        id="consultation-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={values.fullName}
                        onChange={(e) => handleFieldChange('fullName', e.target.value)}
                        placeholder="Ex.: Mariana Ferreira"
                        aria-invalid={Boolean(errors.fullName)}
                        className={`mt-1.5 w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#101B32] placeholder:text-[#101B32]/40 focus:border-[#101B32] focus:outline-none ${
                          errors.fullName ? 'border-red-700' : 'border-[#D8D4CA]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="consultation-email"
                        className="block text-xs font-semibold uppercase tracking-wide text-[#101B32]/80"
                      >
                        Email
                      </label>
                      <input
                        id="consultation-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        placeholder="nome@empresa.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`mt-1.5 w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#101B32] placeholder:text-[#101B32]/40 focus:border-[#101B32] focus:outline-none ${
                          errors.email ? 'border-red-700' : 'border-[#D8D4CA]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="consultation-phone"
                        className="block text-xs font-semibold uppercase tracking-wide text-[#101B32]/80"
                      >
                        Telefone / WhatsApp
                      </label>
                      <input
                        id="consultation-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                        placeholder="+244 9XX XXX XXX"
                        aria-invalid={Boolean(errors.phone)}
                        className={`mt-1.5 w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#101B32] placeholder:text-[#101B32]/40 focus:border-[#101B32] focus:outline-none ${
                          errors.phone ? 'border-red-700' : 'border-[#D8D4CA]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="consultation-service"
                        className="block text-xs font-semibold uppercase tracking-wide text-[#101B32]/80"
                      >
                        Tipo de serviço
                      </label>
                      <select
                        id="consultation-service"
                        name="serviceType"
                        value={values.serviceType}
                        onChange={(e) => handleFieldChange('serviceType', e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-[#D8D4CA] bg-white px-4 py-2.5 text-sm text-[#101B32] focus:border-[#101B32] focus:outline-none"
                      >
                        {SERVICES_CONTENT.items.map((service) => (
                          <option key={service.id} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Scheduling Options: Hoje, Amanhã, Ver calendário */}
                    <div className="sm:col-span-2">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-[#101B32]/80">
                        Agendamento
                      </span>

                      <div
                        role="group"
                        aria-label="Opções de agendamento"
                        className="mt-1.5 grid grid-cols-3 gap-2.5"
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectDatePreset('today')}
                          aria-pressed={dateMode === 'today'}
                          className={`min-h-[42px] rounded-md border px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                            dateMode === 'today'
                              ? 'border-[#101B32] bg-[#101B32] text-white'
                              : 'border-[#D8D4CA] bg-white text-[#101B32] hover:border-[#C6A46A]'
                          }`}
                        >
                          Hoje
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectDatePreset('tomorrow')}
                          aria-pressed={dateMode === 'tomorrow'}
                          className={`min-h-[42px] rounded-md border px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                            dateMode === 'tomorrow'
                              ? 'border-[#101B32] bg-[#101B32] text-white'
                              : 'border-[#D8D4CA] bg-white text-[#101B32] hover:border-[#C6A46A]'
                          }`}
                        >
                          Amanhã
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectDatePreset('calendar')}
                          aria-pressed={dateMode === 'calendar'}
                          className={`inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                            dateMode === 'calendar'
                              ? 'border-[#101B32] bg-[#101B32] text-white'
                              : 'border-[#D8D4CA] bg-white text-[#101B32] hover:border-[#C6A46A]'
                          }`}
                        >
                          <Calendar className="h-3.5 w-3.5 text-[#C6A46A]" />
                          <span>Ver calendário</span>
                        </button>
                      </div>

                      {showCalendarInput && (
                        <div className="mt-2.5">
                          <label htmlFor="consultation-date" className="sr-only">
                            Escolher data no calendário
                          </label>
                          <input
                            ref={dateInputRef}
                            id="consultation-date"
                            name="preferredDate"
                            type="date"
                            min={todayIso}
                            value={values.preferredDate}
                            onChange={(e) => handleFieldChange('preferredDate', e.target.value)}
                            aria-invalid={Boolean(errors.preferredDate)}
                            className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm tabular-nums text-[#101B32] focus:border-[#101B32] focus:outline-none ${
                              errors.preferredDate ? 'border-red-700' : 'border-[#D8D4CA]'
                            }`}
                          />
                        </div>
                      )}

                      <p className="mt-1.5 text-xs font-medium tabular-nums text-[#101B32]/65">
                        Data selecionada: {formatReadableDate(values.preferredDate)}
                      </p>

                      {errors.preferredDate && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.preferredDate}</span>
                        </p>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="consultation-description"
                        className="block text-xs font-semibold uppercase tracking-wide text-[#101B32]/80"
                      >
                        Breve descrição do pedido
                      </label>
                      <textarea
                        id="consultation-description"
                        name="description"
                        rows={3}
                        value={values.description}
                        onChange={(e) => handleFieldChange('description', e.target.value)}
                        placeholder="Indique em poucas linhas o objetivo do contacto."
                        aria-invalid={Boolean(errors.description)}
                        className={`mt-1.5 w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#101B32] placeholder:text-[#101B32]/40 focus:border-[#101B32] focus:outline-none ${
                          errors.description ? 'border-red-700' : 'border-[#D8D4CA]'
                        }`}
                      />
                      {errors.description && (
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-red-700">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{errors.description}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center rounded-md bg-[#101B32] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1B2C4F]"
                    >
                      Preparar pedido para WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
