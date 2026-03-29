/**
 * @fileoverview Tests unitarios del componente raíz App.
 * Verifica la creación del componente y el renderizado básico.
 */

// #region Imports
import { TestBed } from '@angular/core/testing';
import { App } from './app';
// #endregion

// #region Tests
describe('App', () => {
  /** Configura el módulo de testing con el componente App antes de cada test */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  /** Verifica que el componente se crea correctamente */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /** Verifica que se renderiza el título de la aplicación */
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, AbastecePro');
  });
});
// #endregion
