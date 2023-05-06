import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		environmentMatchGlobs: [['src/_tests/E2E/**', 'prisma']],
	},
});
