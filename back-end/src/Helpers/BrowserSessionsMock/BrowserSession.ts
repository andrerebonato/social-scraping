export class BrowserSession {
    public token: string;
    public browser: any;
    public pages: Array<any>;

    constructor(browser: any, token: string) {
        this.browser = browser;
        this.token = token;
        this.pages = new Array<any>();
    }

    public get getPages(): any {
        return this.pages;
    }

    public addPage(page: any) {
        this.pages.push(page);
    }

    public get getToken(): string {
        return this.token;
    }

    public set setToken(token: string) {
        this.token = token;
    }

    public get getBrowser(): any {
        return this.browser;
    }

    public set setBrowser(browser: any) {
        this.browser = browser;
    }
    
}