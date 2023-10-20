import puppeteer from "puppeteer-core";

async function run() {
  let browser;

  try {
    const auth = "brd-customer-hl_1af83a67-zone-scraping_browser:n08cief59gno";
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://${auth}@brd.superproxy.io:9222`,
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto("https://www.zillow.com/homes/new_homes/");

    // const product = await page.evaluate(() => {
    //   const results = [];

    //   // Extract the product name and price for each listing
    //   const listings = document.querySelectorAll("#grid-search-results > ul");

    //   listings.forEach((listing) => {
    //     const productAddress = listing
    //       .querySelector("#address")
    //       .textContent.trim();
    //     const productPrice = listing
    //       .querySelector(
    //         "div > div.StyledPropertyCardDataWrapper-c11n-8-84-3__sc-1omp4c3-0.bKpguY.property-card-data > div.StyledPropertyCardDataArea-c11n-8-84-3__sc-yipmu-0.fDSTNn > div > span"
    //       )
    //       .textContent.trim();
    //     results.push({ address: productAddress, price: productPrice });
    //   });

    //   return results;
    // });

    // console.log(product);

    const body = await page.$("body");
    const selector = "#grid-search-results > ul";
    await page.waitForSelector(selector);
    const el = await page.$(selector);
    // const text = await el.evaluate((el) => el.innerHTML);
    // console.log(text);
    const html = await page.evaluate((el) => el.innerHTML);
    console.log(html);

    return;
  } catch (error) {
    console.error("Error connecting to browser:", error);
  } finally {
    await browser?.close();
  }
}

run();
