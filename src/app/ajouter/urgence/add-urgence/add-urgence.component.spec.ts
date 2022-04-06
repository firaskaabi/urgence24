import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUrgenceComponent } from './add-urgence.component';

describe('AddUrgenceComponent', () => {
  let component: AddUrgenceComponent;
  let fixture: ComponentFixture<AddUrgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUrgenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUrgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
