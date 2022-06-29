import { faker } from '@faker-js/faker';

const mountains = [
  'Everest',
  'Fuji',
  'Kilimanjaro',
  'K2',
  'Denali',
  'Mont Blanc',
  'Kirkjufell',
  'Fitz Roy',
  'Annapurna',
  'Olympus',
  'Hua',
  'Aoraki',
  'Elbrus',
  'Matterhorn',
  'El Capitan',
  'Grand Teton',
  'Licancabur',
  'Ben Nevis',
  'Rainier',
  'Table Mountain',
];

const images = [
  'https://images.unsplash.com/photo-1571983823232-c22a48846402?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&w=600&q=80',
  'https://images.unsplash.com/photo-1539013646821-b8c1e125b390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1491331606314-1d15535360fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1539655442433-f7d7d867884f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1469521669194-babb45599def?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1419064642531-e575728395f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1473277087567-8e0937304e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1459735676691-2c21eea54445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1445217143695-467124038776?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1539067143050-ef15d2e49536?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1543510755-795d493b4a59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1459735858257-7d224723f6ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1540170732586-78bb280d254e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/photo-1498910265115-9fb541931cd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
  'https://images.unsplash.com/34/BA1yLjNnQCI1yisIZGEi_2013-07-16_1922_IMG_9873.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=600&q=80',
];
const getRandom = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const data = [...Array(images.length).keys()].map((i) => {
  return {
    key: String(i),
    image: images[i],
    name: mountains[i],
  };
});

export const avatars = [...Array(6).keys()].map(() => faker.image.avatar());

export default data;
