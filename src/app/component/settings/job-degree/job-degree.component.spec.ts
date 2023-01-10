import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDegreeComponent } from './job-degree.component';

describe('JobDegreeComponent', () => {
  let component: JobDegreeComponent;
  let fixture: ComponentFixture<JobDegreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobDegreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDegreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
