import "reflect-metadata";
import * as chai from "chai";
import "mocha";
import * as sinon from "sinon";
import { QueryBuilder } from "typeorm";
import { Entity } from "../../../models/entity";
import { EntityProvider } from "../../../dataproviders/entity-provider";

describe("EntityProvider", () => {
    let queryBuilder: QueryBuilder<Entity>;
    let dataprovider: EntityProvider;

    beforeEach(() => {
        queryBuilder = new QueryBuilder<Entity>(null);

        dataprovider = new EntityProvider(null);
        dataprovider.setQueryBuilder(queryBuilder);
    });

    describe("#create()", () => {
    });

    describe("#get()", () => {
        it("should take the archived flag into account", async () => {
            // arrange
            const spyOnAndWhere = sinon.stub(queryBuilder, "andWhere").returns(queryBuilder);
            const spyOnGetOne = sinon.stub(queryBuilder, "getOne");

            // act
            await dataprovider.get(1);

            // assert
            sinon.assert.calledWithExactly(spyOnAndWhere, "e.archived = 0");
        });
    });

});
