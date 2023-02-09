import { create } from '@storybook/theming';

const storybookTheme = create({
  appBg: '#F8F8F8',
  appContentBg: '#fff',
  barBg: '#19013A',
  barSelectedColor: '#EE2737',
  barTextColor: '#fff',
  base: 'light',
  brandTitle: 'Forum One',
  brandUrl: 'https://forumone.com',
  brandImage: 'images/forumone.svg',
  colorPrimary: '#3E2A5E',
  colorSecondary: '#EE2737',
  fontBase: '"Barlow", sans-serif',
  textColor: '#3f3f3f',
});

export default storybookTheme;
