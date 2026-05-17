import { CONTACT } from "@/content/portfolio";

export default function CaseStudyContact() {
  return (
    <section
      className="section contact"
      id="contact"
      data-screen-label="07 Contact"
    >
      <div className="section-inner">
        <div className="lander-top reveal">
          <div className="lander-mark">
            adrian<span style={{ color: "var(--accent)" }}>.</span>barn
            <span style={{ color: "var(--accent)" }}>.</span>es
          </div>
          <div className="lander-nav">
            <a href="#intro">↑ Back to top</a>
          </div>
        </div>

        <div className="contact-mid">
          <div className="contact-kicker reveal">{CONTACT.kicker}</div>
          <h2
            className="contact-headline reveal d1"
            dangerouslySetInnerHTML={{ __html: CONTACT.headline }}
          />
          <a
            className="contact-email reveal d2"
            href={`mailto:${CONTACT.email}`}
          >
            {CONTACT.email}
          </a>
        </div>

        <div className="contact-grid reveal d3">
          <a href={`mailto:${CONTACT.email}`}>
            <span className="label">Email</span>
            <span className="value">{CONTACT.email}</span>
          </a>
          <a href={`tel:${CONTACT.phone}`}>
            <span className="label">Phone</span>
            <span className="value">{CONTACT.phoneDisplay}</span>
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
            <span className="label">LinkedIn</span>
            <span className="value">{CONTACT.linkedinHandle}</span>
          </a>
          <div>
            <span className="label">Location</span>
            <span className="value">{CONTACT.location}</span>
          </div>
        </div>

        <div className="colophon">
          <span>© {new Date().getFullYear()} Adrian Barnes</span>
          <span>{CONTACT.colophon}</span>
        </div>
      </div>
    </section>
  );
}
