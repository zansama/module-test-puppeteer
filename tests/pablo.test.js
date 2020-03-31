const timeout = 15000;

// test d'un raccourcisseur d'URL
describe("Shorten Anonymous", () => {
    let page;
    let urlShort = 'pca-puppeteer';

    // vérification du chargement de la page d'accueil
    test('options shorten', async () => {
        await page.goto('http://polr.web-74.com');
        await page.waitForSelector('.long-link-input');
        await page.type('.long-link-input', 'https://app.campus-skills.com/');
        await page.screenshot({path: './tests/img/shorten-edit1.png'});
        await page.waitForSelector('#show-link-options');
        await page.$eval( '#show-link-options', el => el.click() );
        await page.waitForSelector('.custom-url-field');
        await page.type('.custom-url-field', urlShort);
        await page.$eval('#check-link-availability', el => el.click());
        await page.screenshot({path: './tests/img/shorten-edit2.png'});
        await page.waitForSelector('#shorten');
        await page.$eval( '#shorten', el => el.click());
        await page.waitForSelector('input.result-box');
        const val = await page.$eval('input.result-box', el => el.value);
        expect(val).toMatch('http://polr.web-74.com/' + urlShort);
        await page.screenshot({path: './tests/img/shorten-edit3.png'});
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
