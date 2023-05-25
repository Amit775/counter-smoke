import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipGrid, MatChipInputEvent } from '@angular/material/chips';
import { Observable, map, merge, startWith } from 'rxjs';
import { SmokesQuery } from 'src/app/core/smokes/smokes.query';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
	standalone: true,
	selector: 'app-smoke-label',
	templateUrl: './smoke-label.component.html',
	styleUrls: ['./smoke-label.component.scss'],
	imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SmokeLabelComponent implements OnInit {
	readonly seperatorKeyCodes = [ENTER, COMMA];
	@Input() labels: Record<string, true> = {};

	@Output() added = new EventEmitter<string>();
	@Output() removed = new EventEmitter<string>();

	filteredOptions$!: Observable<string[]>;

	labelCTRL = new FormControl('');

	constructor(private query: SmokesQuery, private service: SmokesService) {}

	ngOnInit(): void {
		this.filteredOptions$ = merge(
			this.labelCTRL.valueChanges,
			this.query.select(s => s.labels)
		).pipe(
			map(() => this.labelCTRL.value),
			startWith(null),
			map((query: string | null) => this._filter(query ?? ''))
		);
	}

	remove(label: string): void {
		this.removed.emit(label);
	}

	add(event: MatChipInputEvent): void {
		event.chipInput.clear();
		this.added.emit(event.value);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.added.emit(event.option.value);
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
