// Footer.jsx
import React from 'react';
import FooterSocial from './_components/FooterSocial';
import FooterLegal from './_components/FooterLegal';
import FooterIntro from './_components/FooterIntro';
import FooterLinks from './_components/FooterLinks';

const Footer = () => {
  return (
    <footer className="text-neutral-800 dark:text-neutral-300 pt-12 pb-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-12">
        {/* Footer Info (Left Section) */}
        <div className="footer-info md:w-2/5 space-y-4">
          <FooterIntro />
        </div>

        {/* Footer Links (Right Section) */}
        <FooterLinks />
      </div>

      {/* Bottom copyright */}
      <div className="pt-4 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Footer Legal */}
        <div className="order-1 md:order-0 flex items-center justify-center md:justify-start w-full md:w-auto mb-4 md:mb-0">
          <FooterLegal />
        </div>

        {/* Social Icons */}
        <div className="order-0 md:order-1 flex justify-center md:justify-end pb-3 space-x-4">
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}

export default Footer;