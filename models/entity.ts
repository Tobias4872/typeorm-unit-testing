import { Column, PrimaryGeneratedColumn, Table } from "typeorm";

@Table()
export class Entity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public archived: boolean;

}
