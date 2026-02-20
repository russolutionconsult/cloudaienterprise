import Link from "next/link";

const footerLinks = {
  Company: [
    { href: "/#services", label: "Services" },
    { href: "/#process", label: "Process" },
    { href: "/#about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/#quiz", label: "AI Readiness Quiz" },
    { href: "/#results", label: "Case Studies" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-5">
              <span className="font-bold text-[17px] text-text-primary tracking-tight">
                Cloud<span className="text-accent">AI</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs mb-8">
              We help CEOs and business owners adopt AI strategically — from
              readiness assessments to full implementation.
            </p>
            <p className="text-text-muted text-xs font-mono">
              hello@cloudaienterprise.com
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="md:col-span-2">
              <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted mb-6">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.15em] text-text-muted mb-6">
              Get started
            </h4>
            <p className="text-text-secondary text-sm mb-5 leading-relaxed">
              Not sure where to begin? Take our free 2-minute AI readiness
              assessment.
            </p>
            <Link
              href="/#quiz"
              className="text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Take the Quiz &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            &copy; {new Date().getFullYear()} CloudAI Enterprise. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/contact"
              className="text-text-muted text-xs hover:text-text-secondary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact"
              className="text-text-muted text-xs hover:text-text-secondary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
