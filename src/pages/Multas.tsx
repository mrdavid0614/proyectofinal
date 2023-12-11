import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { MapOptions, latLng, map, marker, tileLayer } from 'leaflet';
import { getFromDB } from '../services/storage';
import { FINES_TABLE } from '../constants';
import './Multas.css';
import { Fine } from '../types/fine';
import { add } from 'ionicons/icons';

const Multas: React.FC = () => {
  const [fines, setFines] = useState<Fine[]>([]);
  const mapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options: MapOptions = {
      center: latLng(19, -69.9312),
      zoom: 8,
    };
    const mymap = map('map', options);

    (async () => {
      const fetchedFines = await getFromDB(FINES_TABLE);
      const parsedFines = JSON.parse(fetchedFines ?? '{}');

      if (parsedFines instanceof Array) {
        tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`,{
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          crossOrigin: true
        }).addTo(mymap);
    
        fines.forEach((fine: Fine) => {
          marker([fine.latitude, fine.longitude])
          .addTo(mymap)
          .bindPopup(`Cédula: ${fine.id} \n\n
          Placa: ${fine.vehiclePlate} \n\n
          Motivo: ${fine.reason}Comentario: ${fine.comment}`);
        });

        setFines(parsedFines);
      }
    })();

    return () => {
      mymap.remove();
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multas</IonTitle>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon icon={add} style={{ fontSize: 24 }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Multas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section>
            <div style={{ marginTop: '10px', marginLeft: '10px' }}>
              <IonButton onClick={() => mapRef.current?.scrollIntoView({ behavior: 'smooth' })}>Ver mapa</IonButton>
            </div>
          {fines.map((fine: Fine) => (
            <IonCard key={fine.id}>
              <IonCardHeader>
                  <IonCardTitle>{fine.vehiclePlate}</IonCardTitle>
                  <IonCardSubtitle>{Intl.DateTimeFormat('es-do').format(new Date(fine.date))}</IonCardSubtitle>
              </IonCardHeader>
      
              <IonCardContent>
                  <p>Cédula: {fine.id}</p>
                  <p>Descripción: {fine.reason}</p>
                  <br />
                  <p>Comentario: {fine.comment}</p>
              </IonCardContent>
          </IonCard>
        ))}
        </section>

        <section id='map' ref={mapRef}>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Multas;
