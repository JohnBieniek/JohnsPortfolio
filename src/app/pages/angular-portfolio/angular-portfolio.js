import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {

  BreadcrumbsComponent,
} from '../../shared/breadcrumbs/breadcrumbs-component';
import { ProjectsLink } from '../../shared/projects-link/projects-link';

@Component({
  selector: 'app-angular-portfolio',
  standalone: true,
  imports: [BreadcrumbsComponent, ProjectsLink],
  templateUrl: './angular-portfolio.html',
  styleUrl: './angular-portfolio.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AngularPortfolio {constructor() { AngularPortfolio.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'Portfolio', route: '/projects/angular-portfolio' },
    { label: 'Overview' },
  ]}
}
