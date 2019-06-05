import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { W3CSSTableComponent } from './w3-csstable.component';

describe('W3CSSTableComponent', () => {
  let component: W3CSSTableComponent;
  let fixture: ComponentFixture<W3CSSTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ W3CSSTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(W3CSSTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
