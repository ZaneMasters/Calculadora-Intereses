import nuLogo from '../assets/nu.png';
import popularLogo from '../assets/bancopopular.png';
import ualaLogo from '../assets/uala.png';
import luloLogo from '../assets/lulo.png';
import pibankLogo from '../assets/pibank.png';
import rappiLogo from '../assets/rappipay.png';
import boldLogo from '../assets/bold.png';
import global66Logo from '../assets/global66.png';
import daleLogo from '../assets/dale.svg?url';

const getImageSrc = (img) => {
  if (!img) return '';
  if (typeof img === 'string') return img;
  if (typeof img === 'object') {
    if (img.src) return img.src;
    if (img.default) return typeof img.default === 'string' ? img.default : img.default.src;
  }
  return String(img);
};

const NuLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(nuLogo)} 
    alt="Nu Colombia - Rendimiento Cajitas 9.3% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-contain rounded-lg`} 
  />
);

const UalaLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(ualaLogo)} 
    alt="Ualá Colombia - Cuenta con rendimiento hasta 10.5% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const LuloLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(luloLogo)} 
    alt="Lulo Bank - Rendimiento bolsillos de ahorro Flex y Pro" 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const PiBankLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(pibankLogo)} 
    alt="Pibank Colombia - Cuenta remunerada 11% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const PopularLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(popularLogo)} 
    alt="Banco Popular - Cuenta Plateada de ahorro digital" 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const RappiLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(rappiLogo)} 
    alt="RappiPay Colombia - Rendimiento RappiCuenta y Bolsillos 9% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const BoldLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(boldLogo)} 
    alt="Bold Colombia - Bolsillos de ahorro 10% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const Global66Logo = ({ className = '' }) => (
  <img 
    src={getImageSrc(global66Logo)} 
    alt="Global 66 Colombia - Cuenta Global de ahorro en pesos y dólares" 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const DaleLogo = ({ className = '' }) => (
  <img 
    src={getImageSrc(daleLogo)} 
    alt="dale! Grupo Aval - Alcancías digitales con rendimiento 10.5% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-contain`} 
  />
);

export const BankLogos = {
  nu: NuLogo,
  uala: UalaLogo,
  lulo: LuloLogo,
  pibank: PiBankLogo,
  popular: PopularLogo,
  rappi: RappiLogo,
  bold: BoldLogo,
  global66: Global66Logo,
  dale: DaleLogo
};
