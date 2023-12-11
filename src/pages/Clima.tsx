import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { getCurrentLocationWeather } from '../services/weather';

const Clima: React.FC = () => {
    const [weather, setWeather] = useState<string>();

    useEffect(() => {
        (async () => {
            const { coords } = await Geolocation.getCurrentPosition();
            const currentLocationWeather = await getCurrentLocationWeather(coords.latitude, coords.longitude);

            setWeather(currentLocationWeather);
        })();
    }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clima</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clima</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section style={{ display: 'flex', height: '85vh', justifyContent: 'center', alignItems: 'center' }}>
            <p dangerouslySetInnerHTML={{ __html: weather || '' }}></p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Clima;
