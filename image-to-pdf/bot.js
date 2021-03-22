const { Telegraf } = require('telegraf');
const bot = new Telegraf('1270650929:AAG-5Y9iqAU1l1xvVJpHr7ZkudfDEH2uq9k');
const imagesToPdf = require('images-to-pdf');
const download = require('download-file');
// const request = require('request-promise');
// const { readFileSync } = require('fs');
// const { prependListener } = require('process');

bot.start((ctx) => ctx.reply('Hello, I can convert Image to PDF file'));

bot.on('photo', async (ctx) => {
  try {
    photoFile(ctx);
  } catch {
    ctx.reply('Sorry');
  }
});

const photoFile = async (ctx) => {
  const photoId =
    ctx.update.message.photo[ctx.update.message.photo.length - 1].file_id;

  const url = await ctx.telegram.getFileLink(photoId);

  const options = {
    directory: './photos/',
    filename: url.split('/')[6],
  };

  download(url, options, function (err) {
    if (err) throw err;
  });

  const file = url.split('/')[6];

  getPdf(ctx, file);
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

  const options = {
    directory: './photos/',
    filename: url.split('/')[6],
  };

  download(url, options, function (err) {
    if (err) throw err;
  });

  const file = url.split('/')[6];

  getPdf(ctx, file);
};

const getPdf = async (ctx, file) => {
  function name() {
    if (ctx.update.message.caption === undefined)
      return `Pdf_${ctx.update.message.from.username}`;
    else return ctx.update.message.caption;
  }
  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  await timeout(1000);

  await imagesToPdf([`./photos/${file}`], `./pdf/${name()}.pdf`);

  await timeout(1000);

  ctx.replyWithDocument({ source: `./pdf/${name()}.pdf` });
};

bot.launch();

console.log('Bot starting');

// const token = '1247297939:AAG5GFqyWSfR34C9wAx6mLnlm_qIJ4gFuOQ';

//   const id = fileId();

//   const response = await request({
//     // парсить зі сторінки лінк
//     method: 'GET',
//     uri: `https://api.telegram.org/bot${token}/getFile?file_id=${id.file_id}`,
//   });

//   const url = `https://api.telegram.org/file/bot${token}/${response
//     .split(':')[6]
//     .replace(/[""}]/g, '')}`; // лінк з якого буде скачуватися файл
