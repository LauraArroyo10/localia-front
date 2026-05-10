
import type { ContactInfo, SocialLink } from '../types/types';
import Logo from '../assets/brand/logo.svg?react'


// 1. Datos Mock (Puedes mover esto a un archivo separado más adelante)
const contactData: ContactInfo = {
  email: "about@localia.com",
  phone: "+305 3465 7632",
  addressLines: ["Puntarenas, Esparza", "Costa Rica"],
};

// Reemplazar con los iconos
const socialLinks: SocialLink[] = [
  { icon: <span className="social-placeholder" />, href: "#", platform: "facebook" },
  { icon: <span className="social-placeholder" />, href: "#", platform: "twitter" },
  { icon: <span className="social-placeholder" />, href: "#", platform: "instagram" },
  { icon: <span className="social-placeholder" />, href: "#", platform: "linkedin" },
];

// 2. Componente Principal
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleGoBackOnTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-main">
      <div className="footer-container">
        {/* -- Sección Izquierda -- */}
        <div className="footer-section-logo">
          <div className="logo-group">
            <Logo className="w-60 h-30  brightness-0 invert" />
            
          </div>
          <p className="description-text">
            Localia offers you the comfort of discovering new ways to enjoy your
            trip. No fixed plans — just hidden places to explore and share
            unforgettable moments with the community. Not only helping others,
            but also giving a little something back to yourself.
          </p>
          <p className="copyright-text">
            © {currentYear} Localia. All rights reserved.
          </p>
        </div>

        {/* -- Sección Contacto (Derecha 1) -- */}
        <div className="footer-section-contact">
          <h4 className="section-title">Contact Us</h4>
          <a href={`mailto:${contactData.email}`} className="contact-link">
            {contactData.email}
          </a>
          <p className="contact-item">Tel: {contactData.phone}</p>
          <p className="contact-item">Address:</p>
          {contactData.addressLines.map((line, index) => (
            <p key={index} className="contact-item address-line">
              {line}
            </p>
          ))}
        </div>

        {/* -- Sección Redes Sociales (Derecha 2) -- */}
        <div className="footer-section-social">
          <h4 className="section-title">Follow Us</h4>
          <div className="social-links-container">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="social-icon-link"
                aria-label={`Follow us on ${link.platform}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* -- Botón Inferior centrado -- */}
      <div className="back-to-top-container">
        <button className="back-to-top-btn" onClick={handleGoBackOnTop}>
          <span className="arrow-up">^</span>
          GO BACK ON TOP
        </button>
      </div>
    </footer>
  );
};

export default Footer;