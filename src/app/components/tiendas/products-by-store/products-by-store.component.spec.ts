import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByStoreComponent } from './products-by-store.component';

describe('ProductsByStoreComponent', () => {
  let component: ProductsByStoreComponent;
  let fixture: ComponentFixture<ProductsByStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsByStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsByStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
