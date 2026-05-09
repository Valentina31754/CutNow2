import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Asegúrate de que la ruta sea correcta

import './TiendaSection.css';

// --- Iconos SVG ---
const CartIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

// ¡Adiós a la base de datos falsa (const productos = [...])! La eliminamos.

// --- Componentes Pequeños ---
const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <div className="product-card">
      <div className="product-card-image-wrapper">
        <img src={producto.imagen} alt={producto.nombre} className="product-card-image" />
        <div className="product-card-image-shadow"></div>
      </div>
      <div className="product-card-details">
        <h3 className="product-card-name">{producto.nombre}</h3>
        <p className="product-card-price">${producto.precio}</p>
        
        {/* Texto fijo indicando la modalidad de entrega */}
        <p className="product-card-shipping" style={{ color: '#00d655', fontWeight: '500' }}>
          📍 Recogida en local
        </p>
      </div>
      <button 
        className="product-card-add-button"
        onClick={() => agregarAlCarrito(producto)}
      >
        <CartIcon />
        Añadir al Carrito
      </button>
    </div>
  );
};

const CartSidebar = ({ productosCarrito, eliminarDelCarrito }) => {
    const total = productosCarrito.reduce((suma, item) => suma + item.precio, 0);

    return (
        <aside className="cart-sidebar">
            <h2 className="cart-sidebar-title">
              Carrito {productosCarrito.length > 0 && `(${productosCarrito.length})`}
            </h2>
            
            <div className="cart-sidebar-items">
                {productosCarrito.length === 0 ? (
                  <p style={{color: '#aaa', textAlign: 'center'}}>Tu carrito está vacío</p>
                ) : (
                  productosCarrito.map(producto => (
                      <div key={producto.idCarrito} className="cart-sidebar-item">
                          <img src={producto.imagen} alt={producto.nombre} className="cart-sidebar-item-image" />
                          <div className="cart-sidebar-item-details">
                              <p className="cart-sidebar-item-name">{producto.nombre}</p>
                              <p className="cart-sidebar-item-price">${producto.precio}</p>
                          </div>
                          <button 
                            onClick={() => eliminarDelCarrito(producto.idCarrito)}
                            style={{background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '18px'}}
                          >
                            ×
                          </button>
                      </div>
                  ))
                )}
            </div>
            
            <div className="cart-sidebar-summary">
                <p className="cart-sidebar-total-label">Total</p>
                <p className="cart-sidebar-total-amount">${total.toFixed(2)}</p>
            </div>
            <button 
              className="cart-sidebar-checkout-button"
              disabled={productosCarrito.length === 0}
              style={{ opacity: productosCarrito.length === 0 ? 0.5 : 1 }}
            >
              Finalizar Compra
            </button>
        </aside>
    );
};

// --- COMPONENTE PRINCIPAL ---
const TiendaSection = () => {
  const [activeTab, setActiveTab] = useState('Herramientas');
  const [carrito, setCarrito] = useState([]);
  
  // ── NUEVOS ESTADOS PARA FIREBASE ──
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ── DESCARGAR DATOS DE FIREBASE ──
  useEffect(() => {
    async function cargarTienda() {
      try {
        // Apuntamos a la colección "Productos" en tu Firestore
        const snap = await getDocs(collection(db, "Productos"));
        const datos = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(datos);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setCargando(false);
      }
    }
    cargarTienda();
  }, []);

  const agregarAlCarrito = (producto) => {
    const nuevoProducto = { ...producto, idCarrito: Date.now() + Math.random() };
    setCarrito([...carrito, nuevoProducto]);
  };

  const eliminarDelCarrito = (idCarrito) => {
    const nuevoCarrito = carrito.filter(item => item.idCarrito !== idCarrito);
    setCarrito(nuevoCarrito);
  };

  const tabs = [
    { nombre: 'Herramientas', icono: '✂️' },
    { nombre: 'Productos', icono: '🧴' },
    { nombre: 'Accesorios', icono: '🛍️' }
  ];

  // El filtrado funciona igual, pero ahora sobre los datos de Firebase
  const productosFiltrados = productos.filter(p => p.categoria === activeTab);

  return (
    <div className="store-section-container">
      <div className="store-section-main-content">
        <header className="store-section-header">
          <h1 className="store-section-title">
            Tu Kit de Barbería de <span className="text-green">Élite, al instante.</span>
          </h1>
          <p className="store-section-subtitle">
            Equípate con lo mejor. CutNow presenta su exclusiva tienda profesional.
          </p>
        </header>

        <nav className="store-section-filters">
          {tabs.map(tab => (
            <button
              key={tab.nombre}
              className={`store-section-filter-button ${activeTab === tab.nombre ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.nombre)}
            >
              <span className="filter-icon" style={{ fontSize: '18px' }}>{tab.icono}</span>
              {tab.nombre}
            </button>
          ))}
        </nav>

        {/* ── MANEJO DEL ESTADO DE CARGA ── */}
        {cargando ? (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>
            Cargando inventario premium...
          </p>
        ) : productosFiltrados.length === 0 ? (
          <p style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>
            No hay productos disponibles en esta categoría por ahora.
          </p>
        ) : (
          <div className="product-grid">
            {productosFiltrados.map(producto => (
              <ProductCard 
                key={producto.id} 
                producto={producto} 
                agregarAlCarrito={agregarAlCarrito} 
              />
            ))}
          </div>
        )}
      </div>
      
      <CartSidebar 
        productosCarrito={carrito} 
        eliminarDelCarrito={eliminarDelCarrito}
      />
    </div>
  );
};

export default TiendaSection;