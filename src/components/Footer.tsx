"use client";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 bg-gray-900 text-white text-center">
      <p>© {currentYear} NLWC Ikorodu Beach Hangout. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
