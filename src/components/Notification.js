// src/components/Notification.js
import React, { useEffect } from 'react';
import './Notification.css'; // Asegúrate de tener este archivo CSS

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    // Cierra la notificación después de 2 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Cambiado a 2000 ms (2 segundos)

    // Limpia el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
