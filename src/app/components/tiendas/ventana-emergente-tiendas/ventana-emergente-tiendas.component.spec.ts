import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEmergenteTiendasComponent } from './ventana-emergente-tiendas.component';

describe('VentanaEmergenteTiendasComponent', () => {
  let component: VentanaEmergenteTiendasComponent;
  let fixture: ComponentFixture<VentanaEmergenteTiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaEmergenteTiendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaEmergenteTiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
