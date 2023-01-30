import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { Inject, Logger } from '@nestjs/common';
import { GetChangeAdapter } from './adapter';

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
  constructor(public readonly _getChange: GetChangeAdapter) {}

  listenTo(): any {
    return Product;
  }

  async afterUpdate(event: UpdateEvent<Product>): Promise<any> {
    const priceGotUpdated = event.updatedColumns.find(
      value => value.propertyName,
      Product.prototype.price,
    );
    if (priceGotUpdated) {
      if (
        await this._getChange.getChange(
          event.databaseEntity.price,
          event.entity.price,
        )
      ) {
        Logger.log(
          `Price changed from ${event.databaseEntity.price} to ${event.entity.price}`,
          'Product Price Updated',
          false,
        );
      }
    }
  }
}
