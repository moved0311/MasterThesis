import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsavarrComponent } from './jsavarr.component';

describe('JsavarrComponent', () => {
  let component: JsavarrComponent;
  let fixture: ComponentFixture<JsavarrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsavarrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsavarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
