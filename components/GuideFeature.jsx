import ZoomImg from './ZoomImg';
import Edit from './Edit';
export default function GuideFeature({ guide }) {
  if (!guide) return null;
  return (
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="feature">
          <div className="fcopy">
            <div className="eyebrow"><Edit path="pages.about.guide.eyebrow">{guide.eyebrow}</Edit></div>
            <h2 className="display"><Edit path="pages.about.guide.title">{guide.title}</Edit></h2>
            <p><Edit path="pages.about.guide.body">{guide.body}</Edit></p>
            <a href={guide.ctaHref} target="_blank" rel="noopener" className="btn btn-primary"><Edit path="pages.about.guide.ctaLabel">{guide.ctaLabel}</Edit> &rarr;</a>
          </div>
          <div className="fimg"><ZoomImg src={guide.image} editPath="pages.about.guide.image" alt={guide.title} /></div>
        </div>
      </div>
    </section>
  );
}
