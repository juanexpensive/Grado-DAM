import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPersonas } from './tabla-personas';

describe('TablaPersonas', () => {
  let component: TablaPersonas;
  let fixture: ComponentFixture<TablaPersonas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPersonas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaPersonas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
