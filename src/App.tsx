import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calculator, thermometer, newspaper, star, search, fileTray } from 'ionicons/icons';
import Multas from './pages/Multas';
import Consultas from './pages/Consultas';
import Tarifario from './pages/Tarifario';
import Noticias from './pages/Noticias';
import Clima from './pages/Clima';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet placeholder="">
          <Route exact path="/multas">
            <Multas />
          </Route>
          <Route exact path="/consultas">
            <Consultas />
          </Route>
          <Route exact path="/tarifario">
            <Tarifario />
          </Route>
          <Route exact path="/noticias">
            <Noticias />
          </Route>
          <Route exact path="/clima">
            <Clima />
          </Route>
          <Route exact path="/horoscopo">
            <Consultas />
          </Route>
          <Route exact path="/">
            <Redirect to="/multas" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="multas" href="/multas">
            <IonIcon aria-hidden="true" icon={fileTray} />
            <IonLabel>Multas</IonLabel>
          </IonTabButton>
          <IonTabButton tab="consultas" href="/consultas">
            <IonIcon aria-hidden="true" icon={search} />
            <IonLabel>Consulta</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tarifario" href="/tarifario">
            <IonIcon aria-hidden="true" icon={calculator} />
            <IonLabel>Tarifario</IonLabel>
          </IonTabButton>
          <IonTabButton tab="noticias" href="/noticias">
            <IonIcon aria-hidden="true" icon={newspaper} />
            <IonLabel>Noticias</IonLabel>
          </IonTabButton>
          <IonTabButton tab="clima" href="/clima">
            <IonIcon aria-hidden="true" icon={thermometer} />
            <IonLabel>Clima</IonLabel>
          </IonTabButton>
          <IonTabButton tab="horoscopo" href="/horoscopo">
            <IonIcon aria-hidden="true" icon={star} />
            <IonLabel>Horóscopo</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
