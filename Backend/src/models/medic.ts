import { Speciality } from "./speciality";
export interface Medic{
    id: number;
    name: string;
    lastName: string;
    email: string;
    specialty: Speciality;
}