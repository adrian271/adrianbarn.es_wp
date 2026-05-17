import { contact } from "@/content/portfolio";

export default function Contact() {
  return (
    <section className="section contact" id="contact" data-screen-label="08 Contact">
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
          <div className="contact-kicker reveal">{contact.kicker}</div>
          <h2
            className="contact-headline reveal d1"
            dangerouslySetInnerHTML={{ __html: contact.headline }}
          />
          <a className="contact-email reveal d2" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>

        <div className="contact-grid reveal d3">
          <a href={`mailto:${contact.email}`}>
            <span className="label">Email</span>
            <span className="value">{contact.email}</span>
          </a>
          <a href={`tel:${contact.phone}`}>
            <span className="label">Phone</span>
            <span className="value">{contact.phoneDisplay}</span>
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            <span className="label">LinkedIn</span>
            <span className="value">{contact.linkedinHandle}</span>
          </a>
          <div>
            <span className="label">Location</span>
            <span className="value">{contact.location}</span>
          </div>
        </div>

        <div className="colophon">
          <span>© {new Date().getFullYear()} Adrian Barnes</span>
          <span>Built with Next.js, TypeScript, and a lot of opinions</span>
        </div>
      </div>
    </section>
  );
}
