import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { siteSuggestions, getTopicFromRoute, pages } from '../routing/base/routes';

const CATEGORIES = [
  'algo', 'ds', 'physics', 'math', 'games', 'os', 'networking', 'ml', 'security', 'logic',
];

describe('routes', () => {
  it('registers a topic for every site suggestion', () => {
    for (const site of siteSuggestions) {
      const topic = getTopicFromRoute(site.route);
      expect(topic).toBeDefined();
      expect(topic?.id).toBe(site.topicId);
      expect(topic?.route).toBe(site.route);
    }
  });

  it('has a matching index.tsx for every registered page', () => {
    const missing: string[] = [];

    for (const site of siteSuggestions) {
      const componentPath = path.join(
        process.cwd(),
        'src/routing',
        site.path,
        'index.tsx'
      );
      if (!fs.existsSync(componentPath)) {
        missing.push(site.route);
      }
    }

    expect(missing).toEqual([]);
  });

  it('lists at least 100 visualizers across all categories', () => {
    const totalPages = pages.reduce((sum, cat) => sum + cat.pages.length, 0);
    expect(totalPages).toBeGreaterThanOrEqual(100);
    expect(CATEGORIES.length).toBe(10);
  });
});
