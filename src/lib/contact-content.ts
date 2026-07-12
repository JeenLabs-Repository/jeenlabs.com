export const CONTACT_EMAIL = "contact@jeenlabs.com";

export const CONTACT_SUBJECT_OPTIONS = [
  { value: "", label: "Select a subject" },
  { value: "General Inquiry", label: "General Inquiry" },
  { value: "Automation Services", label: "Automation Services" },
  { value: "Web Development", label: "Web Development" },
  { value: "Software Development", label: "Software Development" },
  { value: "Partnership", label: "Partnership" },
  { value: "Other", label: "Other" },
] as const;

export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

export const EMPTY_CONTACT_FORM: ContactFormData = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export function buildContactMailtoLink(data: ContactFormData): string {
  const subjectLine = data.subject
    ? `JeenLabs Inquiry: ${data.subject}`
    : "JeenLabs Website Inquiry";

  const emailBody = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    `Subject: ${data.subject}`,
    "",
    "Message:",
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
}
