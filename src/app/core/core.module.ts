import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { ToasterComponent } from './toaster.service';

@NgModule({
	declarations: [ToasterComponent],
	imports: [CommonModule, MaterialModule],
	exports: [ToasterComponent],
})
export class CoreModule { }
