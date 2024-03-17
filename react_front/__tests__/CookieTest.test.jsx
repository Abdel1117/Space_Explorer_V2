import { describe, it, expect, beforeEach } from 'vitest';
import { getCookie, setCookie, deleteCookie } from '../src/Functions/CookiesFunction/CookiesFunction';

// Mock pour document.cookie
const cookieMock = (() => {
    const cookieStore = {};
    return {
        get cookie() {
            return Object.entries(cookieStore)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                .join('; ');
        },
        set cookie(cookieString) {
            const [cookieName, cookieValue] = cookieString.split('=').map(decodeURIComponent);
            cookieStore[cookieName] = cookieValue;
        },
        clear() {
            for (const cookieName in cookieStore) {
                delete cookieStore[cookieName];
            }
        }
    };
})();

// Remplacer document.cookie par le mock
Object.defineProperty(global, 'document', {
    value: {
        cookie: {
            get: () => cookieMock.cookie,
            set: (cookieString) => { cookieMock.cookie = cookieString; }
        }
    }
});

describe('Cookie Functions', () => {
    beforeEach(() => {
        // Effacer les cookies avant chaque test
        cookieMock.clear();
    });

    it('setCookie and getCookie work correctly', () => {
        // Tester la définition d'un cookie
        setCookie('test', '123', { path: '/' });
        expect(document.cookie).toContain('test=123');

        // Tester la récupération d'un cookie
        const cookieValue = getCookie('test');
        expect(cookieValue).toBe('123');
    });

    it('deleteCookie removes a cookie', () => {

        setCookie('test', '123', { path: '/' });
        deleteCookie('test');

        const cookieValue = getCookie('test');
        console.log(cookieValue)
        expect(cookieValue).toBe("");
    });
});
