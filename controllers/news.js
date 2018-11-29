const puppeteer = require('puppeteer');

/**
 * Fetch all news from http://www.reseau-stas.fr/fr/actus-et-infos-reseau/3
 * @returns {array} Array of news
 */
const all = async () => {
    const browser = await puppeteer.launch({headless: "true"});
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
    await page.goto('http://www.reseau-stas.fr/fr/actus-et-infos-reseau/3', { waitUntil: 'networkidle' });

    let news_list = await page.evaluate((sel) => {
        let arr = []
        let el = document.querySelector(sel)
        let items = el.querySelectorAll('.news-list-item')
        items.forEach(function (item) {
            arr.push({
                title: item.querySelector('h2 a').innerHTML,
                description: item.querySelector('p small').innerHTML,
                summary: item.querySelector('.news-list-item-summary p').innerHTML.replace(/<(?:.|\n)*?>/gm, '') // Strip Html tag like <strong>
            })
        });

        return arr
    }, 'div.news_list');

    await browser.close();
    return news_list
}

module.exports = {
    all
}