import { getContent } from '@/lib/content';
import Reveal from '@/components/Reveal';
import Short from '@/components/Short';
import ZoomImg from '@/components/ZoomImg';
import Edit from '@/components/Edit';
import Blocks from '@/components/Blocks';
import PromoStrip from '@/components/PromoStrip';
import GuideFeature from '@/components/GuideFeature';
import PartnerStrip from '@/components/PartnerStrip';

export async function generateMetadata() {
  const c = await getContent();
  const p = c.pages.about;
  return { title: `${p.title} — Ben Davis`, description: p.paragraphs[0], alternates: { canonical: `https://${c.site.domain}/about` } };
}

export default async function About() {
  const c = await getContent();
  const p = c.pages.about;
  const big = (p.big || '').split('|');
  return (
    <>
      <section className="block page-head">
        <div className="wrap about-head">
          <div>
            <div className="eyebrow"><Edit path="pages.about.eyebrow">{p.eyebrow}</Edit></div>
            <h1 className="display"><Edit path="pages.about.title">{p.title}</Edit></h1>
          </div>
          {p.heroImage ? (
            <div className="about-hero-img"><ZoomImg src={p.heroImage} editPath="pages.about.heroImage" alt="Ben Davis, 6 foot 9 creator, actor and model" /></div>
          ) : null}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 12 }}>
        <div className="wrap about-grid">
          <Reveal>
            <div className="about-big display">
              {big.map((line, i) => i === 1 ? <span className="accent" key={i}>{line}</span> : <span key={i}>{line} </span>)}
            </div>
          </Reveal>
          <Reveal delay={1} className="about-copy">
            {p.paragraphs.map((para, i) => (
              <p key={i} data-edit={`pages.about.paragraphs.${i}`} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>') }} />
            ))}
            <div className="about-list" data-edit-list="pages.about.pills">
              {p.pills.map((pill, i) => (
                <span className={`pill${i === 0 ? ' fill' : ''}`} data-edit-index={i} key={i}><Edit path={`pages.about.pills.${i}`}>{pill}</Edit></span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {p.videoId ? (
        <section className="block" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
              <div className="video-panel">
                <div className="vp-copy">
                  <div className="eyebrow">Say Hi</div>
                  <h3><Edit path="pages.about.videoCaption">{p.videoCaption}</Edit></h3>
                  <p>A quick hello, straight from me. Hit play and meet the 6'9" energy you'd be working with.</p>
                  <a href={c.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost" style={{ marginTop: 8 }}>Follow on Instagram</a>
                  <span className="block-url" style={{ marginTop: 10 }}>Video link or ID: <Edit path="pages.about.videoId">{p.videoId}</Edit></span>
                </div>
                <Short id={p.videoId} title="About Ben Davis" />
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      <GuideFeature guide={p.guide} />
      <PartnerStrip partner={p.partner} />

      <PromoStrip promos={c.promoLinks} />

      <section className="blocks-section"><div className="wrap"><Blocks path="pages.about.blocks" blocks={p.blocks} /></div></section>
    </>
  );
}
