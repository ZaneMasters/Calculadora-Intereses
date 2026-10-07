import popularLogo from '../assets/bancopopular.png';
import ualaLogo from '../assets/uala.png';

const NuLogo = ({ className }) => (
  <img 
    src="https://nu.com.co/favicons/apple-touch-icon.png" 
    alt="Nu Colombia - Rendimiento Cajitas 9.3% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const UalaLogo = ({ className }) => (
  <img 
    src={ualaLogo.src || ualaLogo} 
    alt="Ualá Colombia - Cuenta con rendimiento hasta 10.5% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const LuloLogo = ({ className }) => (
  <img 
    src="https://www.lulobank.com/apple-touch-icon.png" 
    alt="Lulo Bank - Rendimiento bolsillos de ahorro Flex y Pro" 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const PiBankLogo = ({ className }) => (
  <img 
    src="https://www.pibank.co/wp-content/themes/pibank/_/img/icons/apple-touch-icon.png" 
    alt="Pibank Colombia - Cuenta remunerada 11% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const PopularLogo = ({ className }) => (
  <img 
    src={popularLogo.src || popularLogo} 
    alt="Banco Popular - Cuenta Plateada de ahorro digital" 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const RappiLogo = ({ className }) => (
  <img 
    src="https://www.rappipay.co/wp-content/uploads/2024/06/cropped-favicon-rappipay-192x192.png" 
    alt="RappiPay Colombia - Rendimiento RappiCuenta y Bolsillos 9% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const BoldLogo = ({ className }) => (
  <img 
    src="https://bold.co/apple-touch-icon.png" 
    alt="Bold Colombia - Bolsillos de ahorro 10% E.A." 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const Global66Logo = ({ className }) => (
  <img 
    src="https://www.global66.com/fav.png?v3" 
    alt="Global 66 Colombia - Cuenta Global de ahorro en pesos y dólares" 
    width="48"
    height="48"
    loading="lazy"
    decoding="async"
    className={`${className} object-cover rounded-lg`} 
  />
);

const DaleLogo = ({ className }) => (
  <img 
    src="https://dale.com.co/sites/default/files/Logo.svg" 
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
