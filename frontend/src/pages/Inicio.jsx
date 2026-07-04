import Hero from '../components/Hero';
import ProductTabs from '../components/ProductTabs';
import ServicesSection from '../components/ServicesSection';
import PromotionsSection from '../components/PromotionsSection';

const Inicio = () => {
  return (
    <>
      <Hero />
      <ProductTabs limitado={true} />
      <ServicesSection />
      <PromotionsSection />
    </>
  );
};

export default Inicio;
