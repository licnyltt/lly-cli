import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from 'progress-estimator'
import chalk from 'chalk'

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

export async function clone(url: string, projectName: string, options: string[]) {
    const git: SimpleGit = simpleGit(gitOptions);
    try {
        await logger(git.clone(url, projectName, options), '代码下载中...', {
            estimate: 6000
        })
        console.log()
        console.log(chalk.green('代码下载成功'))
        console.log(chalk.blackBright('======================================'))
        console.log(chalk.blackBright('====== 欢迎使用 lly-cli 脚手架 ========'))
        console.log(chalk.blackBright('======================================'))
        console.log()
        console.log()
        console.log(chalk.blackBright('==== 请使用 pnpm install 安装依赖 ===='))
        console.log(chalk.blackBright('==== 请使用 pnpm run dev 运行项目 ===='))
    } catch {
        console.error(chalk.red('代码下载失败'))
    }
}