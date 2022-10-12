import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmokeLabelPanelComponent } from './smoke-label-panel.component';

describe('SmokeLabelPanelComponent', () => {
  let component: SmokeLabelPanelComponent;
  let fixture: ComponentFixture<SmokeLabelPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmokeLabelPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmokeLabelPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
