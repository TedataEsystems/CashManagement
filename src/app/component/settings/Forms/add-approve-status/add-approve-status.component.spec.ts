import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApproveStatusComponent } from './add-approve-status.component';

describe('AddApproveStatusComponent', () => {
  let component: AddApproveStatusComponent;
  let fixture: ComponentFixture<AddApproveStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApproveStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApproveStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
