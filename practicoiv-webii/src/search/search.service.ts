import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Artista } from "../artista/artista.model";
import { Cancion } from "../cancion/cancion.model";
import { Album } from "../album/album.model";
import { Genero } from "../genero/genero.model";

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Artista)
        private readonly artistaRepository: Repository<Artista>,
        @InjectRepository(Cancion)
        private readonly cancionRepository: Repository<Cancion>,
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(Genero)
        private readonly generoRepository: Repository<Genero>,
    ) {}

    async search(term: string) {
        const searchTerm = `%${term}%`;

        const [artistas, canciones, albums, generos] = await Promise.all([
            this.artistaRepository.find({ where: { nombre: Like(searchTerm) } }),
            this.cancionRepository.find({ where: { titulo: Like(searchTerm) } }),
            this.albumRepository.find({ where: { titulo: Like(searchTerm) } }),
            this.generoRepository.find({ where: { nombre: Like(searchTerm) } }),
        ]);

        return { artistas, canciones, albums, generos };
    }
}
