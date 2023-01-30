import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { GetChangeAdapter } from './adapter';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductService, GetChangeAdapter],
  controllers: [ProductController],
})
export class ProductModule {}
