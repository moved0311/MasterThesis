import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsavBinarySearchComponent } from './jsav-binary-search.component';

describe('JsavBinarySearchComponent', () => {
  let component: JsavBinarySearchComponent;
  let fixture: ComponentFixture<JsavBinarySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsavBinarySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsavBinarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
