import { tenant } from "@/content/portfolio";

export default function Tenant() {
  return (
    <section className="section tenant" id={tenant.id} data-screen-label="03 Tenant">
      <div className="section-inner">
        <div className="section-meta">
          <span className="role">{tenant.title}</span>
          <span style={{ textAlign: "center", opacity: 0.5 }}>{tenant.role}</span>
          <span>{tenant.years}</span>
        </div>

        <div className="tenant-grid">
          <div className="reveal">
            <h2
              className="headline"
              dangerouslySetInnerHTML={{ __html: tenant.headline }}
            />
            <p
              className="copy"
              dangerouslySetInnerHTML={{ __html: tenant.copy }}
            />
            <ul className="bullets" style={{ marginTop: 24 }}>
              {tenant.bullets?.map((b, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: b }} />
              ))}
            </ul>
            <div className="oracle-tags" style={{ marginTop: 32 }}>
              {tenant.tags?.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>

          <div className="floorplan-embed reveal d2">
            <iframe
              src={tenant.floorplanEmbedUrl}
              title="Property Map Editor demo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
