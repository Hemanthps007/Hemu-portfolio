'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { site, profile } from '@/lib/data';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      const scrolled = window.scrollY > 50;
      setIsTransparent(isHome && !scrolled);
      if (scrolled) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const closeMenu = () => setIsMenuOpen(false);

  const bottomLinks = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Certs', href: '/certifications' },
    { label: 'Events', href: '/achievements' },
    { label: 'Contact', href: '/#contact' },
  ];

  const nameParts = (profile.name || 'Your Name').split(' ');
  const firstName = nameParts[0];
  const remainingName = nameParts.slice(1).join(' ');

  return (
    <>
      <nav className={`navbar ${isTransparent && isHome ? 'navbar--transparent' : ''}`}>
        <Link href="/" className="logo" onClick={closeMenu}>
          {firstName} {remainingName ? <span>{remainingName}</span> : null}
        </Link>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          {(site.nav || []).map((item) => (
            <Link key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} role="button" tabIndex={0} aria-label="Toggle menu">
          ☰
        </div>
      </nav>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {bottomLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
