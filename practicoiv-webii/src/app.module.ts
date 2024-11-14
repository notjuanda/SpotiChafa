import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
import { DataSource } from "typeorm";
import { GeneroController } from "./genero/genero.controller";
import { Genero } from "./genero/genero.model";
import { GeneroService } from "./genero/genero.service";
import { ArtistaController } from "./artista/artista.controller";
import { ArtistaService } from "./artista/artista.service";
import { AlbumController } from "./album/album.controller";
import { AlbumService } from "./album/album.service";
import { CancionController } from "./cancion/cancion.controller";
import { CancionService } from "./cancion/cancion.service";
import { Cancion } from "./cancion/cancion.model";
import { Artista } from "./artista/artista.model";
import { Album } from "./album/album.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { SearchController } from "./search/search.controller";
import { SearchService } from "./search/search.service";

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, "..", "uploads"),
            serveRoot: "/uploads",
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3307,
            username: "root",
            password: "",
            database: "practicoiv",
            entities: [Genero, Artista, Album, Cancion],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Genero, Artista, Album, Cancion]),
    ],
    controllers: [AppController, GeneroController, ArtistaController, AlbumController, CancionController, SearchController],
    providers: [AppService, GeneroService, ArtistaService, AlbumService, CancionService, SearchService],
})
export class AppModule {
    constructor(private datasource: DataSource) {}
}
