import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Artista } from "../artista/artista.model";
import { Cancion } from "../cancion/cancion.model";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    imagen?: string;

    @Column({ type: "date" })
    fechaLanzamiento: Date;

    @ManyToOne(() => Artista, artista => artista.albumes)
    @JoinColumn({ name: "artista_id" })
    artista: Artista;

    @OneToMany(() => Cancion, cancion => cancion.album)
    canciones: Cancion[];
}
