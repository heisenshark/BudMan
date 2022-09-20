import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "BudMan"

  constructor(private router:Router){

  }

  hasRoute(route:string){
    return this.router.url === route
  }

  getTheme():boolean{
    return UiService.darkTheme
  }
}
