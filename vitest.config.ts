import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 60000,
    include: ['test/**/*.ts'],
    exclude: ['test/mailer.ts', 'test/resources/**'],
    fileParallelism: false,
    sequence: {
      concurrent: false,
    },
  },
});
