'use client';

import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import { skills } from '@/lib/data';
import { staggerContainer } from '@/lib/motion';

export default function SkillsPage() {
  return (
    <PageTransition>
      <main>
        <div className="page-hero">
          <motion.h1 className="text-gradient" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Technical Skills</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            A comprehensive list of language competencies, libraries, tools, and technical strengths.
          </motion.p>
        </div>

        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', padding: '0 5% 4rem', maxWidth: '1200px', margin: '0 auto' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              className="glass-card"
              style={{ padding: '2rem' }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <h3 style={{ color: 'var(--aura-primary)', fontSize: '1.25rem', marginBottom: '1rem' }}>{skill.category}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skill.items.split(', ').map((item) => (
                  <span key={item} className="tag-aura tag-aura--outline tag-aura--sm">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </PageTransition>
  );
}
