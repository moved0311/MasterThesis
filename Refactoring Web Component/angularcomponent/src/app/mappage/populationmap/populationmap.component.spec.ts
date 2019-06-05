import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationmapComponent } from './populationmap.component';

describe('PopulationmapComponent', () => {
  let component: PopulationmapComponent;
  let fixture: ComponentFixture<PopulationmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
