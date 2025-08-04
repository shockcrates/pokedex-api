import { Cache, CacheEntry, isCacheEntry } from "./pokecache.js"
export class PokeApi {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor() {
        this.#cache = new Cache(30000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations>{
        let URL:string;
        if (!pageURL) {
            URL = PokeApi.baseURL + "/location-area/?offset=0&limit=20";
        } else {
            URL = pageURL;
        }

        const cacheResult = this.#cache.get(URL)
        if (isCacheEntry(cacheResult)) {

            return  cacheResult.val as ShallowLocations;
        }

        console.log(URL);
        let response = await fetch(URL, {
            method: "GET",
        });

        //console.log(await response.text());
        const data = await response.json();
        this.#cache.add(URL, data);

        return data;
    }
    async fetchLocation(locationName: string): Promise<Location>{
        let URL: string = `https://pokeapi.co/api/v2/location-area/${locationName}/`;

        const cacheResult = this.#cache.get(URL)
        if (isCacheEntry(cacheResult)) {

            return  cacheResult.val as Location;
        }

        const response = await fetch(URL,{method: "GET"});
        if (!response.ok){
            throw new Error(response.statusText);
        }

        const data = await response.json();
        this.#cache.add(URL, data);

        return data;
    }
}
export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: [
        {
            name?: string;
            url: string;
        }
    ]
}

export type Location = {
    id: number;
    name: string;
    game_index: number;
    encounter_method_rates: [
        {
            encounter_method: {
                name: string;
                url: string;
            },
            version_details: [{
                rate: number;
                version: {
                    name: string;
                    url: string;
                }
            }
        ]
        }
    ]
    location: {
        name: string;
        url: string;
    }
    names: [
        {
            name: string;
            language:{
                name: string;
                url: string;
            }
        }
    ],
    pokemon_encounters: [
        {
            pokemon: {
                name: string;
                url:string;
            },
            version_details: [{
                version: {
                    name: string;
                    url: string;
                },
                max_chance: number;
                encounter_details:[
                    {
                        min_level: number;
                        max_level: number;
                        condition_values:number[];
                        chance: number;
                        method: {
                            name: string;
                            url: string;
                        }
                    }
                ]
            }

            ]
        }
    ]
}
