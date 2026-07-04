import { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { GiCarWheel, GiTireTracks } from 'react-icons/gi';
import { HiOutlineSparkles } from 'react-icons/hi';
import './ProductTabs.css';

const ProductTabs = ({ limitado = false }) => {
  const [activo, setActivo] = useState('aros');

  const tabs = [
    { id: 'aros', label: 'Aros', icon: GiCarWheel },
    { id: 'llantas', label: 'Llantas', icon: GiTireTracks },
    { id: 'accesorios', label: 'Accesorios', icon: HiOutlineSparkles }
  ];

  const productos = {
    aros: [
      { nombre: 'Aro Deportivo 18"', precio: 'S/450', imagen: '', marca: 'MMX', descripcion: 'Aleación ligera 5 radios', destacado: true },
      { nombre: 'Aro Clásico 16"', precio: 'S/320', imagen: '', marca: 'Dream', descripcion: 'Cromado para sedan', destacado: false },
      { nombre: 'Aro Todo Terreno 20"', precio: 'S/580', imagen: '', marca: 'Fuel', descripcion: 'Robusto para SUV 4x4', destacado: true },
      { nombre: 'Aro Deportivo 17"', precio: 'S/390', imagen: '', marca: 'Enkei', descripcion: 'Diseño racing', destacado: false }
    ],
    llantas: [
      { nombre: 'Pirelli 225/45R17', precio: 'S/280', imagen: '', marca: 'Pirelli', descripcion: 'Alto rendimiento', destacado: true },
      { nombre: 'Michelin 205/55R16', precio: 'S/250', imagen: '', marca: 'Michelin', descripcion: 'Excelente durabilidad', destacado: false },
      { nombre: 'Bridgestone 265/70R17', precio: 'S/320', imagen: '', marca: 'Bridgestone', descripcion: 'Todo terreno', destacado: true },
      { nombre: 'Goodyear 215/60R16', precio: 'S/230', imagen: '', marca: 'Goodyear', descripcion: 'Excelente agarre', destacado: false }
    ],
    accesorios: [
      { nombre: 'Kit Run Flat', precio: 'S/85', imagen: '', marca: 'Slime', descripcion: 'Kit antipinchazos', destacado: false },
      { nombre: 'Tapas Válvulas LED', precio: 'S/25', imagen: '', marca: 'AutoStyle', descripcion: 'Tapas luminosas', destacado: true },
      { nombre: 'Sensores TPMS', precio: 'S/150', imagen: '', marca: 'Orange', descripcion: 'Presión neumáticos', destacado: false },
      { nombre: 'Llantas Deportivas', precio: 'S/180', imagen: '', marca: 'Racing', descripcion: 'Aro de repuesto', destacado: false }
    ]
  };

  const items = limitado ? productos[activo].slice(0, 4) : productos[activo];

  return (
    <section className="product-tabs">
      <div className="container">
        <h2 className="section-title">Nuestros Productos</h2>
        <p className="section-subtitle">
          Explora nuestra amplia gama de aros, llantas y accesorios para tu vehículo
        </p>

        <div className="tabs-header">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`tab-btn ${activo === id ? 'active' : ''}`}
              onClick={() => setActivo(id)}
            >
              <Icon className="tab-icon" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="tabs-content">
          {items.map((producto, idx) => (
            <div key={idx} className="product-card card" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="product-image">
                <div className="product-placeholder">
                  <GiCarWheel className="placeholder-icon" />
                </div>
                {producto.destacado && (
                  <span className="product-badge">
                    <FaStar /> Destacado
                  </span>
                )}
              </div>
              <div className="product-info">
                <span className="product-marca">{producto.marca}</span>
                <h3 className="product-nombre">{producto.nombre}</h3>
                <p className="product-descripcion">{producto.descripcion}</p>
                <div className="product-footer">
                  <span className="product-precio">{producto.precio}</span>
                  <button className="btn-buy">
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
