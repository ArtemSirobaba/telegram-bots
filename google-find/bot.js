const { Telegraf } = require('telegraf');
const bot = new Telegraf('1279381866:AAHoXVWPYnHUoXJRayAaraGtf0CSI2JfRM8');
const turl = require('turl');

bot.start((ctx) => ctx.reply('Welcome!'));

bot.on('photo', async (ctx) => {
  try {
    linkFile(ctx);
  } catch {
    ctx.reply('Sorry');
  }
});

const linkFile = async (ctx) => {
  const photoId =
    ctx.update.message.photo[ctx.update.message.photo.length - 1].file_id;
  const url = await ctx.telegram.getFileLink(photoId);
  const data = `https://www.google.com/searchbyimage?image_url=${url}&amp;site=search&amp;hl=ru&amp;sa=X&amp;ved=2ahUKEwj72a-o_5DsAhVOtSoKHce2D7wQ9Q96BAgBEBI`;
  turl
    .shorten(data)
    .then((res) => {
      ctx.reply(res);
    })
    .catch((err) => {
      ctx.reply(err);
    });
};

bot.on('document', async (ctx) => {
  try {
    documentFile(ctx);
  } catch {
    ctx.reply('Sorry');
  }
});

const documentFile = async (ctx) => {
  const photoId = ctx.update.message.document.file_id;
  const url = await ctx.telegram.getFileLink(photoId);
  const data = `https://www.google.com/searchbyimage?image_url=${url}&amp;site=search&amp;hl=ru&amp;sa=X&amp;ved=2ahUKEwj72a-o_5DsAhVOtSoKHce2D7wQ9Q96BAgBEBI`;

  turl
    .shorten(data)
    .then((res) => {
      ctx.reply(res);
    })
    .catch((err) => {
      ctx.reply(err);
    });
};

bot.launch();

console.log('bot starting');
