import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPersonas } from './listado-personas';

describe('ListadoPersonas', () => {
  let component: ListadoPersonas;
  let fixture: ComponentFixture<ListadoPersonas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPersonas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPersonas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
