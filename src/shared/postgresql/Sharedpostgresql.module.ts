import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// El sharedPostgre es global,
// el config, lo hace global
// SSL Solo se usa para la nube importante
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.LOCALHOST_POSTGRE,
      port: parseInt(process.env.PORT_POSTGRE),
      username: process.env.DATABASE_USERNAME_POSTGRES,
      password: process.env.DATABASE_PASSWORD_POSTGRES,
      synchronize: true,
      entities: [],
      logging: true,
      database: process.env.DATABASE_NAME_POSTGRES,
      ssl: process.env.POSTGRES_SSL === 'true',
      extra: {
        ssl:
          process.env.POSTGRES_SSL === 'true'
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class SharedPostgresqlModule {}
