import { Component, OnInit } from '@angular/core'

import { UiService } from 'src/app/services/ui.service'
import { Subscription} from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title: string = `Task Tracker`;
  showAddTask: boolean = false
  subscription: Subscription = new Subscription()

  constructor(private uiservice: UiService,private router:Router) {
    this.subscription = this.uiservice.onToggle()
      .subscribe(v => this.showAddTask = v)

  }

  ngOnInit(): void { }

  toggleAddTask() {
    this.uiservice.toggleAddTask()
    console.log('toggle')
  }

  hasRoute(route:string){
    return this.router.url === route
  }

}
