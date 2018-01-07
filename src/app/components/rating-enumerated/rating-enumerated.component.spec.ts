import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingEnumeratedComponent } from './rating-enumerated.component';

describe('RatingEnumeratedComponent', () => {
  let component: RatingEnumeratedComponent;
  let fixture: ComponentFixture<RatingEnumeratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingEnumeratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingEnumeratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
