import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  BreadcrumbsComponent,

} from '../../shared/breadcrumbs/breadcrumbs-component';

@Component({
  selector: 'app-sophia',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './sophia.html',
  styleUrl: './sophia.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Sophia {constructor() { Sophia.prototype.__init.call(this); }
   __init() {this.breadcrumbs = [
    { label: 'SOPHIA', route: '/projects/sophia' },
    { label: 'Overview' },
  ]}
}
