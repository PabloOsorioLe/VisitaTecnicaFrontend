import React, { useState, useEffect } from 'react';
import Notification from '../components/Notification';
import html2pdf from 'html2pdf.js';

const FormularioIngreso1 = () => {
  const [cliente, setCliente] = useState('');
  const [fecha, setFecha] = useState('');
  const [direccion, setDireccion] = useState('');
  const [faenaLugar, setFaenaLugar] = useState('');
  const [maquina, setMaquina] = useState('');
  const [entrada, setEntrada] = useState('00:00'); // Hora inicial en 00:00
  const [salida, setSalida] = useState('00:00'); // Hora inicial en 00:00
  const [destinatario, setDestinatario] = useState('');
  const [equipo, setEquipo] = useState('');
  const [horas, setHoras] = useState('');
  const [trabajoRealizado, setTrabajoRealizado] = useState('');
  const [estadoMaquina, setEstadoMaquina] = useState('');
  const [trabajoEfectuados, setTrabajoEfectuados] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [lubricantes, setLubricantes] = useState({
    carter: '',
    transmision: '',
    caja: '',
    diferencial: '',
    hidraulico: '',
    grasas: '',
  });

  
  const [estadoFiltros, setEstadoFiltros] = useState({
    motor: '',
    aire: '',
    convertidor: '',
    hidraulico: '',
    respiraderos: '',
    combustible: '',
  });
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

// Se setea la fecha cuando el componente se monta
useEffect(() => {
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  setFecha(formattedDate); // Seteamos la fecha en el estado
}, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si falta algún dato
    //if (!cliente || !fecha || !direccion || !faenaLugar || !maquina || !entrada || !salida || !destinatario || !equipo || !horas || !trabajoRealizado || !estadoMaquina || !trabajoEfectuados || !observaciones) {
      //setNotification({
        //message: 'Por favor, completa todos los campos.',
        //type: 'error',
        //visible: true,
      //});
      //return;
    //}

   // Asegurarse de que la fecha esté en formato correcto (YYYY-MM-DD)
   if (!fecha) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFecha(formattedDate);
  }
    
    // Validar el formato del correo electrónico
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(destinatario)) {
      setNotification({
        message: 'Por favor, ingresa un correo electrónico válido.',
        type: 'error',
        visible: true,
      });
      return;
    }

    const data = {
      cliente,
      fecha,
      direccion,
      faenaLugar,
      maquina,
      entrada,
      salida,
      destinatario,
      equipo,
      horas,
      trabajoRealizado,
      estadoMaquina,
      trabajoEfectuados,
      observaciones,
      lubricantes,
      estadoFiltros,
    };

    fetch('http://localhost:5000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log('Código de respuesta:', response.status);
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Error al enviar el correo.'); // Muestra el mensaje de error recibido
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log('Éxito:', data);
        setNotification({
          message: data.message, // Muestra el mensaje de éxito del servidor
          type: 'success',
          visible: true,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        setNotification({
          message: 'Hubo un error al enviar el correo: ' + error.message,
          type: 'error',
          visible: true,
        });
      });

    // Limpiar el formulario (opcional)
    setCliente('');
    setFecha('');
    setDireccion('');
    setFaenaLugar('');
    setMaquina('');
    setEntrada('00:00');
    setSalida('00:00');
    setDestinatario('');
    setEquipo('');
    setHoras('');
    setTrabajoRealizado('');
    setEstadoMaquina('');
    setTrabajoEfectuados('');
    setObservaciones('');
    setLubricantes({
      carter: '',
      transmision: '',
      caja: '',
      diferencial: '',
      hidraulico: '',
      grasas: '',
    });
    setEstadoFiltros({
      motor: '',
      aire: '',
      convertidor: '',
      hidraulico: '',
      respiraderos: '',
      combustible: '',
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, visible: false });
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('pdf-content');
    const options = {
      margin: 0.5, // Ajusta los márgenes
      filename: 'formulario_ingreso.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 }, // Aumentar el zoom para mejor calidad
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
  
    html2pdf().from(element).set(options).save();
  };

  return (
    <div>
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}

      <div id="pdf-content" className="datos" style={{ padding: '5px', width: '90%', maxWidth: '800px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#333',margin:'0px' }}>Formulario de Registro</h2>
        
        <h3 style={{ fontSize: '1.4em', color: '#333', marginBottom: '2px',margin:'0px' }}>Informe Técnico</h3>
        
        <div style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '10px', marginBottom: '2px' }}>
          {/* Campos de datos hasta Trabajo que realiza */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 2 }}>
              <label htmlFor="cliente" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Cliente:</label>
              <input
                type="text"
                id="cliente"
                name="cliente"
                placeholder="Ingrese el nombre del cliente"
                value={cliente}
                onChange={(e) => setCliente(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="fecha" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>

          {/* Otros campos */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 2 }}>
              <label htmlFor="direccion" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Dirección:</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                placeholder="Ingrese la dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="faenaLugar" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Faena Lugar:</label>
              <input
                type="text"
                id="faenaLugar"
                name="faenaLugar"
                placeholder="Ingrese Faena/Lugar"
                value={faenaLugar}
                onChange={(e) => setFaenaLugar(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <div style={{ flex: 2 }}>
              <label htmlFor="maquina" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Máquina:</label>
              <input
                type="text"
                id="maquina"
                name="maquina"
                placeholder="Ingrese el nombre de la máquina"
                value={maquina}
                onChange={(e) => setMaquina(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="entrada" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Entrada:</label>
              <input
                type="time"
                id="entrada"
                name="entrada"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="salida" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Salida:</label>
              <input
                type="time"
                id="salida"
                name="salida"
                value={salida}
                onChange={(e) => setSalida(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
           

            <div style={{ flex: 2 }}>
              <label htmlFor="equipo" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Equipo:</label>
              <input
                type="text"
                id="equipo"
                name="equipo"
                placeholder="Ingrese el equipo"
                value={equipo}
                onChange={(e) => setEquipo(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label htmlFor="horas" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Horas:</label>
              <input
                type="number"
                id="horas"
                name="horas"
                placeholder="Ingrese horas"
                value={horas}
                onChange={(e) => setHoras(e.target.value)}
                style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="trabajoRealizado" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Trabajo que realiza:</label>
            <textarea
              id="trabajoRealizado"
              name="trabajoRealizado"
              rows="4"
              value={trabajoRealizado}
              onChange={(e) => setTrabajoRealizado(e.target.value)}
              style={{ width: '95%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px', resize: 'none',height:'20px' }}
            />
          </div>

         
        </div>

        <h3 style={{ fontSize: '1.4em', color: '#333', marginBottom: '0px',margin:'0px' }}>Lubricantes empleados</h3>
        <div style={{ display: 'flex', gap: '10px', border: '1px solid #ccc', borderRadius: '10px', padding: '5px', marginBottom: '1px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="carter" style={{ color: '#555' }}>Carter:</label>
            <input
              type="text"
              id="carter"
              value={lubricantes.carter}
              onChange={(e) => setLubricantes({ ...lubricantes, carter: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="transmision" style={{ color: '#555' }}>Transmisión:</label>
            <input
              type="text"
              id="transmision"
              value={lubricantes.transmision}
              onChange={(e) => setLubricantes({ ...lubricantes, transmision: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="caja" style={{ color: '#555' }}>Caja:</label>
            <input
              type="text"
              id="caja"
              value={lubricantes.caja}
              onChange={(e) => setLubricantes({ ...lubricantes, caja: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="diferencial" style={{ color: '#555' }}>Diferencial:</label>
            <input
              type="text"
              id="diferencial"
              value={lubricantes.diferencial}
              onChange={(e) => setLubricantes({ ...lubricantes, diferencial: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="hidraulico" style={{ color: '#555' }}>Hidráulico:</label>
            <input
              type="text"
              id="hidraulico"
              value={lubricantes.hidraulico}
              onChange={(e) => setLubricantes({ ...lubricantes, hidraulico: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="grasas" style={{ color: '#555' }}>Grasas:</label>
            <input
              type="text"
              id="grasas"
              value={lubricantes.grasas}
              onChange={(e) => setLubricantes({ ...lubricantes, grasas: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
        </div>

        <h3 style={{ fontSize: '1.4em', color: '#333', marginBottom: '0px',margin:'0px' }}>Estado Filtros</h3>
        <div style={{ display: 'flex', gap: '10px', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', marginBottom: '1px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="motor" style={{ color: '#555' }}>Motor:</label>
            <input
              type="text"
              id="motor"
              value={estadoFiltros.motor}
              onChange={(e) => setEstadoFiltros({ ...estadoFiltros, motor: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="aire" style={{ color: '#555' }}>Aire:</label>
            <input
              type="text"
              id="aire"
              value={estadoFiltros.aire}
              onChange={(e) => setEstadoFiltros({ ...estadoFiltros, aire: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="convertidor" style={{ color: '#555' }}>Convertidor:</label>
            <input
              type="text"
              id="convertidor"
              value={estadoFiltros.convertidor}
              onChange={(e) => setEstadoFiltros({ ...estadoFiltros, convertidor: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="hidraulicoFiltro" style={{ color: '#555' }}>Hidráulico:</label>
            <input
              type="text"
              id="hidraulicoFiltro"
              value={estadoFiltros.hidraulico}
              onChange={(e) => setEstadoFiltros({ ...estadoFiltros, hidraulico: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="respiraderos" style={{ color: '#555' }}>Respiradores:</label>
            <input
              type="text"
              id="respiraderos"
              value={estadoFiltros.respiraderos}
              onChange={(e) => setEstadoFiltros({ ...estadoFiltros, respiraderos: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="combustible" style={{ color: '#555' }}>Combustible:</label>
            <input
              type="text"
              id="combustible"
              value={estadoFiltros.combustible}
              onChange={(e) => setEstadoFiltros({ ...estadoFiltros, combustible: e.target.value })}
              style={{ width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '20px', padding: '5px', border: '1px solid #ccc', borderRadius: '10px' }}>
  <label htmlFor="estadoMaquina" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Estado de la Máquina:</label>
  <input
    type="text"
    id="estadoMaquina"
    value={estadoMaquina}
    onChange={(e) => setEstadoMaquina(e.target.value)}
    style={{ width: '95%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}
  />

  <label htmlFor="trabajoEfectuados" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Trabajo Efectuados:</label>
  <input
    type="text"
    id="trabajoEfectuados"
    value={trabajoEfectuados}
    onChange={(e) => setTrabajoEfectuados(e.target.value)}
    style={{ width: '95%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px', marginBottom: '10px' }}
  />

  <label htmlFor="observaciones" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Observaciones:</label>
  <input
    type="text"
    id="observaciones"
    value={observaciones}
    onChange={(e) => setObservaciones(e.target.value)}
    style={{ width: '95%', padding: '5px', border: '1px solid #ddd', borderRadius: '5px' }}
  />
  
</div>
{/* Espacio adicional antes del siguiente grupo de inputs */}
<div style={{ marginBottom: '20px' }}></div>

        <div style={{ flex: 2 }}>
              <label htmlFor="destinatario" style={{ color: '#555', marginBottom: '10px', display: 'block' }}>Destinatario:</label>
              <input
                type="email"
                id="destinatario"
                name="destinatario"
                placeholder="Ingrese el correo del destinatario"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
                style={{ width: '90%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            
             
          {/* Espacio adicional antes del siguiente grupo de inputs */}
          <div style={{ marginBottom: '20px' }}></div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '10px' }}>
            <button
              type="submit"
              onClick={handleSubmit}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1976D2'} // Color al pasar el mouse
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2196F3'} // Color original
              style={{ padding: '5px 15px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Enviar Correo
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#388E3C'} // Color al pasar el mouse
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'} // Color original
              style={{ padding: '5px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Descargar PDF
            </button>
          </div>

      </div>
    </div>
  );
};

export default FormularioIngreso1;
