import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsLink } from '../../shared/projects-link/projects-link';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProjectsLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {constructor() { Home.prototype.__init.call(this); }
   __init() {this.javaDemoRunning = signal(true)}
}
