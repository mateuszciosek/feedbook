import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedComponent } from './most-liked.component';

describe('MostLikedComponent', () => {
  let component: MostLikedComponent;
  let fixture: ComponentFixture<MostLikedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostLikedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostLikedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
