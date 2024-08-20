import { Module } from '@nestjs/common';

// Controllers
import { AppController } from './app.controller';
import { UserController } from './User/user.controller';

// Modules
import { UserModule } from './User/user.module';
import { MongooseModule } from '@nestjs/mongoose';

// Services
import { AppService } from './app.service';

@Module({
  // imports: [UserModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  imports: [UserModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
