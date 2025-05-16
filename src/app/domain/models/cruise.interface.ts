export interface CruiseResponse {
    intCode: number
    objData: ObjData
}

interface ObjData {
    Cruise: Cruise
}

interface Cruise {
    Ship: Ship
}

interface Ship {
    PicturesGalerie: PicturesGalerie
}

interface PicturesGalerie {
    Picture: [Picture]
}

export interface Picture {
    label: string
    url: string
}