import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokesHistoryComponent } from './smokes-history.component';

describe('SmokesHistoryComponent', () => {
  let component: SmokesHistoryComponent;
  let fixture: ComponentFixture<SmokesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmokesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmokesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
