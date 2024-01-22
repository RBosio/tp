import { TypeIResponse } from "./type.model"

export class RoomIResponse {
    id: number
    image: string
    price: number
    type: TypeIResponse
    typeId: number
    ac: boolean
    tv: boolean
    towel: boolean
    shower: boolean
}

export class RoomI {
    price: number
    typeId: number
    ac: boolean
    tv: boolean
    towel: boolean
    shower: boolean
}