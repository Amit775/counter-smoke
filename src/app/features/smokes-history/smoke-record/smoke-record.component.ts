import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISmoke, SmokeContent } from 'src/app/core/smokes/smokes.store';

@Component({
  selector: 'app-smoke-record',
  templateUrl: './smoke-record.component.html',
  styleUrls: ['./smoke-record.component.scss']
})
export class SmokeRecordComponent {

  @Input() smoke!: ISmoke;
  @Output() smokeChange = new EventEmitter<ISmoke>();
  readonly dateFormat: string = "dd/MM/yyyy HH:mm";

  public currentTime: Date = new Date();
  setCurrentTime(): void {
    this.currentTime = new Date();
  }

  edit(smoke: ISmoke): void {
    this.smokeChange.emit(smoke);
  }

  

  timeChange(value: string): void {
    const [hours, minutes] = value.split(':');
    const newDate = new Date(this.smoke.timestamp).setHours(+hours, +minutes);
    this.edit({
      ...this.smoke,
      timestamp: newDate
    });
  }
}
