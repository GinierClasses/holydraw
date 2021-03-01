const Mq: Record<MediaQuery, string> = {
  XS: '@media (min-width: 0px)',
  SM: '@media (min-width: 600px)',
  MD: '@media (min-width: 960px)',
  LG: '@media (min-width: 1280px)',
  XL: '@media (min-width: 1920px)',
};

export enum MediaQuery {
  XS = 'XS',
  SM = 'SM',
  MD = 'MD',
  LG = 'LG',
  XL = 'XL',
}

export default Mq;
