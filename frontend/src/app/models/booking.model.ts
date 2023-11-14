import { RoomIResponse } from "./room.model"
import { UserIResponse } from "./user.model"

export class BookingIResponse {
    admissionDate: Date
    departureDate: Date
    status: string
    user: UserIResponse
    room: RoomIResponse
}

export class BookingI {
    admissionDate: Date
    departureDate: Date
    status: string
    userDni: number
    roomId: number
}