import popularLogo from '../assets/bancopopular.png';
import ualaLogo from '../assets/uala.png';

const NuLogo = ({ className }) => (
  <img 
    src="https://nu.com.co/favicons/apple-touch-icon.png" 
    alt="Nu Colombia" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const UalaLogo = ({ className }) => (
  <img 
    src={ualaLogo.src || ualaLogo} 
    alt="Ualá" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const LuloLogo = ({ className }) => (
  <img 
    src="https://www.lulobank.com/apple-touch-icon.png" 
    alt="Lulo Bank" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const PiBankLogo = ({ className }) => (
  <img 
    src="https://www.pibank.co/wp-content/themes/pibank/_/img/icons/apple-touch-icon.png" 
    alt="PiBank" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const PopularLogo = ({ className }) => (
  <img 
    src={popularLogo.src || popularLogo} 
    alt="Banco Popular" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const RappiLogo = ({ className }) => (
  <img 
    src="https://www.rappipay.co/wp-content/uploads/2024/06/cropped-favicon-rappipay-192x192.png" 
    alt="RappiPay" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const BoldLogo = ({ className }) => (
  <img 
    src="https://bold.co/apple-touch-icon.png" 
    alt="Bold" 
    className={`${className} object-cover rounded-lg`} 
  />
);

const Global66Logo = ({ className }) => (
  <img 
    src="https://www.global66.com/fav.png?v3" 
    alt="Global 66" 
    className={`${className} object-cover rounded-lg`} 
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
  global66: Global66Logo
};
