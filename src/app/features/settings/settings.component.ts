import { Component, OnInit } from '@angular/core';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private service: SmokesService) { }

  ngOnInit(): void {
  }

  reset(): void {
    this.service.reset();
  }


}
