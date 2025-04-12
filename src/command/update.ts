import chalk from "chalk";
import ora from "ora"
import process from "child_process";
import { log } from "../utils/log";


const spinner = ora({
    text: 'lly-cli 正在更新...',
    spinner: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((item) => (
            chalk.green(item)
        ))
    }
})

export async function update() {
    spinner.start()
    await process.exec('npm install lly-cli@latest -g', (error) => {
        spinner.stop()
        if(error){
            log.error(chalk.red(error))
        }else{
            log.success(chalk.green('更新成功'))
        }
    })
}