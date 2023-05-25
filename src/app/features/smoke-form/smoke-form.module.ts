import { NgModule } from '@angular/core';
import { SmokeFormComponent } from './smoke-form.component';
import { SmokeLabelComponent } from './smoke-label/smoke-label.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [SmokeFormComponent],
	imports: [CommonModule, SmokeLabelComponent],
	exports: [SmokeFormComponent],
})
export class SmokeFormModule {}
