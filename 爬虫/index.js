/*
  1. 打开浏览器
  2. 打开tab页面
  3. 输入url网址
  4. 等待页面加载完成，爬取数据
  5. 保存数据到数据库中
  6. 关闭浏览器
 */

const puppeteer = require('puppeteer');

(async () => {
  // 1. 打开浏览器
  const browser = await puppeteer.launch({
    headless: false  // 有页面
  });
  // 2. 打开tab页面
  const page = await browser.newPage();
  // 3. 输入url网址
  await page.goto('https://movie.douban.com/cinema/nowplaying/shenzhen/');
  // 4. 等待页面加载完成，爬取数据
  const result = await page.evaluate(() => {
    const result = [];
    // 对页面进行操作
    $('#nowplaying .lists>li').each(function (index, item) {
      const $item = $(item);
      result.push({
        a: $item.find('.poster a').attr('href'),
        img: $item.find('.poster img').attr('src'),
        title: $item.find('.stitle a').text().trim(),
        rating: $item.find('.subject-rate').text().trim(),
      })
    });

    return result;
  });

  // 继续爬取数据
  for (let i = 0; i < result.length; i++) {
    const item = result[i];
    // 跳转网址
    await page.goto(item.a, {
      waitUntil: 'networkidle2'
    });
    // 爬取数据
    const detail = await page.evaluate(() => {
      const director = $('#info .attrs a')[0].innerText;
      const summary = $('[property="v:summary"]').text().trim();
      return {
        director,
        summary
      }
    });

    Object.assign(item, detail);
  }
  // 5. 保存数据到数据库中
  console.log(result);
  // 6. 关闭浏览器
  await browser.close();
})();