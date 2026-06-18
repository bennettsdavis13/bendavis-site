'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ZoomImg({ src, alt, editPath }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);
  const overlay = open && mounted ? createPortal(
    <div className="lightbox" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
      <button className="lightbox-close" aria-label="Close fullscreen" onClick={() => setOpen(false)}>×</button>
      <img className="lb-img" src={src} alt={alt} onClick={(e) => e.stopPropagation()} />
    </div>, document.body) : null;
  return (
    <>
      <img src={src} alt={alt} loading="lazy" data-edit-img={editPath || undefined} onClick={() => setOpen(true)} style={{ cursor: 'zoom-in' }} />
      {overlay}
    </>
  );
}
