import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mzblog:tA8hQwzBMahZiPmU@mzblog-production.57pvr9v.mongodb.net/',
    ),
  ],
})
export class DbModule {}
