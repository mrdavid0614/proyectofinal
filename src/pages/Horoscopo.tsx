import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSelect, IonSelectOption } from "@ionic/react";
import { useEffect, useState } from "react";
import { getTodayZodiac } from "../services/zodiac";

const Horoscopo: React.FC = () => {
    const [selectedSign, setSelectedSign] = useState('');
    const [signData, setSignData] = useState('');

    useEffect(() => {
        if (selectedSign) {
            (async () => {
                const zodiac = await getTodayZodiac(selectedSign);

                if (!zodiac)
                    setSignData('');

                if (zodiac) {
                    setSignData(zodiac.data.horoscope_data);
                }
            })();
        }
    }, [selectedSign]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Horóscopo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Horóscopo</IonTitle>
          </IonToolbar>
        </IonHeader>

        <section className="ion-margin">
            <IonSelect placeholder="Signo zodiacal" onIonChange={(e) => setSelectedSign(e.detail.value)}>
                <IonSelectOption value="aries">Aries</IonSelectOption>
                <IonSelectOption value="taurus">Tauro</IonSelectOption>
                <IonSelectOption value="gemini">Géminis</IonSelectOption>
                <IonSelectOption value="cancer">Cáncer</IonSelectOption>
                <IonSelectOption value="leo">Leo</IonSelectOption>
                <IonSelectOption value="virgo">Virgo</IonSelectOption>
                <IonSelectOption value="libra">Libra</IonSelectOption>
                <IonSelectOption value="scorpio">Escorpio</IonSelectOption>
                <IonSelectOption value="sagittarius">Sagitario</IonSelectOption>
                <IonSelectOption value="capricorn">Capricornio</IonSelectOption>
                <IonSelectOption value="aquarius">Acuario</IonSelectOption>
                <IonSelectOption value="pisces">Piscis</IonSelectOption>
            </IonSelect>
            <p className="ion-margin">{signData || 'No hay zodiaco para mostrar'}</p>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Horoscopo;
