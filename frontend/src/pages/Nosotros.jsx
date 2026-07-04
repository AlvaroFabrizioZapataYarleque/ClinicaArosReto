// ═══════════════════════════════════════════════════════════════
// pages/Nosotros.jsx — PÁGINA INSTITUCIONAL
//
// Contiene la información completa de la empresa:
//   1. Historia  → Origen de la empresa (2010), fundadores, crecimiento
//   2. Misión    → Propósito de la empresa
//   3. Visión    → Meta a futuro
//   4. Valores   → 6 principios corporativos con iconos
//
// Datos proporcionados por Clínica de Aros Reto S.A.C.
// ═══════════════════════════════════════════════════════════════

import { FaShieldAlt, FaStar, FaComments, FaHandshake, FaUsers, FaHeart, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';
import { GiCarWheel } from 'react-icons/gi';
import './Nosotros.css';

const Nosotros = () => {
  // Valores corporativos (cada uno con icono, título y descripción)
  const valores = [
    { icon: FaShieldAlt, titulo: 'Integridad', descripcion: 'Somos honestos y responsables en todo lo que ofrecemos.' },
    { icon: FaStar, titulo: 'Calidad', descripcion: 'Ofrecemos el servicio de alta calidad.' },
    { icon: FaComments, titulo: 'Comunicación', descripcion: 'Es el único éxito para el trabajo en equipo.' },
    { icon: FaHandshake, titulo: 'Respeto', descripcion: 'Tratamos a las personas con el mayor respeto y dignidad.' },
    { icon: FaUsers, titulo: 'Trabajo en Equipo', descripcion: 'Orientados al logro de los objetivos.' },
    { icon: FaHeart, titulo: 'Compañerismo', descripcion: 'Apoyo mutuo en los trabajos diarios.' }
  ];

  return (
    <div style={{ paddingTop: '70px' }}>
      {/* Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Nosotros</h1>
          <p className="page-subtitle">Conoce nuestra historia, misión y valores</p>
        </div>
      </div>

      {/* ─── HISTORIA ─────────────────────────────────────────── */}
      <section className="historia">
        <div className="container">
          <div className="historia-grid">
            {/* Texto de la historia */}
            <div className="historia-content">
              <span className="historia-badge">Nuestra Historia</span>
              <h2>Clínica de Aros Reto S.A.C.</h2>
              <p>
                La Empresa inicio sus actividades el <strong>01 de octubre del 2010</strong> con el nombre de{' '}
                <strong>AROS RETO</strong>, fundada por el Sr. <strong>Julio Reto Sosa</strong>, la cual después
                tuvo el apoyo de su hermano <strong>Andrés Reto Sosa</strong>. Ellos formaron parte de varias
                empresas dedicadas a la reparación de aros y se especializaron e invirtieron un capital para
                la creación de la empresa.
              </p>
              <p>
                Con la satisfacción del cliente como objetivo principal, la empresa transitó un ininterrumpido
                crecimiento debido a las competencias del medio y a lo difícil del mercado automotriz, la cual
                se tradujo en el desarrollo de objetivos y metas que se fueron consiguiendo durante el tiempo
                con un trabajo de buena calidad y garantía para nuestros clientes a nivel local y próximamente
                a nivel nacional.
              </p>
              <p>
                Debido al crecimiento, al inicio del <strong>2016</strong> gestionamos el cambio de razón social
                de la empresa por <strong>CLINICA DE AROS RETO S.A.C.</strong>, la cual hoy en día contamos con
                una buena imagen de calidad en el mercado automotriz debido a nuestro servicio de reparaciones
                de aros; y seguiremos con la misma actitud de trabajo, demostrando solidez y garantía ya que
                contamos con el personal adecuado para alcanzar el éxito.
              </p>
            </div>
            {/* Imagen decorativa con gradiente y badge de años */}
            <div className="historia-imagen">
              <div className="historia-imagen-box">
                <GiCarWheel className="historia-icon" />
                <div className="historia-imagen-badge">
                  <span className="badge-number">10+</span>
                  <span className="badge-label">Años de Experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MISIÓN Y VISIÓN ──────────────────────────────────── */}
      <section className="mision-vision">
        <div className="container">
          <div className="mv-grid">
            {/* Tarjeta de Misión (fondo azul) */}
            <div className="mv-card mision">
              <FaQuoteLeft className="mv-icon" />
              <h3>Misión</h3>
              <p>
                Somos una empresa sólida que contamos con talento Humano calificado para brindar
                un servicio de calidad en la reparación de aros de aleación de todo tipo de
                automóviles, proporcionándoles a nuestros clientes un servicio de calidad,
                confianza, seguridad y satisfacción.
              </p>
            </div>
            {/* Tarjeta de Visión (fondo dorado) */}
            <div className="mv-card vision">
              <FaQuoteLeft className="mv-icon" />
              <h3>Visión</h3>
              <p>
                Ser reconocidos a nivel Nacional como la mejor opción en la reparación y
                mantenimiento de aros de aleación de todo tipo de automóviles, brindando
                un servicio de calidad a nuestros consumidores, tal como ellos lo exigen,
                y se lo merecen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALORES ───────────────────────────────────────────── */}
      <section className="valores">
        <div className="container">
          <h2 className="section-title">Nuestros Valores</h2>
          <p className="section-subtitle">Principios que guían nuestro trabajo diario</p>
          <div className="valores-grid">
            {valores.map((valor, idx) => (
              <div key={idx} className="valor-card card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <valor.icon className="valor-icon" />
                <h3>{valor.titulo}</h3>
                <p>{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
