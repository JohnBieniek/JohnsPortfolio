
import { Home } from './pages/home/home';
import { TrialByRotation } from './pages/trial-by-rotation/trial-by-rotation';
import { JavaDemoOverviewComponent } from './pages/java-demo/java-demo-overview-component';
import { AccessibleScheduling } from './pages/accessible-scheduling/accessible-scheduling';
import { Sophia } from './pages/sophia/sophia';
import { MultiverseAdventurersGuild } from './pages/multiverse-adventurers-guild/multiverse-adventurers-guild';
import { AngularPortfolio } from './pages/angular-portfolio/angular-portfolio';
import { RetailRobotics } from './pages/retail-robotics/retail-robotics';
import { Contact } from './pages/contact/contact';
import { PropaneKioskPlatform } from './pages/propane-kiosk-platform/propane-kiosk-platform';
import { PaintReorderPlatform } from './pages/paint-reorder-platform/paint-reorder-platform';
import { LakelandCabaret } from './pages/lakeland-cabaret/lakeland-cabaret';

export const routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },
  {
    path: 'projects/accessible-scheduling',
    component: AccessibleScheduling,
  },
  {
    path: 'projects/lakeland-cabaret',
    component: LakelandCabaret,
  },
  {
    path: 'projects/sophia',
    component: Sophia,
  },
  {
    path: 'projects/multiverse-adventurers-guild',
    component: MultiverseAdventurersGuild,
  },
  {
    path: 'projects/angular-portfolio',
    component: AngularPortfolio,
  },
  {
    path: 'projects/retail-robotics',
    component: RetailRobotics,
  },
  {
    path: 'projects/propane-kiosk-platform',
    component: PropaneKioskPlatform,
  },
  {
    path: 'projects/paint-reorder-platform',
    component: PaintReorderPlatform,
  },
  {
    path: 'projects/trial-by-rotation',
    component: TrialByRotation,
  },
  {
    path: 'java-demo',
    component: JavaDemoOverviewComponent,
  },
  {
    path: 'contact',
    component: Contact,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
