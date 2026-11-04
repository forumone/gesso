// @ts-check
// Entry point for `npm run pretest:e2e`. The logic lives in
// ./playwrightBrowsers.js so it can be imported and tested without side effects.
import { ensurePlaywrightBrowsers } from './playwrightBrowsers.js';

ensurePlaywrightBrowsers();
