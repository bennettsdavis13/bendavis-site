import { getContent } from '@/lib/content';
import Reveal from './Reveal';
import Short from './Short';
import EmailButton from './EmailButton';
import ZoomImg from './ZoomImg';

export default async function TabPage({ pageKey }) {
  const c = await getContent();
  const p = c.pages[pageKey];
  return (
    <>
      <section className="block tab-hero">
        <div className="wrap tab-hero-grid">
          <div className="tab-hero-copy">
            <div className="eyebrow">{p.eyebrow}</div>
            <h1 className="display"><span>{p.title}</span></h1>
            <p className="lead">{p.intro}</p>
            <div className="hero-actions">
              <EmailButton email={c.site.email} subject={`${p.title} inquiry`} className="btn btn-primary" label={p.ctaLabel || 'Book me'} />
              <a href={c.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost">Instagram</a>
            </div>
          </div>
          {p.videoId ? (
            <div className="tab-hero-video">
              <Short id={p.videoId} title={`${p.title} — Ben Davis`} />
              <span className="vcap"><b>▶</b> {p.videoCaption}</span>
            </div>
          ) : null}
        </div>
      </section>

      {p.gallery && p.gallery.length ? (
        <section className="block" style={{ paddingTop: 6 }}>
          <div className="wrap">
            <div className="eyebrow">Selects</div>
            <div className="tgal">
              {p.gallery.map((g, i) => (
                <Reveal key={i} className="tgal-item" delay={(i % 3) + 1}>
                  <ZoomImg src={g.src} alt={g.alt} />
                  {g.caption ? <span className="cap">{g.caption}</span> : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="tab-cta">
        <div className="wrap">
          <h2 className="display"><span>{p.ctaLabel || "Let's collab"}</span></h2>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 20 }}>
            <EmailButton email={c.site.email} subject={`${p.title} inquiry`} className="btn btn-primary" label="Email Ben" />
            <a href={c.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost">DM on Instagram</a>
          </div>
        </div>
      </section>
    </>
  );
}

export async function tabMetadata(pageKey) {
  const c = await getContent();
  const p = c.pages[pageKey];
  return { title: `${p.title} — Ben Davis`, description: p.intro, alternates: { canonical: `https://${c.site.domain}/${pageKey}` } };
}
