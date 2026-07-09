import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import segundologo from '../assets/segundologo-aroreto.jpg';
import api from '../api';
import './Footer.css';

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Footer = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get('/api/configuracion')
      .then(({ data }) => setConfig(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!config) return;
    const container = document.getElementById('map');
    if (container && !container._leaflet_id) {
      const map = L.map('map', { zoomControl: true }).setView([config.lat || -12.2025, config.lng || -76.9500], 14);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      L.marker([config.lat || -12.2025, config.lng || -76.9500], { icon: defaultIcon }).addTo(map)
        .bindPopup(`<b>Clínica de Aros Reto S.A.C.</b><br>${(config.direccion || '').replace(/,/g, '<br>')}`)
        .openPopup();
      setTimeout(() => map.invalidateSize(), 200);
    }
  }, [config]);

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,511.73,50.41,585,56.77c82.06,7.4,161.8-8.56,241-8.56,96.54,0,184.32,17.56,277,27.56,42.42,4.57,87.46,7.17,133,1.06,51.38-6.85,102.29-25.89,152-38.16V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-left-cols">
              <div className="footer-brand">
                <Link to="/" className="footer-logo">
                  <img src={segundologo} alt="Aros Reto" className="footer-logo-img" />
                </Link>
                <p className="footer-desc">
                  {config?.descripcion || 'Clínica de Aros Reto S.A.C. - Más de 10 años de experiencia en reparación, mantenimiento y venta de aros para todo tipo de automóviles.'}
                </p>
                <div className="footer-social">
                  {config?.facebook && <a href={config.facebook} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook"><FaFacebook /></a>}
                  {config?.instagram && <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram"><FaInstagram /></a>}
                  {config?.whatsapp && <a href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp"><FaWhatsapp /></a>}
                </div>
              </div>

              <div className="footer-col">
                <h4>Enlaces Rápidos</h4>
                <ul>
                  <li><Link to="/">Inicio</Link></li>
                  <li><Link to="/productos">Productos</Link></li>
                  <li><Link to="/servicios">Servicios</Link></li>
                  <li><Link to="/promociones">Promociones</Link></li>
                  <li><Link to="/nosotros">Nosotros</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Servicios</h4>
                <ul>
                  <li><Link to="/servicios">Reparación de Aros</Link></li>
                  <li><Link to="/servicios">Mantenimiento</Link></li>
                  <li><Link to="/servicios">Delivery</Link></li>
                  <li><Link to="/productos">Venta de Aros</Link></li>
                  <li><Link to="/productos">Venta de Llantas</Link></li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Contacto</h4>
                <ul className="footer-contact">
                  {config?.direccion && <li><FaMapMarkerAlt /><span>{config.direccion}</span></li>}
                  {config?.telefonos && <li><FaPhone /><span>{config.telefonos}</span></li>}
                  {config?.email && <li><FaEnvelope /><span>{config.email}</span></li>}
                  {config?.horario && <li><FaClock /><span>{config.horario}</span></li>}
                </ul>
              </div>
            </div>

            <div className="footer-map-wrapper">
              <h4>Ubícanos</h4>
              <div id="map" className="footer-map"></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Clínica de Aros Reto S.A.C. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
