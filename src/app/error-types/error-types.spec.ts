import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ErrorTypes } from './error-types';
import { ProfileName, UserProfileService } from './user-profile.service';

const INVALID_MESSAGE = 'The time zone in your profile is invalid.';
const GENERIC_MESSAGE = 'The event time could not be displayed.';
const UTC_TIME = 'Nov 2, 2026, 1:00 AM';

describe('ErrorTypes', () => {
  async function render(profile: ProfileName) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const service = TestBed.inject(UserProfileService);
    service.select(profile);
    const fixture = TestBed.createComponent(ErrorTypes);
    await fixture.whenStable();
    return { element: fixture.nativeElement as HTMLElement, service, fixture };
  }

  it('rejects the invalid time zone with a RangeError in this environment', () => {
    expect(() => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC+9' })).toThrow(RangeError);
  });

  it('shows the start time in the time zone of the profile', async () => {
    const { element } = await render('valid');

    expect(element.textContent).toContain('Team meeting: Nov 2, 2026, 10:00');
    expect(element.textContent).not.toContain(INVALID_MESSAGE);
    expect(element.textContent).not.toContain(GENERIC_MESSAGE);
  });

  it('shows the time in UTC for an invalid time zone', async () => {
    const { element } = await render('invalid-time-zone');

    expect(element.textContent).toContain(INVALID_MESSAGE);
    expect(element.textContent).toContain(UTC_TIME);
    expect(element.textContent).not.toContain(GENERIC_MESSAGE);
  });

  it('shows the generic message when the profile is missing', async () => {
    const { element } = await render('missing-time-zone');

    expect(element.textContent).toContain(GENERIC_MESSAGE);
    expect(element.textContent).not.toContain(INVALID_MESSAGE);
    expect(element.textContent).not.toContain(UTC_TIME);
  });

  it('shows the time in UTC when the time zone becomes invalid after the first render', async () => {
    const { element, service, fixture } = await render('valid');
    expect(element.textContent).toContain('10:00');

    service.select('invalid-time-zone');
    await fixture.whenStable();

    expect(element.textContent).toContain(INVALID_MESSAGE);
    expect(element.textContent).toContain(UTC_TIME);
    expect(element.textContent).not.toContain(GENERIC_MESSAGE);
  });
});
