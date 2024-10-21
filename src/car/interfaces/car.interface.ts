import { Document } from 'mongoose';

export interface ICar extends Document {
    readonly id: number;
    readonly brand: String;
    readonly color: String;
    readonly models: String;
}