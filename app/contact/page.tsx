'use client';

import { motion } from 'framer-motion';
import {
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFileDownload,
  FaGithub,
} from 'react-icons/fa';
import PageTransition from '@/components/PageTransition';
import { contact } from '@/lib/data';
import { asset } from '@/lib/utils';

export default function ContactPage() {
  return (
    <PageTransition>
      <main className="snap-section" style={{ minHeight: 'calc(100vh - 80px)', padding: '6rem 5% 4rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <header className="page-hero" style={{ padding: '0 0 3rem 0' }}>
            <h1 className="text-gradient">Get In Touch</h1>
            <p>I am available for software engineering roles, collaboration, and discussion.</p>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
              <h3 className="text-gradient" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Contact Details</h3>

              <div className="contact-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FaEnvelope className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <a href={`mailto:${contact.email}`} style={{ textDecoration: 'none', color: 'var(--text-light)' }}>{contact.email}</a>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FaLinkedin className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--text-light)' }}>{contact.linkedinLabel}</a>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FaGithub className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--text-light)' }}>{contact.githubLabel}</a>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FaWhatsapp className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--text-light)' }}>{contact.whatsappDisplay}</a>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FaPhoneAlt className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <span style={{ color: 'var(--text-light)' }}>{contact.phone}</span>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FaMapMarkerAlt className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <span style={{ color: 'var(--text-light)' }}>{contact.location}</span>
                </div>
                <div className="contact-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                  <FaFileDownload className="contact-icon" style={{ fontSize: '1.2rem', color: 'var(--aura-primary)' }} />
                  <a href={asset(contact.resume)} download={contact.resumeFilename} className="text-gradient" style={{ fontWeight: 'bold', textDecoration: 'none' }}>
                    Download Resume PDF
                  </a>
                </div>
              </div>
            </div>

            <form className="glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} onSubmit={(e) => e.preventDefault()}>
              <h3 className="text-gradient" style={{ fontSize: '1.5rem' }}>Send a Message</h3>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Name</label>
                <input type="text" placeholder="Your name" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Email</label>
                <input type="email" placeholder="you@example.com" style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>Message</label>
                <textarea rows={4} placeholder="Write your message..." style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '10px', background: 'rgba(255, 255, 255, 1)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', outline: 'none', resize: 'vertical' }} />
              </div>
              <button type="submit" className="button-aura" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>Send Message</button>
            </form>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
