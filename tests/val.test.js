const timeout = 25000;
// série de tests sur la page d'accueil
describe("Test sign up", () => {
    let page;
    // Sign up registration
    test('sign up', async () => {
        await page.goto('http://polr.web-74.com');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "Sign Up" de la navigation
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        // on attend que l'élément "form" soit chargé
        await page.waitForSelector('form');
        await page.type('div>div>form>[name="username"]', 'marley');
        await page.type('div>div>form>[name="password"]', '12345');
        await page.type('input[name=email]', 'marloche2@gmail.com');
        await page.$eval('.btn-success', el => el.click());
    }, timeout);
    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

    afterAll(async () => {
        // ouvrir un onglet dans le navigateur
        await page.goto('http://polr.web-74.com/logout');
    }, timeout)
});