import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith, Observable } from 'rxjs';

@Component({
	selector: 'app-smoke-label',
	templateUrl: './smoke-label.component.html',
	styleUrls: ['./smoke-label.component.scss']
})
export class SmokeLabelComponent implements OnInit {

	readonly seperatorKeyCodes = [ENTER, COMMA];
	@Input() labels!: Record<string, true>;
	@Input() isEditMode!: boolean;

	@Output() added = new EventEmitter<string>();
	@Output() removed = new EventEmitter<string>();

	filteredOptions$!: Observable<string[]>;

	labelCTRL = new FormControl('');

	constructor() { }

	ngOnInit(): void {
		this.filteredOptions$ = this.labelCTRL.valueChanges.pipe(
			startWith(null),
			map((query: string | null) => query ? this._filter(query) : [])
		);
	}

	remove(label: string): void {
		console.log(label);
		this.removed.emit(label);
	}

	add(event: MatChipInputEvent): void {
		console.log(event);
		event.chipInput.clear()
		this.added.emit(event.value);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		console.log('selected', event);
	}

	private _filter(query: string): string[] {
		return ([] as string[]).filter((item => item.includes(query)));
	}

}
