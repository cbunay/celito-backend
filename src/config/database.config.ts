import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  autoLoadEntities: true,
  synchronize: true,
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};

export default databaseConfig;