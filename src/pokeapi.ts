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

    async fetchPokemon(pokemonName: string): Promise<Pokemon>{
        let URL:string = `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`

        const cacheResult = this.#cache.get(URL);

        if (isCacheEntry(cacheResult)) {
            return cacheResult.val as Pokemon;
        }

        const response = await fetch(URL,{method: "GET"});

        if (!response.ok){
            throw new Error(response.statusText);
        }

        const data = await response.json();

        this.#cache.add(URL,data);
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

export type Pokemon = {
    id: number
    name: string
    base_experience: number
    height: number
    is_default: boolean
    order: number
    weight: number
    abilities: Ability[]
    forms: Form[]
    game_indices: Index[]
    held_items: HeldItem[]
    location_area_encounters: string
    moves: Mfe[]
    species: Species
    sprites: Sprites
    cries: Cries
    stats: Stat[]
    types: Type[]
    past_types: PastType[]
    past_abilities: PastAbility[]
}

export type Ability= {
    is_hidden: boolean
    slot: number
    ability: Ability2
}

export type Ability2 = {
    name: string
    url: string
}

export type Form ={
    name: string
    url: string
}

export type Index = {
    game_index: number
    version: Version
}

export type Version = {
    name: string
    url: string
}

export type HeldItem = {
    item: Item
    version_details: VersionDetail[]
}

export type Item = {
    name: string
    url: string
}

export type VersionDetail = {
    rarity: number
    version: Version2
}

export type Version2 = {
    name: string
    url: string
}

export type Mfe = {
    move: Move
    version_group_details: VersionGroupDetail[]
}

export type Move = {
    name: string
    url: string
}

export type VersionGroupDetail = {
    level_learned_at: number
    version_group: VersionGroup
    move_learn_method: MoveLearnMethod
    order: number
}

export type VersionGroup = {
    name: string
    url: string
}

export type MoveLearnMethod = {
    name: string
    url: string
}

export type Species = {
    name: string
    url: string
}

export type Sprites = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
    other: Other
    versions: Versions
}

export type Other = {
    dream_world: DreamWorld
    home: Home
    "official-artwork": OfficialArtwork
    showdown: Showdown
}

export type DreamWorld = {
    front_default: string
    front_female: any
}

export type Home = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type OfficialArtwork = {
    front_default: string
    front_shiny: string
}

export type Showdown = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type Versions = {
    "generation-i": GenerationI
    "generation-ii": GenerationIi
    "generation-iii": GenerationIii
    "generation-iv": GenerationIv
    "generation-v": GenerationV
    "generation-vi": GenerationVi
    "generation-vii": GenerationVii
    "generation-viii": GenerationViii
}

export type GenerationI = {
    "red-blue": RedBlue
    yellow: Yellow
}

export type RedBlue = {
    back_default: string
    back_gray: string
    front_default: string
    front_gray: string
}

export type Yellow = {
    back_default: string
    back_gray: string
    front_default: string
    front_gray: string
}

export type GenerationIi = {
    crystal: Crystal
    gold: Gold
    silver: Silver
}

export type Crystal = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export type Gold = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export type Silver = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export type GenerationIii = {
    emerald: Emerald
    "firered-leafgreen": FireredLeafgreen
    "ruby-sapphire": RubySapphire
}

export type Emerald = {
    front_default: string
    front_shiny: string
}

export type FireredLeafgreen = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export type RubySapphire = {
    back_default: string
    back_shiny: string
    front_default: string
    front_shiny: string
}

export type GenerationIv = {
    "diamond-pearl": DiamondPearl
    "heartgold-soulsilver": HeartgoldSoulsilver
    platinum: Platinum
}

export type DiamondPearl = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type HeartgoldSoulsilver = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type Platinum = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationV = {
    "black-white": BlackWhite
}

export type BlackWhite = {
    animated: Animated
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type Animated = {
    back_default: string
    back_female: any
    back_shiny: string
    back_shiny_female: any
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationVi = {
    "omegaruby-alphasapphire": OmegarubyAlphasapphire
    "x-y": XY
}

export type OmegarubyAlphasapphire = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type XY = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationVii = {
    icons: Icons
    "ultra-sun-ultra-moon": UltraSunUltraMoon
}

export type Icons = {
    front_default: string
    front_female: any
}

export type UltraSunUltraMoon = {
    front_default: string
    front_female: any
    front_shiny: string
    front_shiny_female: any
}

export type GenerationViii = {
    icons: Icons2
}

export type Icons2 = {
    front_default: string
    front_female: any
}

export type Cries = {
    latest: string
    legacy: string
}

export type Stat = {
    base_stat: number
    effort: number
    stat: Stat2
}

export type Stat2 = {
    name: string
    url: string
}

export type Type = {
    slot: number
    type: Type2
}

export type Type2 = {
    name: string
    url: string
}

export type PastType ={
    generation: Generation
    types: Type3[]
}

export type Generation = {
    name: string
    url: string
}

export type Type3 = {
    slot: number
    type: Type4
}

export type Type4 = {
    name: string
    url: string
}

export type PastAbility ={
    generation: Generation2
    abilities: Ability3[]
}

export type Generation2 = {
    name: string
    url: string
}

export type Ability3 = {
    ability: any
    is_hidden: boolean
    slot: number
}
