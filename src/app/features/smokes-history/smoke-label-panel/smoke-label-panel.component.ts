import { Component, Inject, InjectionToken, OnInit } from '@angular/core';
import { SmokesService } from 'src/app/core/smokes/smokes.service';

export const LABELS_TOKEN = new InjectionToken<string[]>('lables');

@Component({
	selector: 'app-smoke-label-panel',
	templateUrl: './smoke-label-panel.component.html',
	styleUrls: ['./smoke-label-panel.component.scss']
})
export class SmokeLabelPanelComponent implements OnInit {

	options: string[] = [];

	constructor(
		@Inject(LABELS_TOKEN) public labels: string[],
		private service: SmokesService
	) { }

	ngOnInit(): void {
		
	}

}
