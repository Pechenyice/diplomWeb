import puppeteer from "puppeteer";

jest.setTimeout(15000)

describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  it("render landing main page", async () => {
    await page.goto("http://localhost:3000", {waitUntil: 'load'});
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    expect(bodyHTML).toContain('Start your own business with the BUSINASS community!');
  });

  afterAll(() => browser.close());
});