import puppeteer from 'puppeteer';
import cheerio from 'cheerio';
import insertToDB from '../scripts/mongo.js';
const url = 'https://www.volunteermatch.org/search?l=Atlanta%2C+GA%2C+USA&k=web&opp=831378';
// "pub-srp-opps__opp pub-srp-opps__opp--ao"
export async function scrapeVolunteer() {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);
	await page.waitForSelector('#opp-1254986')
	const html = await page.content();
	const $ = cheerio.load(html);
	console.log(html)
	const list_entry = "pub-srp-opps__opp pub-srp-opps__opp--ao"
	const potential_class = "pub-srp-opps__title ga-track-to-opp-details"
	const articles = [];
	const title = $('title');

	$('li[class="pub-srp-opps__opp pub-srp-opps__opp--ao"]').each((index, element) => {
        articles.push({
            title: $(element).find('a[class="pub-srp-opps__title ga-track-to-opp-details"]').text().trim(),
            description: $(element).find('p[class="pub-srp-opps__desc"]').text().trim(),
            company: $(element).find('a[class="gray-med ga-track-to-org-profile"]').text().trim(),
            date: $(element).find('div[class="pub-srp-opps__posted pub-srp-opps__sml-txt"]').text().trim()
        });
    });
	browser.close();
	console.log(articles.length)
	return articles;
}
export async function addArticlesToDatabase(articles){
	// console.log(articles.length);
	for (var i = 0; i < articles.length; i++) {
		await insertToDB(articles[i]);
	}
}

// const articles = await scrapeVolunteer();
// console.log("Now adding to database");
// addArticlesToDatabase(articles);
