import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tarifario.css';

const multas = [
  {descripcion: "No cruzar por los puentes para peatones", precio: "1,000.00"},
  {descripcion: "Conducir un vehículo con exceso de pasajero", precio: "1,000.00"},
  {descripcion: "Transportar más de dos pasajero en el asiento delantero", precio: "1,000.00"},
  {descripcion: "No tener marbete de revistas autorizadas", precio: "1,000.00"},
  {descripcion: "Transportar bultos que impidan la fácil retrovisión al conductor", precio: "1,000.00"},
  {descripcion: "Cristales Tintados", precio: "1,000.00"},
  {descripcion: "No detener la marcha cuando un vehículo escolar está montando o desmontando pasajero", precio: "1,000.00"},
  {descripcion: "Tirar desperdicios en la vía publica", precio: "1,000.00"},
  {descripcion: "Pararse en la calzada para ofrecer ventas de productos de cualquier clase", precio: "1,000.00"},
  {descripcion: "Circular en oposición a las órdenes y señales del agente de transito", precio: "1,000.00"},
  {descripcion: "Transitar sin Casco", precio: "1,000.00"},
  {descripcion: "Transitar sin marbetes de placas o vencidas", precio: "1,000.00"},
  {descripcion: "Transitar con luces apagadas", precio: "1,000.00"},
  {descripcion: "Transitar con las luces altas en calles alumbradas", precio: "1,000.00"},
  {descripcion: "No llevar luz roja en parte posterior", precio: "1,000.00"},
  {descripcion: "No tener luces direccionales", precio: "1,000.00"},
  {descripcion: "Transitar en vehículo con guías a la derecha", precio: "1,000.00"},
  {descripcion: "No tener parabrisas", precio: "1,000.00"},
  {descripcion: "No espejo retrovisor", precio: "1,000.00"},
  {descripcion: "Producir ruidos innecesarios", precio: "1,000.00"},
  {descripcion: "No tener silenciador de tubo de escape", precio: "1,000.00"},
  {descripcion: "No banderas rojas, lonas y otras medidas de seguridad", precio: "1,000.00"},
  {descripcion: "Transitar sin equipos de emergencias", precio: "1,000.00"},
  {descripcion: "Transportar carga que sobresalga más de lo autorizado en la parte delantera", precio: "1,000.00"},
  {descripcion: "Transportar pasajero en vehículos para carga", precio: "1,000.00"},
  {descripcion: "Prohibiciones sobre matrículas y placas", precio: "1,000.00"},
  {descripcion: "Transitar sin placa", precio: "1,000.00"},
  {descripcion: "Aditamento en placas", precio: "1,000.00"},
  {descripcion: "Conducir sin portar licencia", precio: "1,000.00"},
  {descripcion: "Conducir con licencia vencida", precio: "1,000.00"},
  {descripcion: "Conducir con licencia de categoría inferior con permiso de aprendizaje o fotocopia", precio: "1,000.00"},
  {descripcion: "Aviso inmediato a la policía", precio: "1,000.00"},
  {descripcion: "Información falsa", precio: "1,000.00"},
  {descripcion: "Dar reversa obstruyendo el transito", precio: "1,000.00"},
  {descripcion: "No ceder el paso a vehículos de emergencia", precio: "1,000.00"},
  {descripcion: "Giro prohibido/ Dar Vuelta en U", precio: "1,000.00"},
  {descripcion: "Estacionarse en acera y lugares prohibidos", precio: "1,000.00"},
  {descripcion: "Obstruir el paso peatonal", precio: "1,000.00"},
  {descripcion: "Tomar o desmontar pasajero en zonas prohibida", precio: "1,000.00"},
  {descripcion: "Estacionarse en paradas de guaguas", precio: "1,000.00"},
  {descripcion: "Obstruir el transito", precio: "1,000.00"},
  {descripcion: "Violar señales de tránsito", precio: "1,000.00"},
  {descripcion: "Violar la señal de PARE", precio: "1,000.00"},
  {descripcion: "Transitar en vía contraria", precio: "1,000.00"},
  {descripcion: "Estacionar al lado del contén pintado de amarillo", precio: "1,000.00"},
  {descripcion: "No Franja refractiva", precio: "1,000.00"},
  {descripcion: "No tener seguro o vencido", precio: "1,000.00"},
  {descripcion: "Transitar por lugares prohibidos", precio: "1,000.00"},
  {descripcion: "Transitar sin Tablilla", precio: "1,000.00"},
  {descripcion: "Transitar con niños en asientos delantero", precio: "1,667.00"},
  {descripcion: "Transitar sin cinturón", precio: "1,667.00"},
  {descripcion: "Conducir a exceso de velocidad", precio: "1,667.00"},
  {descripcion: "Manejo Temerario", precio: "1,667.00"},
  {descripcion: "Conducir en estado de embriaguez", precio: "1,667.00"},
  {descripcion: "Violar la Luz roja", precio: "1,667.00"},
  {descripcion: "Hablando por celular", precio: "1,667.00"}
];

const Tarifario: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tarifario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tarifario</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <section className='ion-margin'>
          <table style={{ borderCollapse: 'separate', borderSpacing: '5px 25px' }}>
            <thead>
              <th className='ion-text-left'>
                Descripción
              </th>
              <th>
                Monto
              </th>
            </thead>
            <tbody>
              {multas.map(multa => (
                <tr>
                  <td>
                    {multa.descripcion}
                  </td>
                  <td>{multa.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Tarifario;
