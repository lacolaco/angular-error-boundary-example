import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../auth';
import { ErrorTypes } from './error-types';

describe('ErrorTypes', () => {
  async function render(session: Parameters<AuthService['select']>[0]) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    TestBed.inject(AuthService).select(session);
    const fixture = TestBed.createComponent(ErrorTypes);
    await fixture.whenStable();
    return { fixture, element: fixture.nativeElement as HTMLElement };
  }

  it('shows the user name and plan for a signed-in session', async () => {
    const { element } = await render('signed-in');

    expect(element.querySelector('.account')?.textContent).toContain('Ada (PRO)');
    expect(element.textContent).not.toContain('Your session has ended.');
    expect(element.textContent).not.toContain('could not be displayed');
  });

  it('shows the session message instead of the generic one for a signed-out session', async () => {
    const { element } = await render('signed-out');

    expect(element.textContent).toContain('Your session has ended.');
    expect(element.textContent).not.toContain('Your account could not be displayed.');
    expect(element.querySelector('.account')).toBeNull();
  });

  it('shows the generic message instead of the session one for a corrupted session', async () => {
    const { element } = await render('corrupted');

    expect(element.textContent).toContain('Your account could not be displayed.');
    expect(element.textContent).not.toContain('Your session has ended.');
  });

  it('shows the session message when the session ends after the first render', async () => {
    const { fixture, element } = await render('signed-in');
    expect(element.querySelector('.account')).not.toBeNull();

    TestBed.inject(AuthService).select('signed-out');
    await fixture.whenStable();

    expect(element.textContent).toContain('Your session has ended.');
    expect(element.textContent).not.toContain('Your account could not be displayed.');
  });
});
