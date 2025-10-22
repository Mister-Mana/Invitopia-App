
import { Resource } from '../index';
import { commonCoreFr } from './common-core';
import { homeFr } from './home';
import { pagesFr } from './pages';

// Re-export everything as a flattened structure to maintain backwards compatibility
export const commonFr: Resource = {
  ...commonCoreFr,
  home: homeFr,
  pages: pagesFr
};
