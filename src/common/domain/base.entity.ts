import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  public id: number;

  public createdAt: Date;

  public updatedAt: Date;
}
