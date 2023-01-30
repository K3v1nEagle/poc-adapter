import { Injectable } from '@nestjs/common';

@Injectable()
export class GetChangeAdapter {
  constructor() {}

  public async getChange(oldValue: number, newValue: number): Promise<any> {
    return await Promise.resolve(oldValue != newValue);
  }
}
