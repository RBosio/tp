import { ExtraIResponse } from "./extra.model"
import { RoomIResponse } from "./room.model"
import { UserIResponse } from "./user.model"

export class BookingIResponse {
    admissionDate: Date
    departureDate: Date
    status: string
    user: UserIResponse
    room: RoomIResponse
    extras: ExtraIResponse[]
}

export class BookingI {
    admissionDate: Date
    departureDate: Date
    status: string
    userDni: number
    roomId: number
}