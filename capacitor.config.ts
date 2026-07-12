import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bieltv.app',
  appName: 'Biel TV',
  webDir: 'build',
  server: {
    url: 'https://gabrielfranca95.github.io/web-tv-react/',
    cleartext: true
  }
};

export default config;
