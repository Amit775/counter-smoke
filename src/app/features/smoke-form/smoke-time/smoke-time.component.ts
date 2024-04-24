import { ChangeDetectionStrategy, Component, ElementRef, computed, effect, model, untracked, viewChild } from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
	standalone: true,
	selector: 'app-smoke-time',
	templateUrl: './smoke-time.component.html',
	styleUrls: ['./smoke-time.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokeTimeComponent {
	timestamp = model.required<number>();

	timePicker = viewChild.required('timePicker', { read: ElementRef<HTMLInputElement> });
	private instance = effect(() => {
		if (this.timePicker() == null) return null;

		return flatpickr(this.timePicker().nativeElement, {
			enableTime: true,
			noCalendar: true,
			dateFormat: 'H:i',
			inline: true,
			time_24hr: true,
			defaultDate: new Date(untracked(() => this.timestamp())),
			onChange: (selectedDates: Date[]) => {
				this.timestamp.set(selectedDates[0].getTime());
			},
		});
	});
}
