import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { MapOptions, latLng, map, marker, tileLayer } from 'leaflet';
import { add, imageOutline } from 'ionicons/icons';
import { getFromDB, saveToDB } from '../services/storage';
import { FINES_TABLE, VEHICLES_TABLE } from '../constants';
import './Multas.css';
import { Fine } from '../types/fine';

const Multas: React.FC = () => {
  const [fines, setFines] = useState<Fine[]>([]);
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [showCreateFineModal, setShowCreateFineModal] = useState(false);
  const mapRef = useRef<HTMLElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const fetchedFines = getFromDB(FINES_TABLE);
      const parsedFines = JSON.parse(fetchedFines ?? '{}');

      if (parsedFines instanceof Array) {
        setFines(parsedFines);
      }
    })();
  }, []);

  useEffect(() => {
    if (fines.length)
      saveToDB(FINES_TABLE, JSON.stringify(fines));

    const options: MapOptions = {
      center: latLng(19, -69.9312),
      zoom: 8,
    };
    const mymap = map('map', options);

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

    return () => {
      mymap.remove();
    }
  }, [fines]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target as HTMLFormElement);
    let photoSrc = '';

    if (data.has('photo')) {
      const getPhotoSrc = async (): Promise<string> => new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(reader.result as string);
        }

        reader.onerror = () => reject();

        reader.readAsDataURL(data.get('photo') as File ?? new Blob());
      });

      photoSrc = await getPhotoSrc();
    }

    const newFine: Fine = {
      id: data.get('id') as string ?? '',
      vehiclePlate: data.get('vehiclePlate') as string ?? '',
      reason: data.get('reason') as string ?? '',
      comment: data.get('comment') as string ?? '',
      latitude: parseFloat(data.get('latitude') as string ?? '0'),
      longitude: parseFloat(data.get('longitude') as string ?? '0'),
      date: data.get('date') as string ?? '',
      photo: photoSrc,
      voiceNote: ''
    };

    setFines((prevFines) => prevFines.concat(newFine));
    setShowCreateFineModal(false);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Multas</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => setShowCreateFineModal(true)}>
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
            <IonCard key={fine.id} onClick={() => setSelectedFine(fine)}>
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

        <IonModal isOpen={!!selectedFine}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Multa a {selectedFine?.vehiclePlate}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedFine(null)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <p>
              Cédula: {selectedFine?.id}
            </p>

            <p>
              Fecha: {selectedFine && Intl.DateTimeFormat('es-do').format(new Date(selectedFine.date))}
            </p>

            <p>
              Descripción: {selectedFine?.reason}
            </p>

            <p>
              Ubicación: {selectedFine?.latitude},{selectedFine?.longitude}
            </p>

            <p>
              Comentario: {selectedFine?.comment}
            </p>

            {selectedFine?.voiceNote && (
              <p>
                Audio: <audio src={selectedFine?.voiceNote}></audio>
              </p>
            )}

            {selectedFine?.photo && (
              <div>
                <img src={selectedFine.photo} alt="Multa imagen" />
              </div>
            )}
          </IonContent>
        </IonModal>

        <IonModal isOpen={showCreateFineModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Crear multa</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowCreateFineModal(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <form onSubmit={handleSubmit}>
              <IonInput className="ion-margin-vertical" required name="id" label="Cédula" labelPlacement="floating" fill="outline" placeholder="000-0000000-0" />
              <IonInput className="ion-margin-vertical" required name="vehiclePlate" label="Placa" labelPlacement="floating" fill="outline" placeholder="6423189" />
              <IonTextarea className="ion-margin-vertical" required name="reason" label="Motivo" labelPlacement="floating" fill="outline" placeholder="Razón de la multa" />
              <IonTextarea className="ion-margin-vertical" required name="comment" label="Comentario" labelPlacement="floating" fill="outline" placeholder="Comentario de la multa" />
              <IonInput className="ion-margin-vertical" required name="latitude" label="Latitud" labelPlacement="floating" fill="outline" />
              <IonInput className="ion-margin-vertical" required name="longitude" label="Longitud" labelPlacement="floating" fill="outline" />
              <IonInput className="ion-margin-vertical" required name="date" label="Fecha" labelPlacement="floating" fill="outline" type="date" />
              <input hidden accept="image/*;capture=camera" required name="photo" ref={fileInput} type="file" />
              <IonButton className="ion-margin-vertical" expand="full" color="dark" onClick={() => fileInput.current?.click()}>
                <IonIcon icon={imageOutline} />
              </IonButton>
              
              <IonButton type="submit" expand="full">
                Guardar
              </IonButton>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Multas;
