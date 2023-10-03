import reactPlugin from '@vitejs/plugin-react';
import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';

const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const {
    VITE_APP_DEVELOPMENT_PORT,
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: 'build',
    },
    plugins: [tsconfigPathsPlugin(), reactPlugin()],
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
    },
  });
};

export default config;
