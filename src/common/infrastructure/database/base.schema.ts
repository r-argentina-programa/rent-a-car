import { EntitySchema } from 'typeorm';
import { EntitySchemaOptions } from 'typeorm/entity-schema/EntitySchemaOptions';
import { BaseEntity } from '../../domain/base.entity';

export class BaseSchema<T = BaseEntity> extends EntitySchema<T> {
  constructor(options?: EntitySchemaOptions<T>) {
    super({
      ...options,
      columns: {
        id: {
          type: Number,
          primary: true,
          generated: true,
        },
        ...options.columns,
        createdAt: {
          name: 'created_at',
          type: 'datetime',
          createDate: true,
        },
        updatedAt: {
          name: 'updated_at',
          type: 'datetime',
          createDate: true,
        },
      },
    });
  }
}
