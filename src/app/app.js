import { signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from "./shared/site-header/site-header";
import { APP_VERSION } from './generated-version';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {constructor() { App.prototype.__init.call(this);App.prototype.__init2.call(this); }
    __init() {this.title = signal("John Bieniek's Portfolio")}
    __init2() {this.version = APP_VERSION}
}
