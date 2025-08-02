
export class PokeApi {
    private static readonly baseURL = "http://pokeapi.co/api/v2";

    constructor() {
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations>{
        let URL:string;
        if (!pageURL) {
            URL = PokeApi.baseURL + "/location-area/?limit=20";
        } else {
            URL = pageURL;
        }
        console.log(URL);
        let response = await fetch(URL, {
            method: "GET",
        });

        //console.log(await response.text());
        return await response.json();
    }
    async fetchLocation(locationName: string): Promise<Location>{
        let URL: string = `https://pokeapi.co:443/api/v2/location-area/${locationName}/`;

        let response = await fetch(URL);
        return response.json();
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