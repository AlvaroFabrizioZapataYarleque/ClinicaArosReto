import ProductTabs from '../components/ProductTabs';

const Productos = () => {
  return (
    <div style={{ paddingTop: '70px' }}>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Productos</h1>
          <p className="page-subtitle">
            Encuentra los mejores aros, llantas y accesorios para tu vehículo
          </p>
        </div>
      </div>
      <ProductTabs />
    </div>
  );
};

export default Productos;
