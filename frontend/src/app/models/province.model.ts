import { CountryIResponse } from "./country.model"

export class ProvinceIResponse {
    id: number
    name: string
    country: CountryIResponse
    countryId: number
}

export class ProvinceI {
    name: string
}