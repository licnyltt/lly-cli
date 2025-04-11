import chalk from "chalk";
import ora from "ora"
import process from "child_process";


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
            console.log(chalk.red(error))
        }else{
            console.log(chalk.green('更新成功'))
        }
    })
}