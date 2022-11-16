'use strict';
require('dotenv').config({ path: `${__dirname}/.env` });
const { Telegraf, Markup } = require('telegraf');


module.exports.webhook = async (event) => {
  let body = event.body[0] === '{' ? JSON.parse(event.body) : JSON.parse(Buffer.from(event.body, 'base64'));
  const bot = new Telegraf(process.env.HOLYM_TOKEN);

  bot.start(async (ctx) => {
    return await ctx.reply('Головне меню',
      Markup
        .keyboard([
          ['🗣 Якщо потребуєш допомоги', '☎️ Лінія підтримки'],
          ['🌐 Мій сайт']
        ])
        .resize()
    )
  });
  bot.on('sticker', (ctx) => ctx.reply('🌞'))

  bot.hears('Головне меню', async (ctx) => {
    return await ctx.reply('Головне меню',
      Markup
        .keyboard([
          ['🗣 Якщо потребуєш допомоги', '☎️ Лінія підтримки'],
          ['🌐 Мій сайт']
        ])
        .resize()
    )
  });

  bot.hears('🗣 Якщо потребуєш допомоги', async (ctx) => {
    return await ctx.reply('🗣 Якщо потребуєш допомоги',
      Markup
        .keyboard([
          ['Отримати допомогу', 'Відмовили в допомозі'],
          ['Головне меню']
        ])
        .resize()
    )
  });

  bot.hears('Відмовили в допомозі', (ctx) => {
    return ctx.reply(
      'Відмовили в допомозі',
      Markup.inlineKeyboard([
        Markup.button.url('Відмовили в допомозі', 'https://forms.gle/pNaDWzMWdX7T5iqu8')
      ])
    )
  });

  bot.hears('Отримати допомогу', (ctx) => {
    return ctx.reply(
      'Отримати допомогу',
      Markup.inlineKeyboard([
        Markup.button.url('Отримати допомогу', 'https://forms.gle/SVi7M9VRQr62TdhT8')
      ])
    )
  });

  bot.hears('☎️ Лінія підтримки', async (ctx) => {
    return await ctx.reply('☎️ Лінія підтримки',
      Markup
        .keyboard([
          ['Написати', 'Зателефонувати'],
          ['Головне меню']
        ])
        .resize()
    )
  });

  bot.hears('Написати', async (ctx) => {
    return await ctx.reply('Написати',
      Markup.inlineKeyboard([
        Markup.button.url('Написати', 'https://t.me/svjatui_Mukolaj')
      ])
        .resize()
    )
  });

  bot.hears('Зателефонувати', async (ctx) => {
    return bot.telegram.sendMessage(ctx.chat.id, '+380 99 402 35 82')
  });

  bot.hears('🌐 Мій сайт', ctx => {
    return ctx.reply(
      '🌐 Мій сайт',
      Markup.inlineKeyboard([
        Markup.button.url('🌐 ', 'http://www.svjatujmukolaj.in.ua/')
      ])
    )
  });

  await bot.handleUpdate(body);
  return { statusCode: 200, body: '' };
};
