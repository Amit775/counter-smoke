import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { map, merge, Observable, startWith } from 'rxjs';
import { SmokesQuery } from "src/app/core/smokes/smokes.query";
import { SmokesService } from "src/app/core/smokes/smokes.service";
import { MaterialModule } from "src/app/shared/material.module";

@Component({
	standalone: true,
	selector: 'app-smoke-label',
	templateUrl: './smoke-label.component.html',
	styleUrls: ['./smoke-label.component.scss'],
	imports: [CommonModule, ReactiveFormsModule, MaterialModule]
})
export class SmokeLabelComponent implements OnInit, AfterViewInit {

	readonly seperatorKeyCodes = [ENTER, COMMA];
	@Input() labels: Record<string, true> = {};

	@Output() change = new EventEmitter<string[]>;
	@Output() added = new EventEmitter<string>;
	@Output() removed = new EventEmitter<string>;

	@ViewChild('chipList', { read: MatChipList }) private input!: MatChipList;

	filteredOptions$!: Observable<string[]>;

	labelCTRL = new FormControl('');

	constructor(
		private query: SmokesQuery,
		private service: SmokesService,
	) { }

	ngOnInit(): void {
		this.filteredOptions$ = merge(this.labelCTRL.valueChanges, this.query.select(s => s.labels)).pipe(
			map(() => this.labelCTRL.value),
			startWith(null),
			map((query: string | null) => this._filter(query ?? ''))
		);
	}

	ngAfterViewInit(): void {
		setTimeout(() => this.input._focusInput());
	}

	remove(label: string): void {
		console.log('remove', this.input.value);
		this.removed.emit(label);
	}

	add(event: MatChipInputEvent): void {
		console.log('add', this.input.value);
		event.chipInput.clear()
		this.added.emit(event.value);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		console.log('select', this.input.value);
		this.added.emit(event.option.value);
	}

	removeLabelOption(event: MouseEvent, option: string): void {
		event.preventDefault();
		event.stopPropagation();
		this.service.removeLabelOptions([option]);
	}

	private _filter(query: string): string[] {
		return Object.keys(this.query.getValue().labels ?? {}).filter((item => item.includes(query)));
	}

}
