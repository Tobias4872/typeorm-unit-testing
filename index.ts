import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { EntityProvider } from "./dataproviders/entity-provider";

(async () => {
    //
    // CREATE CONNECTION
    //
    console.log(">>>> Creating connection ...");
    const connection = await createConnection({
        driver: {
            database: "unit-testing",
            type: "sqlite",
            storage: "./db",
        },
        entities: [
            "./models/*.js",
        ],
        logging: {
            logQueries: true,
        },
    });

    //
    // SYNC SCHEMA
    //
    console.log(">>>> Sync'ing schema ...");
    await connection.syncSchema();

    //
    // DO SOMETHING
    //
    const dataprovider = new EntityProvider(connection);
    const entity1 = await dataprovider.create("Regular Entity", false);
    const entity2 = await dataprovider.create("Archived Entity", true);

    const regular = await dataprovider.get(entity1.id);
    const archive = await dataprovider.get(entity2.id);

    //
    // CLEAN UP
    //
    console.log(">>>> Cleaning up ...");
    connection.close();

})();
