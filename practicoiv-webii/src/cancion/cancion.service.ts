import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cancion } from "./cancion.model";
import { Album } from "../album/album.model";
import { CancionDto } from "./dto/cancion.dto";
import { UpdateCancionDto } from "./dto/update-cancion.dto";

@Injectable()
export class CancionService {
    constructor(
        @InjectRepository(Cancion)
        private cancionRepository: Repository<Cancion>,
        @InjectRepository(Album)
        private albumRepository: Repository<Album>,
    ) {}

    async findAll(): Promise<Cancion[]> {
        return this.cancionRepository.find({ relations: ["album"] });
    }

    async findById(id: number): Promise<Cancion> {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException("Invalid ID");
        }
        const cancion = await this.cancionRepository.findOne({
            where: { id },
            relations: ["album"],
        });
        if (!cancion) {
            throw new NotFoundException(`Cancion with ID ${id} not found`);
        }
        return cancion;
    }

    async createCancion(cancionDto: CancionDto): Promise<Cancion> {
        const album = await this.albumRepository.findOneBy({ id: cancionDto.albumId });
        if (!album) {
            throw new NotFoundException(`Album with ID ${cancionDto.albumId} not found`);
        }
        const nuevaCancion = this.cancionRepository.create({
            titulo: cancionDto.titulo,
            archivo: cancionDto.archivo,
            album,
        });
        return this.cancionRepository.save(nuevaCancion);
    }

    async updateCancion(id: number, updateCancionDto: UpdateCancionDto): Promise<Cancion> {
        const cancion = await this.findById(id);
        if (updateCancionDto.albumId) {
            const album = await this.albumRepository.findOneBy({ id: updateCancionDto.albumId });
            if (!album) {
                throw new NotFoundException(`Album with ID ${updateCancionDto.albumId} not found`);
            }
            cancion.album = album;
        }
        if (updateCancionDto.titulo) cancion.titulo = updateCancionDto.titulo;
        if (updateCancionDto.archivo) cancion.archivo = updateCancionDto.archivo;

        return this.cancionRepository.save(cancion);
    }

    async deleteCancion(id: number): Promise<void> {
        const result = await this.cancionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Cancion with ID ${id} not found`);
        }
    }
}
