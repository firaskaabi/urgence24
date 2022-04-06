import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConatctUsComponent } from './conatct-us.component';

describe('ConatctUsComponent', () => {
  let component: ConatctUsComponent;
  let fixture: ComponentFixture<ConatctUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConatctUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConatctUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
