"use strict";
var ChangeDescriptionMigration_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDescriptionMigration = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const loopback4_migration_1 = require("loopback4-migration");
const repositories_1 = require("../repositories");
let ChangeDescriptionMigration = ChangeDescriptionMigration_1 = class ChangeDescriptionMigration {
    constructor(toDoRepository) {
        this.toDoRepository = toDoRepository;
        this.version = '6.1.0';
        this.scriptName = ChangeDescriptionMigration_1.name;
        this.dataSourceName = datasources_1.DbDataSource.dataSourceName;
        this.description = 'add description when it is missing, Manually added desc + title';
    }
    async up() {
        // retrieve all todoes without desc
        console.debug('Beginning of up');
        const todos = await this.toDoRepository.find({
            where: { tag: { exists: true } },
        });
        // add fullName property to each todo
        const updatetodos = todos.map(todo => this.toDoRepository.updateById(todo.id, {
            title: `$ Manually added desc ${todo.title}`,
        }));
        console.debug('Migration done');
        await Promise.all(updatetodos);
    }
    async down() {
        // For now do nothing
        // remove fullName property from all todos
        //   await this.toDoRepository.updateAll(<any>{
        //     $unset: {this.  },
        //   });
        console.debug('Beginning of down');
    }
};
ChangeDescriptionMigration = ChangeDescriptionMigration_1 = tslib_1.__decorate([
    (0, loopback4_migration_1.migrationScript)(),
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.TodoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.TodoRepository])
], ChangeDescriptionMigration);
exports.ChangeDescriptionMigration = ChangeDescriptionMigration;
//# sourceMappingURL=6.1.0.migration.js.map