export interface LocateResponse {
    lat: number;
    lon: number;
    display_name: string;
    stateCode: string | null;
    stateFips: string | null;
    countyFips: string | null;
    countyName: string | null;
    supported: boolean;
}

export interface CountyState {
    stateCode: string | null;
    stateFips: string | null;
    countyFips: string | null;
    countyName: string | null;
    supported: boolean;
}
