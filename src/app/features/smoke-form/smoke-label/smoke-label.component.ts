import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	model,
	viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
	MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
	MatAutocomplete,
	MatAutocompleteDefaultOptions,
	MatAutocompleteModule,
	MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map, merge, startWith } from 'rxjs';
import { SmokesService } from 'src/app/core/smokes/smokes.service';
import { SmokesStore } from 'src/app/core/smokes/smokes.store';

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
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatChipsModule,
		MatIconModule,
		MatAutocompleteModule,
		MatTooltipModule,
		MatButtonModule,
	],
	providers: [{ provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS, useValue: autocompleteOptions }],
})
export class SmokeLabelComponent {
	readonly seperatorKeysCodes = [ENTER, COMMA];

	labels = model<Record<string, true>>({});

	labelInput = viewChild.required<ElementRef>('labelInput');
	autoComplete = viewChild.required<MatAutocomplete>('auto');

	private service: SmokesService = inject(SmokesService);
	private store = inject(SmokesStore);

	labelCTRL = new FormControl('');

	filteredOptions$ = merge(
		this.labelCTRL.valueChanges,
		toObservable(this.store.labels),
		toObservable(this.labels)
	).pipe(
		map(() => this.labelCTRL.value),
		startWith(null),
		map((query: string | null) => this._filter(query ?? ''))
	);

	add(event: MatChipInputEvent): void {
		this.addLabel(event.value);
		this.labelCTRL.setValue('');
		event.chipInput.clear();
	}

	addLabel(label: string): void {
		const labels: Record<string, true> = { ...this.labels(), [label]: true };
		this.service.addLabelOptions(Object.keys(labels));
		this.labels.set(labels);
	}

	removeLabel(label: string): void {
		const { [label]: remove, ...others } = this.labels();
		this.labels.set(others);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		this.addLabel(event.option.value);
		this.labelCTRL.setValue('');
		this.labelInput().nativeElement.value = '';
	}

	removeLabelOption(event: MouseEvent, option: string): void {
		event.preventDefault();
		event.stopPropagation();
		this.service.removeLabelOptions([option]);
	}

	private _filter(query: string): string[] {
		const storeLabels = this.store.labels();
		const labels = this.labels();
		const items = [
			...(query && !storeLabels[query] ? [query] : []),
			...Object.keys(storeLabels ?? {}),
		];
		return items.filter(item => !labels[item] && item.includes(query));
	}
}
