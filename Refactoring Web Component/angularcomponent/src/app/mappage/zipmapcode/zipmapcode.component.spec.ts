import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipmapcodeComponent } from './zipmapcode.component';

describe('ZipmapcodeComponent', () => {
  let component: ZipmapcodeComponent;
  let fixture: ComponentFixture<ZipmapcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipmapcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipmapcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
