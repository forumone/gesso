import { test, expect } from '@playwright/test';

const STORYBOOK_BASE = 'https://gesso.ddev.site:6006';

type StoryEntry = {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
};

type StorybookIndex = {
  v: number;
  entries: Record<string, StoryEntry>;
};

async function fetchStoryEntries(baseUrl: string): Promise<StoryEntry[]> {
  const https = await import('https');
  const url = `${baseUrl}/index.json`;
  const body = await new Promise<string>((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, res => {
      const chunks: Buffer[] = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks).toString()));
      res.on('error', reject);
    }).on('error', reject);
  });
  const index: StorybookIndex = JSON.parse(body);
  return Object.values(index.entries).filter(entry => entry.type === 'story');
}

// Sanitize a story title/name into a safe filename segment.
function safeSegment(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const stories = await fetchStoryEntries(STORYBOOK_BASE);

for (const story of stories) {
  const snapshotName = `${safeSegment(story.title)}--${safeSegment(story.name)}.png`;

  test(`${story.title} / ${story.name}`, async ({ page }) => {
    const storyUrl = `${STORYBOOK_BASE}/iframe.html?id=${story.id}&viewMode=story`;
    await page.goto(storyUrl, { waitUntil: 'domcontentloaded' });

    // Wait for the story root to be present and any animations to settle.
    await page.waitForSelector('#storybook-root', { state: 'visible' });
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot(snapshotName, {
      fullPage: true,
      animations: 'disabled',
    });
  });
}
