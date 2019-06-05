import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsavpageComponent } from './jsavpage.component';

describe('JsavpageComponent', () => {
  let component: JsavpageComponent;
  let fixture: ComponentFixture<JsavpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsavpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsavpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
