import { ScrapflyClient, ScrapeConfig, ScrapeResult, log } from "scrapfly-sdk";
// https://scrapfly.io/docs/sdk/typescript
// Optional: set log level to debug to see all details
log.setLevel("DEBUG");

const scrapfly = new ScrapflyClient({
  key: "scp-live-002b3e50e3574bc89194bca9581b2781",
});

const result = await scrapfly.scrape(
  new ScrapeConfig({
    url: "https://www.zillow.com/async-create-search-page-state",
    // optional configuration:
    method: "PUT", // GET, POST, PUT etc.
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      searchQueryState: {
        pagination: {},
        isMapVisible: true,
        mapBounds: {
          west: -118.95967561523437,
          east: -117.86378938476562,
          south: 33.628618640064396,
          north: 34.4117157513132,
        },
        filterState: {
          sortSelection: {
            value: "globalrelevanceex",
          },
          isForSaleByAgent: {
            value: false,
          },
          isForSaleByOwner: {
            value: false,
          },
          isComingSoon: {
            value: false,
          },
          isAuction: {
            value: false,
          },
          isForSaleForeclosure: {
            value: false,
          },
        },
        isListVisible: true,
      },
      wants: {
        cat1: ["mapResults"],
      },
      requestId: 2,
      isDebugRequest: false,
    },
    asp: true, // enable scraper blocking bypass
    country: "US", // set proxy country
    // render_js: true, // enable headless web browser
    // wait_for_selector: "#grid-search-results > ul",
  })
);
// 3. access scraped result data
console.log(JSON.parse(result.result.content));
// 3.1 and even process it with CSS selectors:
// console.log(result.selector("h3").text());
