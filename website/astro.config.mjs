import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://nourdaps.github.io',
  base: '/Nourd.NKF',
  trailingSlash: 'always',
  integrations: [starlight({
    title: 'Nourd Knowledge Format',
    description: 'Keep the meaning, decisions, and implementation of your work connected. An introduction to Nourd Knowledge Format.',
    favicon: '/brand/nourd-logo.svg',
    customCss: ['./src/styles/nourd.css'],
    components: {
      SiteTitle: './src/components/SiteTitle.astro',
      PageTitle: './src/components/PageTitle.astro',
      Footer: './src/components/Footer.astro',
    },
    social: [{ icon: 'github', label: 'NKF on GitHub', href: 'https://github.com/NourdApS/Nourd.NKF' }],
    sidebar: [{
      label: 'Start Here',
      items: [
        { label: 'An introduction', slug: '' },
        { label: 'The problem it solves', slug: 'start-here/the-problem' },
        { label: 'Who it helps', slug: 'start-here/who-it-helps' },
        { label: 'When it fits', slug: 'start-here/when-it-fits' },
        { label: 'How it works', slug: 'start-here/how-it-works' },
        { label: 'The mechanics', slug: 'start-here/mechanics' },
      ],
    }],
    tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
    credits: false,
  })],
});
