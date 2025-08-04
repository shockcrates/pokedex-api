
export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export function isCacheEntry<T>(entry: any): entry is CacheEntry<T> {
    return typeof entry =="object" && "createdAt" in entry && "val" in entry;
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>;
    #reapIntervalId: NodeJS.Timeout | undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>( key: string, val: T ):void {

        if (!this.#cache.has(key) && val !== null) {

            this.#cache.set(key, {createdAt: Date.now(), val: val});
        }
        //Add message for already exists
    }

    get<T>(key: string): T | undefined {
        if (this.#cache.has(key)) {
            return this.#cache.get(key) as T;
        }
        else{
            return undefined;
        }
    }

    #reap():void {
        this.#cache.forEach( (val, key, cache) =>{
            if (Date.now() - this.#interval > val.createdAt) {

                cache.delete(key);
            }

        }
    )
    }

    #startReapLoop():void {
        this.#reapIntervalId = setInterval(()=> this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId)
        this.#reapIntervalId = undefined;
    }

}