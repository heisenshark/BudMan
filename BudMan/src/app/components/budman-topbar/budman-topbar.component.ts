import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service'
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-budman-topbar',
  templateUrl: './budman-topbar.component.html',
  styleUrls: ['./budman-topbar.component.scss']
})
export class BudmanTopbarComponent implements OnInit {

  constructor(private uiService:UiService,
              private auth:AuthServiceService) {

   }

  menuOpen:boolean = false
  navOpen:boolean = false;

  ngOnInit(): void {
  }


  openMenu(){
    this.uiService.showMobile(true)
    console.log('dupa')
  }

  themeClick(){
    this.uiService.toggleDarkTheme()
  }

  logout(){
    console.log('dupa')
    this.auth.logout()
  }
}
