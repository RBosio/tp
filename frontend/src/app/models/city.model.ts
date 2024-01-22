import { ProvinceIResponse } from "./province.model"

export class CityIResponse {
    zipCode: string
    name: string
    province: ProvinceIResponse
}

export class CityI {
    zipCode: string
    name: string
}