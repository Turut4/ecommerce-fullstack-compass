import React from 'react';

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div className="footer-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
