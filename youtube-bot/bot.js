const { Telegraf } = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('1107260098:AAHMVw28j5VmqhShwNqLHiZwXFR7ucNcwdk');

bot.start((ctx) => {
  ctx.reply(
    `Hello, ${ctx.message.from.first_name}! I do some weird stuff, send me a YouTube Video Link :)`
  );
});

bot.on('text', async (ctx) => {
  try {
    if (
      ctx.message.text.includes('youtu') ||
      ctx.message.text.includes('youtube')
    )
      youTubeLink(ctx);
    else if (ctx.message.text.includes('reddit') === true) reddit(ctx);
    else
      ctx.reply(`Sorry, ${ctx.message.from.first_name}! YouTube links only!`);
  } catch {
    ctx.reply(`Sorry, ${ctx.message.from.first_name}! YouTube links only!`);
  }
});

const youTubeLink = async (ctx) => {
  try {
    const id = ctx.message.text
      .split(/[=,?,.,/,&]/g)
      .find((a) => a.length === 11);

    const response = await axios.get(
      `https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}&format=json`
    );

    const result = response.data;

    ctx.replyWithPhoto(result.thumbnail_url, {
      caption: `${result.title}
.
.
.
Edited by: ${result.author_name} `,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Download Music',
              url: `https://www.y2mate.com/youtube-mp3/${id}`,
            },
            {
              text: 'Download Video',
              url: `https://www.y2mate.com/youtube/${id}`,
            },
          ],
        ],
      },
    });
  } catch (err) {
    ctx.reply('Sorry, I can not do this');
  }
};

const reddit = async (ctx) => {
  const link = ctx.message.text.split('https')[1];
  ctx.replyWithPhoto(
    { source: './reddit.jpg' },
    {
      caption: `Download Reddit videos with audio. Convert Reddit video to mp3.`,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Download Video',
              url: `https://viddit.red/?url=https${link}`,
            },
          ],
        ],
      },
    }
  );
};

bot.launch();

console.log('Bot starting');

module.exports = { reddit };
