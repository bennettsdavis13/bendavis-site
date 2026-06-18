import Edit from './Edit';
export default function PartnerStrip({ partner }) {
  if (!partner) return null;
  return (
    <section className="block" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="partner">
          <div className="code"><Edit path="pages.about.partner.code">{partner.code}</Edit></div>
          <div className="pt"><b><Edit path="pages.about.partner.text_pre">{partner.text_pre}</Edit></b> <Edit path="pages.about.partner.text_rest">{partner.text_rest}</Edit></div>
          <a href={partner.ctaHref} target="_blank" rel="noopener" className="btn btn-ghost"><Edit path="pages.about.partner.ctaLabel">{partner.ctaLabel}</Edit> &rarr;</a>
        </div>
      </div>
    </section>
  );
}
