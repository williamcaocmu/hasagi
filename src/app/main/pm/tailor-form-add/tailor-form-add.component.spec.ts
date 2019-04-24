import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailorFormAddComponent } from './tailor-form-add.component';

describe('TailorFormAddComponent', () => {
  let component: TailorFormAddComponent;
  let fixture: ComponentFixture<TailorFormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TailorFormAddComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailorFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
