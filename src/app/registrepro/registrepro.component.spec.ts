import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistreproComponent } from './registrepro.component';

describe('RegistreproComponent', () => {
  let component: RegistreproComponent;
  let fixture: ComponentFixture<RegistreproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistreproComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistreproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
