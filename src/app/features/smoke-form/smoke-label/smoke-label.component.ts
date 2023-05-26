import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
	MatAutocompleteDefaultOptions,
	MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, merge, startWith } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { MaterialModule } from 'src/app/shared/material.module';

const autocompleteOptions: MatAutocompleteDefaultOptions = {
	overlayPanelClass: 'autocomplete-panel',
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
	@Input() labels: Record<string, true> = {};

	@Output() labelsChange = new EventEmitter<Record<string, true>>();

	@ViewChild('labelInput', { static: true, read: ElementRef }) private labelInput!: ElementRef;

	private service: SmokesService = inject(SmokesService);
	private query: SmokesQuery = inject(SmokesQuery);

	filteredOptions$!: Observable<string[]>;

	labelCTRL = new FormControl('');

	ngOnInit(): void {
		this.labelCTRL.valueChanges.subscribe(value => console.log('ctrl', value));
		console.log('input', this.labels);
		this.labelsChange.subscribe(value => console.log('output', value));
		this.filteredOptions$ = merge(
			this.labelCTRL.valueChanges,
			this.query.select(s => s.labels)
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
		this.labelsChange.emit({
			...this.labels,
			[label]: true,
		});
	}

	removeLabel(label: string): void {
		const { [label]: remove, ...others } = this.labels;
		this.labelsChange.emit(others);
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
		return Object.keys(this.query.getValue().labels ?? {}).filter(item => item.includes(query));
	}
}
