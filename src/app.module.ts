import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';


/*
e modificado el archivo
src/app.module.ts
para realizar lo siguiente:


Configuré el ConfigModule: Para que la aplicación pueda leer las variables de entorno de tu archivo
.env
(como DB_HOST, DB_USER, etc.).
Añadí TypeOrmModule.forRootAsync():
Establecí la conexión con PostgreSQL.
Utilicé las credenciales de tu
.env
.
Activé autoLoadEntities: true para que detecte automáticamente tu entidad
Product
.
Configuré el SSL con rejectUnauthorized: false, que es necesario para conectarse a instancias de AWS RDS como la que estás usando.
*/
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
      }),
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
