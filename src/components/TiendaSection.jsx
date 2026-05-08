import React, { useState } from 'react';
import './TiendaSection.css';

// --- Iconos SVG ---
const CartIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const SparkleIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#00d655" stroke="#00d655" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
  </svg>
);

// --- Base de datos de productos ---
const productos = [
  { id: 1, nombre: 'Wahl Cordless Senior', precio: 179.99, envio: 'Envío Rápido', imagen: 'https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', categoria: 'Herramientas' },
  { id: 2, nombre: 'Kit de Navaja Dovo', precio: 179.99, envio: 'Envío Rápido', imagen: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', categoria: 'Herramientas' },
  { id: 3, nombre: 'Pomp Clay 100g', precio: 24.99, envio: 'Envío Rápido', imagen: 'https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', categoria: 'Productos' },
  { id: 4, nombre: 'Aceite de Barba Citrus', precio: 19.99, envio: 'Envío Rápido', imagen: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', categoria: 'Productos' },
  { id: 5, nombre: 'Tijeras Jaguar 6"', precio: 119.99, envio: 'Envío Rápido', imagen: 'https://images.unsplash.com/photo-1621607512214-68297480165e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', categoria: 'Herramientas' },
  { id: 6, nombre: 'Gel Extra Fuerte', precio: 15.99, envio: 'Envío Rápido', imagen: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', categoria: 'Productos' },
];

// --- Componentes Pequeños ---

// 1. Recibimos la función agregarAlCarrito como Prop
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
        <p className="product-card-shipping">{producto.envio}</p>
      </div>
      {/* 2. Disparamos la función al hacer clic */}
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

// 3. Recibimos los productos actualizados del carrito y la función para eliminar
const CartSidebar = ({ productosCarrito, eliminarDelCarrito }) => {
    
    // Calculamos el total dinámicamente sumando los precios
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
                          {/* Botón X para eliminar del carrito */}
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
                {/* Mostramos el total calculado con 2 decimales */}
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
  
  // A. ESTADO DEL CARRITO (Inicia vacío)
  const [carrito, setCarrito] = useState([]);

  // B. FUNCIÓN PARA AGREGAR
  const agregarAlCarrito = (producto) => {
    // Creamos una copia del producto y le asignamos un ID único 
    // (por si el usuario agrega el mismo producto dos veces)
    const nuevoProducto = { ...producto, idCarrito: Date.now() + Math.random() };
    
    // Actualizamos el estado sumando el nuevo producto a los que ya estaban
    setCarrito([...carrito, nuevoProducto]);
  };

  // C. FUNCIÓN PARA ELIMINAR (Opcional pero muy recomendada)
  const eliminarDelCarrito = (idCarrito) => {
    const nuevoCarrito = carrito.filter(item => item.idCarrito !== idCarrito);
    setCarrito(nuevoCarrito);
  };

  const tabs = [
    { nombre: 'Herramientas', icono: '✂️' },
    { nombre: 'Productos', icono: '🧴' },
    { nombre: 'Accesorios', icono: '🛍️' }
  ];

  // Filtramos los productos según la pestaña activa
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

        <div className="product-grid">
          {/* Pasamos la función de agregar como Prop a cada tarjeta */}
          {productosFiltrados.map(producto => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              agregarAlCarrito={agregarAlCarrito} 
            />
          ))}
        </div>
      </div>
      
      {/* Pasamos el estado del carrito y la función de eliminar al Sidebar */}
      <CartSidebar 
        productosCarrito={carrito} 
        eliminarDelCarrito={eliminarDelCarrito}
      />

      {/* //<SparkleIcon className="corner-sparkle-icon" /> */}
    </div>
  );
};

export default TiendaSection;