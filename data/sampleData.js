//This sample data is written by ai

// We are exporting two arrays: users and games

// Note: We provide plain text passwords. Our User model's pre-save hook
// will automatically hash them before saving to the database.
export const users = [
  {
    username: 'PixelWarrior99',
    name:"John",
    email: 'pixel.warrior@example.com',
    password: 'password123',
  },
  {
    username: 'CodeNinja',
    name:"Edward",
    email: 'ninja@example.com',
    password: 'securepassword',
  },
];

export const games = [
  {
    title: 'The Witcher 3: Wild Hunt',
   // developer: 'CD Projekt Red',
    genre: 'RPG',
   // summary: 'A story-driven, open world RPG...',
   // cover_image_url: 'https://example.com/covers/witcher3.jpg',
  },
  {
    title: 'Elden Ring',
   // developer: 'FromSoftware',
    genre: 'Action RPG',
  //  summary: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished...',
   // cover_image_url: 'https://example.com/covers/eldenring.jpg',
  },
  {
    title: 'Starfield',
   // developer: 'Bethesda Game Studios',
    genre: 'RPG',
  //  summary: 'Starfield is the first new universe in 25 years from Bethesda...',
 //   cover_image_url: 'https://example.com/covers/starfield.jpg',
  },
];

