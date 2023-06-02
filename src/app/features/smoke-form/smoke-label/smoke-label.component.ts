import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
	MatAutocomplete,
	MatAutocompleteDefaultOptions,
	MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { BehaviorSubject, Observable, map, merge, startWith } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { MaterialModule } from 'src/app/shared/material.module';

const autocompleteOptions: MatAutocompleteDefaultOptions = {
	overlayPanelClass: 'autocomplete-panel',
	hideSingleSelectionIndicator: true,
};

@Component({
	standalone: true,
	selector: 'app-smoke-label',
	templateUrl: './smoke-label.component.html',
	styleUrls: ['./smoke-label.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [CommonModule, ReactiveFormsModule, MaterialModule],
	providers: [{ provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: autocompleteOptions }],
})
export class SmokeLabelComponent implements OnInit {
	readonly seperatorKeysCodes = [ENTER, COMMA];

	private _selectedLabels = new BehaviorSubject<Record<string, true>>({});
	@Input() set labels(value: Record<string, true>) {
		this._selectedLabels.next(value ?? {});
	}
	get labels(): Record<string, true> {
		return this._selectedLabels.value;
	}

	@Output() labelsChange = this._selectedLabels.asObservable();

	@ViewChild('labelInput', { static: true, read: ElementRef }) private labelInput!: ElementRef;
	@ViewChild('auto', { static: true, read: MatAutocomplete }) private matAutocomplete!: MatAutocomplete;

	private service: SmokesService = inject(SmokesService);
	private query: SmokesQuery = inject(SmokesQuery);

	filteredOptions$!: Observable<string[]>;

	labelCTRL = new FormControl('');

	ngOnInit(): void {
		this.filteredOptions$ = merge(
			this.labelCTRL.valueChanges,
			this.query.select(s => s.labels),
			this._selectedLabels
		).pipe(
			map(() => this.labelCTRL.value),
			startWith(null),
			map((query: string | null) => this._filter(query ?? ''))
		);
	}

	add(event: MatChipInputEvent): void {
		this.addLabel(event.value);
		this.labelCTRL.setValue('');
		event.chipInput.clear();
	}

	addLabel(label: string): void {
		const labels: Record<string, true> = { ...this.labels, [label]: true };
		this.service.addLabelOptions(Object.keys(labels));
		this._selectedLabels.next(labels);
	}

	removeLabel(label: string): void {
		const { [label]: remove, ...others } = this.labels;
		this._selectedLabels.next(others);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.addLabel(event.option.value);
		this.labelCTRL.setValue('');
		this.labelInput.nativeElement.value = '';
	}

	removeLabelOption(event: MouseEvent, option: string): void {
		event.preventDefault();
		event.stopPropagation();
		this.service.removeLabelOptions([option]);
	}

	private _filter(query: string): string[] {
		return Object.keys(this.query.getValue().labels ?? {}).filter(item => !this.labels[item] && item.includes(query));
	}
}
