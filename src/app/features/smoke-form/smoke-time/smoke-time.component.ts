import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { Instance } from 'flatpickr/dist/types/instance';

@Component({
	standalone: true,
	selector: 'app-smoke-time',
	templateUrl: './smoke-time.component.html',
	styleUrls: ['./smoke-time.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeTimeComponent implements AfterViewInit {
	@Input() public timestamp!: number;
	@Output() public timestampChange = new EventEmitter<number>();

	@ViewChild('timePicker') public timePicker!: ElementRef<HTMLInputElement>;
	private instance!: Instance;

	public ngAfterViewInit(): void {
		this.instance = flatpickr(this.timePicker.nativeElement, {
			enableTime: true,
			noCalendar: true,
			dateFormat: 'H:i',
			inline: true,
			time_24hr: true,
			defaultDate: new Date(this.timestamp),
			onChange: (selectedDates: Date[]) => {
				this.timestampChange.emit(selectedDates[0].getTime());
			},
		});
	}
}
