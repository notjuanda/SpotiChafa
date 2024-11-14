import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Album } from "../album/album.model";

@Entity()
export class Cancion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    titulo: string;

    @Column()
    archivo?: string;

    @ManyToOne(() => Album, album => album.canciones)
    @JoinColumn({ name: "album_id" })
    album: Album;
}
