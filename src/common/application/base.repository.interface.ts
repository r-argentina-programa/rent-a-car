export interface IBaseRepository<T> {
  findOneOrFail(id: string | number): Promise<T>;

  find(): Promise<T[]>;

  save(entity: T): Promise<T>;

  delete(entity: T): Promise<boolean>;

  softDelete(entity: T): Promise<T>;
}
