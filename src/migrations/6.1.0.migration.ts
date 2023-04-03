import {repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {MigrationScript, migrationScript} from 'loopback4-migration';
import {TodoRepository} from '../repositories';

@migrationScript()
export class ChangeDescriptionMigration implements MigrationScript {
  version = '6.1.0';
  scriptName = ChangeDescriptionMigration.name;
  dataSourceName = DbDataSource.dataSourceName;
  description =
    'add description when it is missing, Manually added desc + title';

  constructor(
    @repository(TodoRepository)
    private toDoRepository: TodoRepository,
  ) {}

  async up(): Promise<void> {
    // retrieve all todoes without tag
    console.debug('Beginning of up');
    const todos = await this.toDoRepository.find({
      where: {tag: {exists: true}},
    });

    // add fullName property to each todo
    const updatetodos = todos.map(todo =>
      this.toDoRepository.updateById(todo.id, {
        title: `$ Manually added title ${todo.title}`,
      }),
    );
    console.debug('Migration done');
    await Promise.all(updatetodos);
  }

  async down(): Promise<void> {
    // For now do nothing
    // remove fullName property from all todos
    //   await this.toDoRepository.updateAll(<any>{
    //     $unset: {this.  },
    //   });
    console.debug('Beginning of down');
  }
}
