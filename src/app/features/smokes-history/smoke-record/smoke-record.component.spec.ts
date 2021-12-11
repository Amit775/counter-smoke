import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokeRecordComponent } from './smoke-record.component';

describe('SmokeRecordComponent', () => {
  let component: SmokeRecordComponent;
  let fixture: ComponentFixture<SmokeRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmokeRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmokeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
