'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import ReelCard from '@/components/ReelCard';
import { education } from '@/lib/data';
import { staggerContainer } from '@/lib/motion';

export default function EducationPage() {
  return (
    <PageTransition>
      <main>
        <div className="page-hero">
          <motion.h1 className="text-gradient" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Education</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Academic credentials and engineering education background.
          </motion.p>
        </div>

        <motion.div
          className="timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ padding: '0 5% 4rem', maxWidth: '800px', margin: '0 auto' }}
        >
          {education.map((item, index) => (
            <ReelCard
              key={item.degree + item.institution}
              delay={index * 0.1}
              className="timeline-item"
              style={{ padding: '2rem', marginBottom: '1.5rem' }}
            >
              <h3 style={{ color: 'var(--aura-primary)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>{item.degree}</h3>
              <p style={{ fontWeight: '600' }}>{item.institution}</p>
              {item.university && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{item.university}</p>}
            </ReelCard>
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
