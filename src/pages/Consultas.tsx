import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLabel, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Driver } from '../types/driver';
import { Vehicle } from '../types/vehicle';
import './Consultas.css';

const info: { vehicle: Vehicle[], driver: Driver[] } = {
  vehicle: [
    {
      plate: 'A123456',
      owner: '1',
    }
  ],
  driver: [
    {
      license: '1',
      name: 'Fulano de tal',
      phone: '809-999-9999',
      address: 'La casita',
      photo: 'https://cdn-icons-png.flaticon.com/512/4792/4792929.png',
      birthdate: new Date().toLocaleDateString(),
    }
  ],
}

const Consultas: React.FC = () => {
  const [currentView, setCurrentView] = useState<'vehicle' | 'driver'>('vehicle');
  const [search, setSearch] = useState('');
  const [data, setData] = useState<(Vehicle[] | Driver[])>([]);

  useEffect(() => {
    if (!search) return;

    const filteredData = currentView === 'vehicle' ? 
      info[currentView].filter(vehicle => vehicle.plate.toLowerCase().includes(search.toLowerCase()))
      : info[currentView].filter(driver => driver.license.toLowerCase().includes(search.toLowerCase()));

    setData(filteredData);
  }, [search]);

  useEffect(() => {
    setData([]);
  }, [currentView]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Consultas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Consultas</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonSegment defaultValue="vehicle" onIonChange={(e) => setCurrentView(e.detail.value as typeof currentView ?? 'vehicle')}>
          <IonSegmentButton value="vehicle">
            <IonLabel>Vehículo</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="driver">
            <IonLabel>Conductor</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonSearchbar className="ion-margin-top" placeholder={`Buscar por ${currentView === 'vehicle' ? 'placa' : 'licencia'}`} onIonChange={(e) => setSearch(e.detail.value as string)} />

        {(currentView === 'vehicle' && !!data.length) && (
          <section>
            {(data as Vehicle[]).map((vehicle) => (
              <IonCard key={vehicle.plate}>
                <IonCardHeader>
                    <IonCardTitle>{vehicle.plate}</IonCardTitle>
                </IonCardHeader>
        
                <IonCardContent>
                    <p>Placa: {vehicle.plate}</p>
                    <p>Dueño: {vehicle.owner}</p>
                </IonCardContent>
            </IonCard>
            ))}
          </section>
        )}

        {(currentView === 'driver' && !!data.length) && (
          <section>
            {(data as Driver[]).map((driver) => (
              <IonCard key={driver.license}>
                <IonCardHeader>
                    <IonCardTitle>{driver.name}</IonCardTitle>
                    <IonCardSubtitle>{driver.birthdate && Intl.DateTimeFormat('es-do').format(new Date(driver.birthdate))}</IonCardSubtitle>
                </IonCardHeader>
        
                <IonCardContent>
                    <p>Licencia: {driver.license}</p>
                    <p>Nombre: {driver.name}</p>
                    <p>Dirección: {driver.address}</p>
                    <p>Teléfono: {driver.phone}</p>
                    
                    {driver.photo && (
                      <div>
                        <img src={driver.photo} alt="Imagen del conductor" />
                      </div>
                    )}
                </IonCardContent>
            </IonCard>
            ))}
          </section>
        )}

        {!data.length && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '55vh' }}>
            <IonText>No se encontraron datos</IonText>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Consultas;
