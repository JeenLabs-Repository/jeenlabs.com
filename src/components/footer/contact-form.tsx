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
  const isFooter = variant === "footer";
  const fieldClass = cn(
    isFooter ? siteFooterFormFieldClass : siteFormFieldClass,
    "py-2",
  );

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = buildContactMailtoLink(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={siteFormLabelClass}>
            Your name *
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={siteFormLabelClass}>
            Your email *
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className={siteFormLabelClass}>
            Company
          </label>
          <input
            type="text"
            id="contact-company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className={siteFormLabelClass}>
            Subject *
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
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

      <div>
        <label htmlFor="contact-message" className={siteFormLabelClass}>
          Your message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={3}
          className={cn(fieldClass, "min-h-20 resize-none")}
        />
      </div>

      <div
        className={cn(
          "flex flex-col gap-3",
          isFooter && "sm:flex-row sm:flex-wrap sm:items-center sm:justify-center",
        )}
      >
        <RingCtaButton
          type="submit"
          label={`Send message to ${CONTACT_EMAIL}`}
          aria-label={`Send message to ${CONTACT_EMAIL}`}
          className={cn(isFooter && "self-center sm:self-center")}
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
    </form>
  );
}
