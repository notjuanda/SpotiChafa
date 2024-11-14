import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Genero } from "./genero.model";

@Injectable()
export class GeneroService {
    constructor(
        @InjectRepository(Genero)
        private generosRepository: Repository<Genero>,
    ) {}

    findAll(): Promise<Genero[]> {
        return this.generosRepository.find({ relations: ["artistas"] });
    }

    async findById(id: number): Promise<Genero> {
        const genero = await this.generosRepository.findOne({
            where: { id },
            relations: ["artistas"],
        });
        if (!genero) {
            throw new NotFoundException(`Genero with ID ${id} not found`);
        }
        return genero;
    }

    async createGenero(genero: Genero): Promise<Genero> {
        return this.generosRepository.save(genero);
    }

    async updateGenero(id: number, genero: Partial<Genero>): Promise<Genero> {
        const existingGenero = await this.findById(id);
        if (!existingGenero) {
            throw new NotFoundException(`Genero with ID ${id} not found`);
        }
        return this.generosRepository.save({ ...existingGenero, ...genero });
    }

    async deleteGenero(id: number): Promise<void> {
        const result = await this.generosRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Genero with ID ${id} not found`);
        }
    }
}
