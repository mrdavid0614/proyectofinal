import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getDigessetNews } from '../services/news';

const Noticias: React.FC = () => {
    const [news, setNews] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const digessetNews = await getDigessetNews();

            setNews(digessetNews);
            setIsLoading(false);
        })();
    }, []);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Noticias</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Noticias</IonTitle>
            </IonToolbar>
          </IonHeader>

            {isLoading && (
                <section style={{ display: 'flex', height: '85vh', alignItems: 'center', justifyContent: 'center' }}>
                    <IonSpinner />
                </section>
            )}

            {!isLoading && 
                <section>
                    {news.map((item) => (
                        <IonCard key={item.id}>
                            <IonCardHeader>
                                <IonCardTitle>{item.title?.rendered ?? ''}</IonCardTitle>
                                <IonCardSubtitle>{Intl.DateTimeFormat('es-do').format(new Date(item.date))}</IonCardSubtitle>
                            </IonCardHeader>
                    
                            <IonCardContent>
                                <p dangerouslySetInnerHTML={{ __html: item.excerpt?.rendered ?? '' }}></p>
                            </IonCardContent>
                        </IonCard>
                    ))}
                </section>
            }
        </IonContent>
      </IonPage>
    );
  };
  
  export default Noticias;
  