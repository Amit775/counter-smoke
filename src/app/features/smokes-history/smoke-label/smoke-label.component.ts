import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipList } from '@angular/material/chips';
import { map, startWith, Observable } from 'rxjs';

@Component({
	selector: 'app-smoke-label',
	templateUrl: './smoke-label.component.html',
	styleUrls: ['./smoke-label.component.scss']
})
export class SmokeLabelComponent implements OnInit, AfterViewInit {

	readonly seperatorKeyCodes = [ENTER, COMMA];
	@Input() labels!: Record<string, true>;
	@Input() isEditMode!: boolean;

	@Output() added = new EventEmitter<string>();
	@Output() removed = new EventEmitter<string>();

	@ViewChild('chipList', { read: MatChipList }) private input!: MatChipList;

	filteredOptions$!: Observable<string[]>;

	labelCTRL = new FormControl('');

	constructor() { }

	ngOnInit(): void {
		this.filteredOptions$ = this.labelCTRL.valueChanges.pipe(
			startWith(null),
			map((query: string | null) => this._filter(query ?? ''))
		);
	}

	ngAfterViewInit(): void {
		setTimeout(() => this.input._focusInput());
	}

	remove(label: string): void {
		this.removed.emit(label);
	}

	add(event: MatChipInputEvent): void {
		event.chipInput.clear()
		this.added.emit(event.value);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.added.emit(event.option.value);
	}

	private _filter(query: string): string[] {
		return (['bublil', 'king'] as string[]).filter((item => item.includes(query)));
	}

}
