const MediaqueryHeight: Record<MediaQuery, string> = {
  XS: '@media (max-height: 0px)',
  SM: '@media (max-height: 600px)',
  MD: '@media (max-height: 960px)',
  LG: '@media (max-height: 1280px)',
  XL: '@media (max-height: 1920px)',
};

export enum MediaQuery {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
}

export default MediaqueryHeight;
