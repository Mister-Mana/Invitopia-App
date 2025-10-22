
import { Resource } from '../index';
import { commonCoreEn } from './common-core';
import { homeEn } from './home';
import { pagesEn } from './pages';

// Re-export everything as a flattened structure to maintain backwards compatibility
export const commonEn: Resource = {
  ...commonCoreEn,
  home: homeEn,
  pages: pagesEn
};
