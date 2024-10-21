import { Module } from '@nestjs/common';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/car_manager'),
    CarModule
  ],
  // removed controller and provider from here beacuse we need car module, there is no need of app module:if needed then, :app module kept it there  
})
export class AppModule {}
