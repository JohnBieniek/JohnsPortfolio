
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';






@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './breadcrumbs-component.html',
  styleUrl: './breadcrumbs-component.css',
})
export class BreadcrumbsComponent {constructor() { BreadcrumbsComponent.prototype.__init.call(this); }
  Input({ required: true }) __init() {this.items = []}
}