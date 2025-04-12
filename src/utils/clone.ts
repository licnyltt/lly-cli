import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk';
import { log } from './log';
const figlet =  require("figlet");


const gitOptions: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
    trimmed: false,
};

const logger = createLogger({
    spinner: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) => (
            chalk.green(item)
        ))
    }
});

async function goodPrinter() {
    const data = await figlet("欢迎使用 lly-cli 脚手架")
    log(chalk.rgb(40, 156, 193).visible(data))
}

export async function clone(url: string, projectName: string, options: string[]) {
    const git: SimpleGit = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, projectName, options), '代码下载中...', {
            estimate: 6000
        })
        await goodPrinter()
        log()
        log(chalk.green('代码下载成功'))
        log(chalk.blackBright('======================================'))
        log(chalk.blackBright('====== 欢迎使用 lly-cli 脚手架 ======='))
        log(chalk.blackBright('======================================'))
        log()
        log()
        log(chalk.blackBright('==== 请使用 pnpm install 安装依赖 ===='))
        log(chalk.blackBright('==== 请使用 pnpm run dev 运行项目 ===='))
    } catch(error) {
        log.error(`${chalk.red('代码下载失败'), error}`)
    }
}