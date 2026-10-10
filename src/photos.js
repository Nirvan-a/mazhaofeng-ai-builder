const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

export const scenes = {
  hero: asset('scenes/hero.webp'),
  library: asset('scenes/library.webp'),
  coding: asset('scenes/coding.webp'),
  travel: asset('scenes/travel.webp'),
  collaboration: asset('scenes/collaboration.webp'),
  architecture: asset('scenes/architecture.webp'),
};

export const clientLogos = {
  sonabel: asset('logos/sonabel.png'),
  saudiEnergy: asset('logos/saudi-electricity.png'),
  chinaCopper: asset('logos/china-copper.png'),
  fotile: asset('logos/fotile.png'),
  luckin: asset('logos/luckin.png'),
  saic: asset('logos/saic.png'),
  envision: asset('logos/envision.png'),
};

export const lifePhotos = [
  { src: asset('life/thumb-03.webp'), fullSrc: asset('life/full-03.webp'), alt: '山水之间', meta: 'BY THE WATER', aspectRatio: 3 / 2 },
  { src: asset('life/thumb-01.webp'), fullSrc: asset('life/full-01.webp'), alt: '西非街头', meta: 'ON THE ROAD', aspectRatio: 4 / 3 },
  { src: asset('life/thumb-02.webp'), fullSrc: asset('life/full-02.webp'), alt: '城市俯瞰', meta: 'RIYADH', aspectRatio: 4 / 3 },
  { src: asset('life/thumb-06.webp'), fullSrc: asset('life/full-06.webp'), alt: '射击体验', meta: 'OFF DUTY', aspectRatio: 2400 / 1351 },
  { src: asset('life/thumb-08.webp'), fullSrc: asset('life/full-08.webp'), alt: '豆包即猫', meta: 'DOUBAO & CAT', aspectRatio: 2400 / 1553 },
  { src: asset('life/thumb-04.webp'), fullSrc: asset('life/full-04.webp'), alt: '围坐的一餐', meta: 'AT THE TABLE', aspectRatio: 4 / 3 },
  { src: asset('life/thumb-05.webp'), fullSrc: asset('life/full-05.webp'), alt: '夜樱与街巷', meta: 'AFTER DARK', aspectRatio: 4 / 3 },
  { src: asset('life/thumb-07.webp'), fullSrc: asset('life/full-07.webp'), alt: '沙丁风暴', meta: 'UNDER THE SURFACE', aspectRatio: 4 / 3 },
];
