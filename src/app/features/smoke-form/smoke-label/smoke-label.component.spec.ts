import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokeLabelComponent } from './smoke-label.component';

describe('SmokeLabelComponent', () => {
  let component: SmokeLabelComponent;
  let fixture: ComponentFixture<SmokeLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmokeLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmokeLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
