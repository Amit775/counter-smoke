import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToasterComponent } from './toaster.service';

@NgModule({
  declarations: [ToasterComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [ToasterComponent],
})
export class CoreModule {}
