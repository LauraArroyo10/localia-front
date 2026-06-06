import type { SocialLink } from '../../types/types';
import Logo from '../../assets/brand/logo.svg?react';
import { contactData } from '../../mockData/contactData';

const socialLinks: SocialLink[] = [
  { icon: <span className="block w-6 h-6 bg-white/60 rounded-full" />, href: "#", platform: "facebook" },
  { icon: <span className="block w-6 h-6 bg-white/60 rounded-full" />, href: "#", platform: "twitter" },
  { icon: <span className="block w-6 h-6 bg-white/60 rounded-full" />, href: "#", platform: "instagram" },
  { icon: <span className="block w-6 h-6 bg-white/60 rounded-full" />, href: "#", platform: "linkedin" },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleGoBackOnTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-violet-700 text-white flex flex-col px-[10%] pt-11 pb-10">

      <div className="flex justify-between items-start mb-15 max-md:flex-col max-md:gap-10">

        {/* Sección Izquierda */}
        <div className="flex flex-col gap-1 basis-[55%] max-md:w-full">
          <div className="flex items-center gap-3 mb-5">
            <Logo className="w-60 h-30 brightness-0 invert" />
          </div>
          <p className="text-sm leading-snug opacity-90 max-w-122">
            Localia offers you the comfort of discovering new ways to enjoy your
            trip. No fixed plans — just hidden places to explore and share
            unforgettable moments with the community. Not only helping others,
            but also giving a little something back to yourself.
          </p>
          <p className="text-xs mt-6 opacity-70">
            © {currentYear} Localia. All rights reserved.
          </p>
        </div>

        {/* Sección Contacto */}
        <div className="flex flex-col text-sm max-md:w-full">
          <h4 className="text-sm font-bold mb-4 capitalize">Contact Us</h4>
          <a
            href={`mailto:${contactData.email}`}
            className="font-medium hover:underline"
          >
            {contactData.email}
          </a>
          <p className="leading-6">Tel: {contactData.phone}</p>
          <p className="leading-6">Address:</p>
          {contactData.addressLines.map((line: string, index: number) => (
            <p key={index} className="leading-6">{line}</p>
          ))}
        </div>

        {/* Sección Redes Sociales */}
        <div className="flex flex-col gap-2.5 ml-auto max-md:ml-0 max-md:w-full">
          <h4 className="text-sm font-bold capitalize">Follow Us</h4>
          <div className="flex gap-3 mt-4 items-center">
            {socialLinks.map((link: SocialLink, index: number) => (
              <a
                key={index}
                href={link.href}
                aria-label={`Follow us on ${link.platform}`}
                className="opacity-70 hover:opacity-100 transition-opacity"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Botón volver arriba */}
      <div className="border-t border-white pt-7 flex justify-center">
        <button
          onClick={handleGoBackOnTop}
          className="bg-transparent border-none text-white text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer tracking-[2px] hover:opacity-70 transition-opacity"
        >
          <span className="text-xl">^</span>
          GO BACK ON TOP
        </button>
      </div>

    </footer>
  );
}

export default Footer;