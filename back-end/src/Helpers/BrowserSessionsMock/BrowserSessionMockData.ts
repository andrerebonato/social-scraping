import { BrowserSession } from './BrowserSession';
import { sessions } from './sessions';

export function getBrowserSessionObjectByToken(token: string): BrowserSession {
    for(let i = 0; i <= sessions.length - 1; i++) {
        if(sessions[i].getToken === token) {
            return new BrowserSession(sessions[i].browser, sessions[i].token);
        } else {
            continue;
        }
    }
}

export function getAllSessions(): Array<BrowserSession> {
    return sessions;
}

export function addSession(browser: any, token: string) {
    const session: BrowserSession = new BrowserSession(browser, token);
    sessions.push(session);
}

export function addPageOnSession(token: string, page: any): any {
    const session: BrowserSession = getBrowserSessionObjectByToken(token);
    console.log(session, ' teste')
    console.log('page', page)
    session.addPage(page);
    console.log('apos', session)
}

export function getSessionByToken(token: string): BrowserSession {
    const session = sessions.filter(s => s.getToken === token);
    if(session) return session[0];
}

