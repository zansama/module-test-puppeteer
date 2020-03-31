const timeout = 15000;

// test de la création d'un nouvel utilisateur en tant que admin
describe("Create a new user", () => {
    let page;

    // vérification du chargement de la page d'accueil
    test('create a new user', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.web-74.com');
        // attendre que l'élément <body> soit chargé
        await page.waitForSelector('body');
        // récupérer le contenu de l'élément <body>
        const html = await page.$eval('body', e => e.innerHTML);
         // vérifier que dans cet élément Body on trouve "Polr du campus"
        expect(html).toContain("Polr - Campus Annecy")
        await page.waitForSelector('.dropdown-toggle');
        await page.$eval('.dropdown-toggle', el => el.click());
        await page.waitForSelector('.open');
        await page.type('input[name=username]', 'admin');
        await page.type('input[name=password]', 'campus');
        await page.$eval('.login-form-submit', el => el.click());
        const login = await page.$eval('body', e => e.innerHTML);
        //Fin login-------------------------------------------------------
        // on attent que l'élément ".dropdown-toggle login-name" soit chargé
        await page.waitForSelector('.login-name');
        // click sur le lien "userName" de la navigation
        await page.$eval( '.login-name', el => el.click() );
        await page.screenshot({path: './tests/img/newUser1.png'});
        // click sur le lien "Dashboard" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '.pull-right li a' ) )
                .filter( el => el.textContent === 'Dashboard' )[0].click();
        });
        // on attent que l'élément ".nav nav-pills nav-stacked admin-nav" soit chargé
        await page.waitForSelector('.admin-nav');
        await page.screenshot({path: './tests/img/newUser2.png'});
        // click sur le lien "Admin" de la navigation
        await page.evaluate( () => {
            Array
                .from( document.querySelectorAll( '.admin-nav li a' ) )
                .filter( el => el.textContent === 'Admin' )[0].click();
        });
        await page.screenshot({path: './tests/img/newUser3.png'});
        // on attent que l'élément ".btn btn-primary btn-sm status-display" soit chargé
        await page.waitForSelector('.status-display');
        // click sur le lien "New" de la navigation
        await page.$eval( '.status-display', el => el.click() );
        await page.screenshot({path: './tests/img/newUser4.png'});
        // remplit l'input UserName
        await page.type('input[ng-model="newUserParams.username"]', 'polalaPieuvre');
        // remplit l'input PassWord
        await page.type('input[ng-model="newUserParams.userPassword"]', 'pola1234');
        // remplit l'input Email
        await page.type('input[ng-model="newUserParams.userEmail"]', 'pola@pola.fr');
        // on attent que l'élément ".status-display new-user-add" soit chargé
        await page.waitForSelector('.new-user-add');
        await page.$eval( '.new-user-add', el => el.click() );
        await page.screenshot({path: './tests/img/newUser5.png'});


      
    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
