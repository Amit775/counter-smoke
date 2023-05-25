import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokeFormComponent } from './smoke-form.component';

describe('SmokeFormComponent', () => {
	let component: SmokeFormComponent;
	let fixture: ComponentFixture<SmokeFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SmokeFormComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SmokeFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
