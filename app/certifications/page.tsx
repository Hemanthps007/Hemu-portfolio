'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import ReelCard from '@/components/ReelCard';
import CertificateModal from '@/components/CertificateModal';
import { certificates } from '@/lib/data';
import { asset } from '@/lib/utils';
import { staggerContainer } from '@/lib/motion';
import { FiAward, FiEye, FiCheckCircle } from 'react-icons/fi';

export default function CertificationsPage() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null);

  const handleOpenCertificate = useCallback((certItem: (typeof certificates)[0]) => {
    const originalIndex = certificates.findIndex((c) => c.src === certItem.src);
    setSelectedCertIndex(originalIndex !== -1 ? originalIndex : 0);
  }, []);

  return (
    <PageTransition>
      <main>
        {/* Page Hero Header */}
        <div className="page-hero">
          <motion.h1
            className="text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Certifications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {certificates.length} credentials across software development, tools, and technical competencies.
          </motion.p>
        </div>

        {/* Uniform Certifications Grid */}
        <motion.div
          className="certifications-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ padding: '0 5% 4rem' }}
        >
          {certificates.map((cert, index) => (
            <ReelCard
              key={cert.src}
              delay={index * 0.05}
              className="cert-card"
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                padding: '0',
                overflow: 'hidden',
              }}
            >
              <div
                className="cert-card-inner"
                onClick={() => handleOpenCertificate(cert)}
                style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenCertificate(cert);
                  }
                }}
              >
                {/* Fixed Aspect Ratio Thumbnail with Ambient Backdrop */}
                <div className="cert-thumbnail-wrapper">
                  {/* Ambient blurred backdrop so portrait & landscape images blend uniformly */}
                  <Image
                    src={asset(cert.src)}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="cert-img-blur-bg"
                    aria-hidden="true"
                  />
                  {/* Clean uncropped contained preview */}
                  <Image
                    src={asset(cert.src)}
                    alt={cert.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="cert-img-contained"
                  />

                  {/* Badges on Thumbnail */}
                  {cert.score && (
                    <div className="cert-badge-floating">
                      <FiAward style={{ marginRight: '4px' }} /> {cert.score}
                    </div>
                  )}

                  {/* Hover Overlay Hint */}
                  <div className="cert-hover-overlay">
                    <span className="cert-hover-btn">
                      <FiEye style={{ marginRight: '6px' }} /> Elaborate Details
                    </span>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="cert-card-content">
                  <div className="cert-card-header-meta">
                    {cert.category && (
                      <span className="tag-aura tag-aura--sm">{cert.category}</span>
                    )}
                    {cert.date && (
                      <span className="cert-date-meta">{cert.date.split('–')[0].trim()}</span>
                    )}
                  </div>

                  <h3 className="cert-card-title">
                    {cert.caption || cert.alt}
                  </h3>

                  {cert.issuer && (
                    <div className="cert-card-issuer">
                      <FiCheckCircle className="cert-verified-icon" />
                      <span>{cert.issuer}</span>
                    </div>
                  )}

                  <p className="cert-card-desc">
                    {cert.desc}
                  </p>

                  {/* Card Bottom / Action Footer */}
                  <div className="cert-card-footer">
                    <span className="cert-action-link">
                      Elaborate & View Certificate →
                    </span>
                  </div>
                </div>
              </div>
            </ReelCard>
          ))}
        </motion.div>
      </main>

      {/* Elaborate Details Modal */}
      <CertificateModal
        certificates={certificates}
        selectedIndex={selectedCertIndex}
        onClose={() => setSelectedCertIndex(null)}
        onSelectIndex={setSelectedCertIndex}
      />
    </PageTransition>
  );
}
