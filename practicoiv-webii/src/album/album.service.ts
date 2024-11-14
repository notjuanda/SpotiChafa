import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Album } from "./album.model";
import { Artista } from "../artista/artista.model";
import { AlbumDto } from "./dto/album.dto";
import { UpdateAlbumDto } from "./dto/update-album.dto";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(Artista)
        private readonly artistaRepository: Repository<Artista>,
    ) {}

    async findAll(): Promise<Album[]> {
        return this.albumRepository.find({ relations: ["artista", "canciones"] });
    }

    async findById(id: number): Promise<Album> {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException("Invalid ID");
        }

        const album = await this.albumRepository.findOne({
            where: { id },
            relations: ["artista", "canciones"],
        });
        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }
        return album;
    }

    async createAlbum(albumDto: AlbumDto): Promise<Album> {
        const artista = await this.artistaRepository.findOne({ where: { id: albumDto.artistaId } });
        if (!artista) {
            throw new NotFoundException(`Artista with ID ${albumDto.artistaId} not found`);
        }

        const nuevoAlbum = this.albumRepository.create({
            titulo: albumDto.titulo,
            imagen: albumDto.imagen,
            fechaLanzamiento: new Date(albumDto.fechaLanzamiento),
            artista,
        });

        return this.albumRepository.save(nuevoAlbum);
    }

    async updateAlbum(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        const album = await this.findById(id);

        if (updateAlbumDto.artistaId) {
            const artista = await this.artistaRepository.findOne({ where: { id: updateAlbumDto.artistaId } });
            if (!artista) {
                throw new NotFoundException(`Artista with ID ${updateAlbumDto.artistaId} not found`);
            }
            album.artista = artista;
        }

        if (updateAlbumDto.titulo) album.titulo = updateAlbumDto.titulo;
        if (updateAlbumDto.imagen) album.imagen = updateAlbumDto.imagen;
        if (updateAlbumDto.fechaLanzamiento) album.fechaLanzamiento = new Date(updateAlbumDto.fechaLanzamiento);

        return this.albumRepository.save(album);
    }

    async deleteAlbum(id: number): Promise<void> {
        const result = await this.albumRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }
    }
}
