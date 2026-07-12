"use client";

import { cn } from "@/lib/utils";
import { type FormEvent, useState } from "react";

import { RingCtaButton } from "@/components/ring-cta-button";
import {
  buildContactMailtoLink,
  CONTACT_EMAIL,
  CONTACT_SUBJECT_OPTIONS,
  EMPTY_CONTACT_FORM,
  type ContactFormData,
} from "@/lib/contact-content";
import { scrollToSection } from "@/lib/scroll";
import {
  siteFooterFormFieldClass,
  siteFormFieldClass,
  siteFormLabelClass,
  sitePillLinkClass,
} from "@/lib/site-layout";

type ContactFormProps = {
  className?: string;
  variant?: "default" | "footer";
};

export function ContactForm({ className, variant = "default" }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_CONTACT_FORM);
  const [status, setStatus] = useState<"idle" | "opening" | "error">("idle");
  const isFooter = variant === "footer";
  const fieldClass = cn(
    isFooter ? siteFooterFormFieldClass : siteFormFieldClass,
    "py-2.5",
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.subject ||
      !formData.message.trim()
    ) {
      setStatus("error");
      return;
    }

    setStatus("opening");
    window.location.href = buildContactMailtoLink(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-3 sm:space-y-3.5", className)}
      noValidate
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label htmlFor="contact-name" className={siteFormLabelClass}>
            Name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            aria-invalid={status === "error" && !formData.name.trim()}
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label htmlFor="contact-email" className={siteFormLabelClass}>
            Email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            aria-invalid={status === "error" && !formData.email.trim()}
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label htmlFor="contact-company" className={siteFormLabelClass}>
            Company
          </label>
          <p id="contact-company-help" className="sr-only">
            Optional — helps us understand your team.
          </p>
          <input
            type="text"
            id="contact-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            aria-describedby="contact-company-help"
            className={fieldClass}
          />
        </div>
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <label htmlFor="contact-subject" className={siteFormLabelClass}>
            Subject *
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            aria-invalid={status === "error" && !formData.subject}
            className={cn(fieldClass, "appearance-none")}
          >
            {CONTACT_SUBJECT_OPTIONS.map((option) => (
              <option key={option.value || "default"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 sm:gap-2">
        <label htmlFor="contact-message" className={siteFormLabelClass}>
          Message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={3}
          aria-invalid={status === "error" && !formData.message.trim()}
          className={cn(fieldClass, "min-h-[5.5rem] resize-y sm:min-h-24")}
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-brand-accessible" role="alert">
          Fill in name, email, subject, and message before sending.
        </p>
      ) : null}

      {status === "opening" ? (
        <p className="text-sm text-muted-foreground" role="status">
          Opening your email client. If nothing opens, write to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-brand-accessible underline underline-offset-4"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      ) : null}

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
        <RingCtaButton
          type="submit"
          label="Send message"
          aria-label={`Send message to ${CONTACT_EMAIL}`}
        />
        {isFooter ? (
          <button
            type="button"
            className={cn(
              sitePillLinkClass,
              "min-h-11 border-white/10 bg-background/20 px-5 hover:border-white/25",
            )}
            onClick={() => scrollToSection("services")}
          >
            View services
          </button>
        ) : null}
      </div>

      <p className="text-sm text-muted-foreground">
        Or email{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="font-medium text-brand-accessible underline underline-offset-4 transition-opacity hover:opacity-90"
        >
          {CONTACT_EMAIL}
        </a>
      </p>
    </form>
  );
}
