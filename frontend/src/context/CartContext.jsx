import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [panelAbierto, setPanelAbierto] = useState(false);

  useEffect(() => {
    const guardado = localStorage.getItem('carrito');
    if (guardado) {
      try { setItems(JSON.parse(guardado)); } catch { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items));
  }, [items]);

  const agregar = (producto, cantidad = 1) => {
    setItems(prev => {
      const existe = prev.find(i => i._id === producto._id);
      if (existe) {
        return prev.map(i =>
          i._id === producto._id ? { ...i, cantidad: i.cantidad + cantidad } : i
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminar = (id) => {
    setItems(prev => prev.filter(i => i._id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) return eliminar(id);
    setItems(prev => prev.map(i =>
      i._id === id ? { ...i, cantidad } : i
    ));
  };

  const limpiar = () => setItems([]);

  const abrirPanel = () => setPanelAbierto(true);
  const cerrarPanel = () => setPanelAbierto(false);

  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);
  const totalPrecio = items.reduce((acc, i) => acc + (i.precio * i.cantidad), 0);

  return (
    <CartContext.Provider value={{ items, agregar, eliminar, actualizarCantidad, limpiar, totalItems, totalPrecio, panelAbierto, abrirPanel, cerrarPanel }}>
      {children}
    </CartContext.Provider>
  );
};
