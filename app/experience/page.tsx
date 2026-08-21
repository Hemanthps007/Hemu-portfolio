'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import ReelCard from '@/components/ReelCard';
import { experience } from '@/lib/data';
import { staggerContainer } from '@/lib/motion';

export default function ExperiencePage() {
  return (
    <PageTransition>
      <main>
        <div className="page-hero">
          <motion.h1 className="text-gradient" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Work Experience</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Professional timeline showcasing software engineering roles and deliverables.
          </motion.p>
        </div>

        <motion.div
          className="timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ padding: '0 5% 4rem', maxWidth: '1000px', margin: '0 auto' }}
        >
          {experience.map((item, index) => (
            <ReelCard
              key={item.title + item.period}
              delay={index * 0.08}
              className="timeline-item"
              style={{ padding: '2rem', marginBottom: '2rem', position: 'relative' }}
            >
              <h3 style={{ color: 'var(--aura-primary)', fontSize: '1.4rem', marginBottom: '0.4rem' }}>
                {item.title}
                {item.mode && <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}> · {item.mode}</span>}
              </h3>
              <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.location}</p>
              {item.period && <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{item.period}</p>}
              <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                {item.bullets.map((b, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem', color: 'var(--text-light)' }}>
                    {b}
                  </li>
                ))}
              </ul>
            </ReelCard>
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
