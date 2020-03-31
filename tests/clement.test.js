const timeout = 15000;

// série de tests sur la page d'accueil
describe("Tests login", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('login', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.web-74.com');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
        // vérifier que dans cet élément Body on trouve "Polr du campus"
        await page.screenshot({path: './tests/img/basic-home.png'});
        expect(html).toContain("Polr - Campus Annecy")
        await page.screenshot({path: './tests/img/basic-home.png'});
        await page.waitForSelector('.dropdown-toggle');
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.waitForSelector('.open');
        await page.type('input[name=username]', 'toto');
        await page.type('input[name=password]', 'tata');
        await page.screenshot({path: './tests/img/basic-homecliklogin.png'});
        await page.$eval('.login-form-submit', el => el.click());
        const login = await page.$eval('body', e => e.innerHTML);
        await page.screenshot({path: './tests/img/basic-homeclikloginconnect.png'});
        expect(login).toContain("toto")
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
