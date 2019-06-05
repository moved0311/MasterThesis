import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectEditerComponent } from './object-editer.component';

describe('ObjectEditerComponent', () => {
  let component: ObjectEditerComponent;
  let fixture: ComponentFixture<ObjectEditerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectEditerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectEditerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
