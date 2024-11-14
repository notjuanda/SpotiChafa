import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Artista } from "./artista.model";
import { Genero } from "../genero/genero.model";
import { ArtistaDto } from "./dto/artista.dto";
import { UpdateArtistaDto } from "./dto/update-artista.dto";
import { Album } from "../album/album.model";
import { Cancion } from "../cancion/cancion.model";

@Injectable()
export class ArtistaService {
    constructor(
        @InjectRepository(Artista)
        private readonly artistaRepository: Repository<Artista>,
        @InjectRepository(Genero)
        private readonly generoRepository: Repository<Genero>,
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(Cancion)
        private readonly cancionRepository: Repository<Cancion>,
    ) {}

    async findAll(): Promise<Artista[]> {
        return this.artistaRepository.find({ relations: ["genero", "albumes"] });
    }

    async findById(id: number): Promise<Artista> {
        if (isNaN(id) || id <= 0) {
            throw new BadRequestException("Invalid ID");
        }

        const artista = await this.artistaRepository.findOne({
            where: { id },
            relations: ["genero", "albumes"],
        });
        if (!artista) {
            throw new NotFoundException(`Artista with ID ${id} not found`);
        }
        return artista;
    }

    async createArtista(artistaDto: ArtistaDto): Promise<Artista> {
        const genero = await this.generoRepository.findOneBy({ id: artistaDto.generoId });
        if (!genero) {
            throw new NotFoundException(`Genero with ID ${artistaDto.generoId} not found`);
        }

        const nuevoArtista = this.artistaRepository.create({
            nombre: artistaDto.nombre,
            imagen: artistaDto.imagen,
            genero,
        });

        return this.artistaRepository.save(nuevoArtista);
    }

    async updateArtista(id: number, updateArtistaDto: UpdateArtistaDto): Promise<Artista> {
        const artista = await this.findById(id);

        if (updateArtistaDto.generoId) {
            const genero = await this.generoRepository.findOneBy({ id: updateArtistaDto.generoId });
            if (!genero) {
                throw new NotFoundException(`Genero with ID ${updateArtistaDto.generoId} not found`);
            }
            artista.genero = genero;
        }

        if (updateArtistaDto.nombre) artista.nombre = updateArtistaDto.nombre;
        if (updateArtistaDto.imagen) artista.imagen = updateArtistaDto.imagen;

        return this.artistaRepository.save(artista);
    }

    async deleteArtista(id: number): Promise<void> {
        const result = await this.artistaRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Artista with ID ${id} not found`);
        }
    }

    async findDetailedById(id: number): Promise<Artista> {
        const artista = await this.artistaRepository.findOne({
            where: { id },
            relations: ["albumes", "albumes.canciones"],
        });

        if (!artista) {
            throw new NotFoundException("Artista not found");
        }

        return artista;
    }
}
