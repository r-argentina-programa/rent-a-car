import { Entity } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  public id: number;

  public createdAt: Date;

  public updatedAt: Date;
}
