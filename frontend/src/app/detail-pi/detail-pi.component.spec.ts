import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPiComponent } from './detail-pi.component';

describe('DetailPiComponent', () => {
  let component: DetailPiComponent;
  let fixture: ComponentFixture<DetailPiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
