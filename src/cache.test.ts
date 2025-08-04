import {Cache, CacheEntry, isCacheEntry} from "./pokecache.js";
import {expect, test} from 'vitest';

test.concurrent.each([
    {
        key:"https://Test1.com",
        val: "Lotta bones",
        interval: 500,
    },
    {
        key:"https://Test2.com",
        val: "Even more bones",
        interval: 1000,
    }
])("Test Caching $interval ms", async ({key, val, interval}: {key:string, val: any, interval: number}) => {
        const cache = new Cache(interval);

        cache.add(key,val);
        const cached = cache.get(key);
        expect(isCacheEntry(cached)).toBe(true);
        if (isCacheEntry(cached)) {
            expect(cached.val).toBe(val);
        }

        await new Promise((resolve) => setTimeout(resolve, interval + 200));
        const reaped = cache.get(key);
        expect(reaped).toBe(undefined);

        cache.stopReapLoop();
    }
)

