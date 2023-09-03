import { AsyncPipe, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, NgZone, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EntityAction, EntityActions } from '@datorama/akita';
import { default as flatpickr } from 'flatpickr';
import { DayElement, Instance } from 'flatpickr/dist/types/instance';
import { Hook } from 'flatpickr/dist/types/options';
import { BehaviorSubject, map, tap } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { ISmoke } from 'src/app/core/smokes/smokes.store';
import { enterZone } from 'src/app/utils/enter-zone.operator';
import { SmokesListComponent } from './smokes-list/smokes-list.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
	selector: 'app-smokes-history',
	templateUrl: './smokes-history.component.html',
	styleUrls: ['./smokes-history.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NgIf, SmokesListComponent, AsyncPipe, MatDialogModule],
})
export default class SmokesHistoryComponent implements AfterViewInit {
	private query: SmokesQuery = inject(SmokesQuery);
	private zone: NgZone = inject(NgZone);
	private destroy: DestroyRef = inject(DestroyRef);

	@ViewChild('calendar', { read: ElementRef }) private container!: ElementRef;
	instance!: Instance;

	daysIndex: Record<number, number> = {};

	private _selecedDate = new BehaviorSubject<Date>(new Date());
	public selectedDate$ = this._selecedDate.asObservable().pipe(map(date => new Date(date.setHours(0, 0, 0, 0))));

	ngAfterViewInit(): void {
		this.instance = flatpickr(this.container.nativeElement, {
			inline: true,
			maxDate: new Date(),
			onDayCreate: (a, b, c, dayElement) => this.addCountBadge(dayElement),
			onReady: [this.indexByDateHook()],
			onMonthChange: [this.indexByDateHook()],
			defaultDate: new Date(),
			onChange: (dates: Date[]) => this._selecedDate.next(dates[0]),
		});
		this.query
			.selectEntityAction([EntityActions.Add, EntityActions.Remove])
			.pipe(
				enterZone(this.zone),
				map((action: EntityAction<string>) => this.extractChangedDates(action)),
				tap(changedDates => changedDates.forEach(date => this.addCountBadge(this.getDayElement(date)))),
				takeUntilDestroyed(this.destroy)
			)
			.subscribe();
	}

	getDayElement(dateTimestamp: number): DayElement | null {
		const nodes = this.instance.days.childNodes;
		const index = this.daysIndex[dateTimestamp] ?? -1;

		if (index < 0) return null;
		return nodes[index] as DayElement;
	}

	indexByDateHook(): Hook {
		return (a, b, instance) => {
			setTimeout(() => {
				this.daysIndex = this.indexByDate(instance.days.childNodes);
			}, 0);
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
		if (this.isDateInFuture(dayElement.dateObj)) return;

		const count = this.getCountAtDay(dayElement.dateObj) ?? 0;
		const date = dayElement.dateObj.getDate();
		dayElement.innerHTML = `${date}<span class="day-count">${count}</span>`;
	}

	getBadgeClass(count: number): string {
		switch (true) {
			case count <= 9:
				return 'success';
			case count <= 11:
				return 'regular';
			default:
				return 'warn';
		}
	}

	getCountAtDay(day: Date): number {
		return this.query.getCount((smoke: ISmoke) => new Date(smoke.timestamp).setHours(0, 0, 0, 0) === day.valueOf());
	}

	isDateInFuture(date: Date): boolean {
		const today = new Date(new Date().setHours(0, 0, 0, 0));
		return date > today;
	}

	extractChangedDates(action: EntityAction<string>): number[] {
		return action.type === EntityActions.Add
			? action.ids.map(id => new Date(this.query.getEntity(id)!.timestamp).setHours(0, 0, 0, 0))
			: this.instance.selectedDates.map(date => date.valueOf());
	}
}
