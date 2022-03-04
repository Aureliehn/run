import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPicComponent } from './list-pic.component';

describe('ListPicComponent', () => {
  let component: ListPicComponent;
  let fixture: ComponentFixture<ListPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
