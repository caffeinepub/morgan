import { motion } from "motion/react";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using the Morgan Compensation Program website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services. These terms may be updated periodically; continued use of the platform constitutes acceptance of any revised terms.",
  },
  {
    title: "2. Program Description",
    content:
      'Morgan is an informational and process-guidance platform designed to help individuals understand compensation programs they may be eligible for. Morgan does not provide legal advice, financial advice, or guarantee any specific outcomes. The program is provided on an "as-is" basis for informational purposes only.',
  },
  {
    title: "3. Eligibility",
    content:
      "Use of the Morgan platform is restricted to individuals who are 18 years of age or older and legally capable of entering into binding agreements under applicable law. By registering, you represent that you meet these requirements. Morgan reserves the right to verify eligibility and to terminate access for users who do not meet eligibility criteria.",
  },
  {
    title: "4. User Responsibilities",
    content:
      "You agree to: (a) provide accurate and truthful information during registration and throughout your participation; (b) maintain the confidentiality of your account credentials; (c) not use the platform for any unlawful purpose; (d) not attempt to circumvent security measures or access other users' data; (e) notify Morgan immediately if you become aware of unauthorized use of your account.",
  },
  {
    title: "5. Privacy & Data",
    content:
      "Morgan collects only the minimum personal information necessary to administer the program. We do not collect financial account information, bank details, payment card numbers, or sensitive financial data. We do not sell or share your personal information with third parties for marketing purposes. Data is stored securely and accessed only by authorized personnel for program administration purposes.",
  },
  {
    title: "6. No Fees",
    content:
      "Participation in the Morgan program is and will always be completely free. Morgan will never ask you to make any payment to participate, verify your identity, or receive any benefit under the program. If you are ever solicited for payment by anyone claiming to represent Morgan, please report this immediately to our support team and to the relevant authorities.",
  },
  {
    title: "7. Disclaimers",
    content:
      'MORGAN IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. MORGAN EXPRESSLY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. ALL INFORMATION PROVIDED IS FOR GENERAL INFORMATIONAL PURPOSES ONLY AND SHOULD NOT BE RELIED UPON AS LEGAL OR FINANCIAL ADVICE.',
  },
  {
    title: "8. Limitation of Liability",
    content:
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MORGAN AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUES, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE PLATFORM OR PROGRAM.",
  },
  {
    title: "9. Contact Information",
    content:
      "If you have questions about these Terms & Conditions or the Morgan program, please contact our support team through the Support page. We aim to respond to all inquiries within 1–2 business days.",
  },
];

export function TermsPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground">Last updated: March 2026</p>
      </motion.div>
      <div className="space-y-6">
        {sections.map((sec, i) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="rounded-2xl p-6"
            style={{
              background: "var(--navy-card)",
              border: "1px solid oklch(1 0 0 / 12%)",
            }}
          >
            <h2 className="text-base font-bold text-foreground mb-3">
              {sec.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {sec.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
