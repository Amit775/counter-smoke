import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from 'src/app/shared/material.module';
import { SmokeFormComponent } from './smoke-form.component';
import { SmokeLabelComponent } from './smoke-label/smoke-label.component';

@NgModule({
	declarations: [SmokeFormComponent],
	imports: [CommonModule, SmokeLabelComponent, MaterialModule],
	exports: [SmokeFormComponent],
})
export class SmokeFormModule {}
