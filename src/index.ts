import { Command } from 'commander';
import { version } from '../package.json'
import { create } from './command/create'


const program = new Command();

program
  .name('lly')
  .version(version, '-v, --version');

program
  .command('create')
  .description('创建一个项目')
  .argument('[name]', '项目名称')
  .action((dirName) => {
    create(dirName)
  });

program.parse();