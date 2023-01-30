import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { ProductSubscriber } from './product/product.subscriber';
import { GetChangeAdapter } from './product/adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'eagle',
      entities: [Product],
      subscribers: [ProductSubscriber],
      synchronize: true,
      autoLoadEntities: true,
      logger: 'advanced-console',
      logging: 'all',
    }),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, GetChangeAdapter],
})
export class AppModule {}
