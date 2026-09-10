import { preview } from 'astro';

// Use the programmatic server so the test runner owns its lifetime.
// The CLI can otherwise detach automatically in an agent environment.
await preview({ server: { host: '127.0.0.1', port: 4322 } });
