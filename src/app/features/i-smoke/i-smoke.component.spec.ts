import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ISmokeComponent } from './i-smoke.component';

describe('ISmokeComponent', () => {
  let component: ISmokeComponent;
  let fixture: ComponentFixture<ISmokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ISmokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ISmokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
