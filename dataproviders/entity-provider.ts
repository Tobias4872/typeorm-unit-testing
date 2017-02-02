import { Connection, QueryBuilder, Repository } from "typeorm";

import { Entity } from "../models/entity";

export class EntityProvider {

    // Repository setter/getter

    private queryBuilder: QueryBuilder<Entity>;

    public setQueryBuilder(queryBuilder: QueryBuilder<Entity>): void {
        this.queryBuilder = queryBuilder;
    }

    private getQueryBuilder(): QueryBuilder<Entity> {
        if (this.queryBuilder) {
            return this.queryBuilder;
        }
        return new QueryBuilder(this.connection);
    }

    // CRUD methods

    public constructor(private connection: Connection) { };

    public async create(name: string, archived: boolean): Promise<Entity> {
        const repository: Repository<Entity> = this.connection.getRepository(Entity);

        const entity = repository.create();
        entity.name = name;
        entity.archived = archived;

        return repository.persist(entity);
    }

    public async get(id: number): Promise<Entity> {
        return this.getQueryBuilder()
            .from(Entity, "e")
            .where("e.id = :id", { id })
            .andWhere("e.archived = 0")
            .getOne();
    }

}