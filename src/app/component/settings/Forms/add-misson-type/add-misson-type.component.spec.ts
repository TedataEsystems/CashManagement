import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMissonTypeComponent } from './add-misson-type.component';

describe('AddMissonTypeComponent', () => {
  let component: AddMissonTypeComponent;
  let fixture: ComponentFixture<AddMissonTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMissonTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMissonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
