import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { W3CSSTablePageComponent } from './w3-csstable-page.component';

describe('W3CSSTablePageComponent', () => {
  let component: W3CSSTablePageComponent;
  let fixture: ComponentFixture<W3CSSTablePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ W3CSSTablePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(W3CSSTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
