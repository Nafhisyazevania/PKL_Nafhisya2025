export interface IFramework {
    nama: string;
    url_logo: string;
}

export default interface IPorjek {
    id: number;
    judul: string;
    deskripsi: string;
    status: string;
    mulai: string;
    selesai?: string;
    framework: IFramework[];
}