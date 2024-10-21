import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './car.dto';
 

const carProjection = {
    __v: false,
    _id: false,
}

@Injectable()
export class CarService {
    
    constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

    public async getCars(): Promise<CarDto[]> {
        const cars = await this.carModel.find({}, carProjection).exec();
        if (!cars || !cars[0]) {
            throw new HttpException('Not found', 404);
        }
        return cars;
    }

    public async postCar(newCar: CarDto) {
        const car = await new this.carModel(newCar);
        return car.save();
    }

    public async getCarById(id: number): Promise<CarDto> {
        const car = await this.carModel.findOne({ id }, carProjection).exec();
        if (!car) {
            throw new HttpException('Not found', 404);
        }
        return car;       
    }

    public async deleteCarById(id: number): Promise<any> {
        const car = await this.carModel.deleteOne({ id }).exec();
        if (car.deletedCount === 0) {
            throw new HttpException('Not found', 404);
        }
        return car;
    }

    public async putCarById(id: number, propertyName: string, propertyValue: string): Promise<CarDto> {
        const car = await this.carModel.findOneAndUpdate(
            { id },
            {
                [propertyName]: propertyValue,
            }
            ).exec();
        if (!car) {
            throw new HttpException('Not found', 404);
        }
        return car;
        }
    }




// before implementing mongoose
// @Injectable()
// export class CarService {
//     private cars = CARS;

//     public getCars() {
//         return this.cars;
//     }

//     public postCar(car) {
//         return this.cars.push(car);
//     }

//     public getCarById(id: number): Promise<any> {
//         const carid = Number(id);
//         return new Promise((resolve) => {
//             const car = this.cars.find((car) => car.id === carid);
//             if (car) {
//                 throw new HttpException('Not Found', 404);
//             }
//             return resolve(car);
//         })

//     }

//     public deleteCarById(id: number): Promise<any> {
//         const carid = Number(id);
//         return new Promise((resolve) => {
//             const index = this.cars.findIndex((car) => car.id === carid);
//             if (index === -1) {
//                 throw new HttpException('Not Found', 404);
//             }
//             this.cars.splice(index, 1);
//             return resolve(this.cars);
//         });
//     }

//     public putCarById(id: number, propertyName: string, propertyValue: string): Promise<any> {
//         const carid = Number(id);
//         return new Promise((resolve) => {
//             const index = this.cars.findIndex((car) => car.id === carid);
//             if (index === -1) {
//                 throw new HttpException('Not Found', 404);
//             }
//             this.cars[index][propertyName] = propertyValue;
//             return resolve(this.cars[index]);
//         })
//     }
// }
