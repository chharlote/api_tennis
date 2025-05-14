import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StatPlayer } from './statPlayer';

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn('increment', { name: 'id_player' })
    idPlayer!: number;

    @Column({ name: 'name_first', type: 'text', nullable: true })
    firstName!: string;

    @Column({ name: 'name_last', type: 'text', nullable: true })
    lastName!: string;

    @Column({ name: 'hand', type: 'text', nullable: true })
    hand!: string;

    @Column({ name: 'date_of_birth', type: 'int', nullable: true })
    dateOfBirth!: number;

    @Column({ name: 'country_code', type: 'text', nullable: true })
    countryCode!: string;

    @Column({ name: 'height', type: 'int', nullable: true })
    height!: number;

    @Column({ name: 'wikidata_id', type: 'text', nullable: true })
    wikidataId!: string;

}
