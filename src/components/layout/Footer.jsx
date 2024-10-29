import React from 'react';

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors duration-200 text-sm hover:underline decoration-gray-500"
  >
    {children}
    <i class="fa-solid fa-arrow-up-right-from-square w-3 h-3 opacity-70"></i>
  </a>
);

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Links Section */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <FooterLink href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_cou?ie=UTF8&nodeId=200545940">
              Conditions of Use
            </FooterLink>
            <FooterLink href="https://www.amazon.in/gp/help/customer/display.html/ref=ap_desktop_footer_privacy_notice?ie=UTF8&nodeId=200534380">
              Privacy Notice
            </FooterLink>
            <FooterLink href="https://www.amazon.in/gp/help/customer/display.html?ie=UTF8&nodeId=508510">
              Help
            </FooterLink>
          </nav>

          {/* Copyright Section */}
          <div className="text-gray-500 text-sm">
            © 1996-{currentYear}, Amazon.com, Inc. or its affiliates
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;