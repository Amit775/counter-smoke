import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { EntityAction, EntityActions } from '@datorama/akita';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { default as flatpickr } from 'flatpickr';
import { DayElement, Instance } from 'flatpickr/dist/types/instance';
import { Hook } from 'flatpickr/dist/types/options';
import { tap } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { PanelService } from './panel.service';

@UntilDestroy()
@Component({
	selector: 'app-smokes-history',
	templateUrl: './smokes-history.component.html',
	styleUrls: ['./smokes-history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmokesHistoryComponent implements AfterViewInit {
	@ViewChild('container', { read: ElementRef }) private container!: ElementRef;
	instance!: Instance;

	daysIndex: Record<number, number> = {}

	constructor(
		private smokes: SmokesQuery,
		private panel: PanelService
	) { }

	ngAfterViewInit(): void {
		this.instance = flatpickr(this.container.nativeElement, {
			inline: true,
			onDayCreate: (a, b, c, dayElement) => this.addCountBadge(dayElement),
			onReady: [
				this.indexByDateHook()
			],
			onMonthChange: [
				this.indexByDateHook()
			],
			onChange: [
				(a, b, c, d) => {
					this.panel.openPanel(a[0], this.container, () => this.instance.clear(true, false));
				}
			]
		});
		(window as any).fp = this.instance;
		this.smokes.selectEntityAction([EntityActions.Add, EntityActions.Remove]).pipe(
			tap((action: EntityAction<string>) => {
				const changedDates = action.type === EntityActions.Add ? action.ids.map(id => new Date(this.smokes.getEntity(id)!.timestamp).setHours(0, 0, 0, 0)) : this.instance.selectedDates;
				changedDates.forEach(date => this.addCountBadge(this.getDayElement(new Date(date))))
			}),
			untilDestroyed(this)
		).subscribe();
	}

	getDayElement(date: Date): DayElement | null {
		const nodes = this.instance.days.childNodes;
		const index = this.daysIndex[date.valueOf()];

		if (index < 0) return null
		return nodes[index] as DayElement;
	}

	indexByDateHook(): Hook {
		return (a, b, instance) => {
			this.daysIndex = this.indexByDate(instance.days.childNodes);
		};
	}

	indexByDate(arr: ArrayLike<ChildNode>): Record<number, number> {
		const result: Record<number, number> = {};
		for (let index = 0; index < arr.length; index++) {
			result[(arr[index] as DayElement).dateObj.valueOf()] = index;
		}

		return result;
	}

	addCountBadge(dayElement: DayElement | null): void {
		if (!dayElement) return;

		const count = this.getCountAtDay(dayElement.dateObj) ?? 0;
		const date = dayElement.dateObj.getDate();
		const classes = `day-count${date < 10 ? ' correct-single-dates' : ''}`;
		dayElement.innerHTML = `${date}<span class="day-count-wrapper"><span class="${classes}">${count}</span></span>`;
	}

	getCountAtDay(day: Date): number {
		return this.smokes.getCount((smoke: ISmoke) => new Date(smoke.timestamp).setHours(0, 0, 0, 0) === day.valueOf())
	}
}
