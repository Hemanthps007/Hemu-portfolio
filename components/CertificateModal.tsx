'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Certificate } from '@/lib/types';
import { asset } from '@/lib/utils';
import { FiX, FiChevronLeft, FiChevronRight, FiExternalLink, FiAward, FiCalendar, FiMapPin, FiCheck, FiCopy, FiCheckCircle } from 'react-icons/fi';

interface CertificateModalProps {
  certificates: Certificate[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function CertificateModal({
  certificates,
  selectedIndex,
  onClose,
  onSelectIndex,
}: CertificateModalProps) {
  const [copied, setCopied] = useState(false);
  const isOpen = selectedIndex !== null && selectedIndex >= 0 && selectedIndex < certificates.length;
  const cert = isOpen ? certificates[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    onSelectIndex((selectedIndex - 1 + certificates.length) % certificates.length);
  }, [selectedIndex, certificates.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    onSelectIndex((selectedIndex + 1) % certificates.length);
  }, [selectedIndex, certificates.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handlePrev, handleNext, onClose]);

  const handleCopyDetails = () => {
    if (!cert) return;
    const textToCopy = `${cert.caption || cert.alt} - Issued by ${cert.issuer || 'Credential Issuer'}${cert.score ? ` (Score: ${cert.score})` : ''} | ${cert.desc}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && cert && (
        <motion.div
          className="cert-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="cert-modal-dialog glass-card"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="cert-modal-header">
              <div className="cert-modal-header-badges">
                {cert.category && (
                  <span className="tag-aura tag-aura--sm">{cert.category}</span>
                )}
                <span className="cert-verified-badge">
                  <FiCheckCircle style={{ marginRight: '4px' }} /> Verified Credential
                </span>
                {cert.score && (
                  <span className="cert-score-highlight">
                    <FiAward style={{ marginRight: '4px' }} /> {cert.score}
                  </span>
                )}
              </div>

              <button
                type="button"
                className="cert-modal-close-btn"
                onClick={onClose}
                aria-label="Close modal"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Content Grid */}
            <div className="cert-modal-body">
              {/* Left Pane: Image Presentation */}
              <div className="cert-modal-image-pane">
                <div className="cert-modal-image-wrapper">
                  <Image
                    src={asset(cert.src)}
                    alt={cert.alt}
                    width={1000}
                    height={800}
                    priority
                    className="cert-modal-img"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '62vh',
                      objectFit: 'contain',
                      borderRadius: '8px',
                    }}
                  />
                </div>

                <div className="cert-modal-image-actions">
                  <a
                    href={asset(cert.src)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-aura button-aura--outline"
                    style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
                  >
                    <FiExternalLink style={{ marginRight: '6px' }} /> View Full Resolution
                  </a>
                </div>
              </div>

              {/* Right Pane: Elaborate Details */}
              <div className="cert-modal-details-pane">
                <div className="cert-details-scrollable">
                  <h2 className="cert-modal-title text-gradient">
                    {cert.caption || cert.alt}
                  </h2>

                  {cert.issuer && (
                    <div className="cert-detail-row">
                      <div className="cert-detail-icon"><FiAward /></div>
                      <div>
                        <div className="cert-detail-label">Issuing Organization</div>
                        <div className="cert-detail-val font-semibold">{cert.issuer}</div>
                      </div>
                    </div>
                  )}

                  {cert.conductedAt && (
                    <div className="cert-detail-row">
                      <div className="cert-detail-icon"><FiMapPin /></div>
                      <div>
                        <div className="cert-detail-label">Location / Institution</div>
                        <div className="cert-detail-val">{cert.conductedAt}</div>
                      </div>
                    </div>
                  )}

                  {cert.date && (
                    <div className="cert-detail-row">
                      <div className="cert-detail-icon"><FiCalendar /></div>
                      <div>
                        <div className="cert-detail-label">Timeline / Issue Date</div>
                        <div className="cert-detail-val">{cert.date}</div>
                      </div>
                    </div>
                  )}

                  {cert.credentialId && (
                    <div className="cert-detail-row">
                      <div className="cert-detail-icon">🆔</div>
                      <div>
                        <div className="cert-detail-label">Credential / Registration ID</div>
                        <div className="cert-detail-val font-mono">{cert.credentialId}</div>
                      </div>
                    </div>
                  )}

                  <div className="cert-detail-section">
                    <div className="cert-detail-label" style={{ marginBottom: '6px' }}>Course & Achievement Overview</div>
                    <p className="cert-modal-desc">{cert.desc}</p>
                  </div>

                  {cert.skills && cert.skills.length > 0 && (
                    <div className="cert-detail-section">
                      <div className="cert-detail-label" style={{ marginBottom: '8px' }}>Key Competencies & Topics</div>
                      <div className="cert-skills-wrap">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="tag-aura tag-aura--sm tag-aura--outline">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="cert-details-footer-actions">
                  <button
                    type="button"
                    onClick={handleCopyDetails}
                    className="button-aura button-aura--outline"
                    style={{ fontSize: '0.85rem', width: '100%', justifyContent: 'center' }}
                  >
                    {copied ? (
                      <>
                        <FiCheck style={{ marginRight: '6px', color: 'var(--success)' }} /> Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <FiCopy style={{ marginRight: '6px' }} /> Copy Credential Summary
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Navigation Footer */}
            <div className="cert-modal-footer">
              <button
                type="button"
                className="cert-nav-btn"
                onClick={handlePrev}
                aria-label="Previous Certificate"
              >
                <FiChevronLeft size={18} />
                <span>Previous</span>
              </button>

              <div className="cert-counter-indicator">
                {selectedIndex + 1} / {certificates.length}
              </div>

              <button
                type="button"
                className="cert-nav-btn"
                onClick={handleNext}
                aria-label="Next Certificate"
              >
                <span>Next</span>
                <FiChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
