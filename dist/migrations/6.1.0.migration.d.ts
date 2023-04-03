import { MigrationScript } from 'loopback4-migration';
import { TodoRepository } from '../repositories';
export declare class ChangeDescriptionMigration implements MigrationScript {
    private toDoRepository;
    version: string;
    scriptName: string;
    dataSourceName: string;
    description: string;
    constructor(toDoRepository: TodoRepository);
    up(): Promise<void>;
    down(): Promise<void>;
}
