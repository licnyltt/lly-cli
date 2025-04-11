import { select, input } from '@inquirer/prompts';
import { clone } from '../utils/clone'
import path from 'path'
import fs from 'fs'
import { version, name } from '../../package.json'
import axios, { AxiosResponse } from 'axios'
import { gt } from 'lodash'
import chalk from 'chalk';




export interface TemplateInfo {
    name: string // 模板名称，
    downloadUrl: string // 模板下载地址，
    description: string // 模板描述，
    branch: string // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
    [
        'Vite-Vue3-TypeScript-template1',
        {
            name: 'Vite-Vue3-TypeScript-template1',
            downloadUrl: 'git@gitee.com:codelyty/cli-template.git',
            description: 'Vue3技术栈开发模板',
            branch: 'master'
        }
    ],
    [
        'Vite-Vue3-TypeScript-template2',
        {
            name: 'Vite-Vue3-TypeScript-template2',
            downloadUrl: 'git@gitee.com:codelyty/cli-template.git',
            description: 'Vue3技术栈开发模板',
            branch: 'master'
        }
    ]
])

export function isOverWrite(projectName: string) {
    console.warn(`${projectName}文件已存在`)
    return select({
        message: '是否覆盖？',
        choices: [
            {
                name: '覆盖',
                value: true
            },
            {
                name: '不覆盖',
                value: false
            }
        ]
    })
}

export async function getNpmInfo(name: string) {
    const npmUrl = `https://registry.npmjs.org/${name}`
    let res = {}
    try {
        res = await axios.get(npmUrl)
    } catch (error) {
        console.error(error)
    }
    return res
}

export async function getNpmLatestVersion(name: string) {
    const { data } = (await getNpmInfo(name)) as AxiosResponse
    return data['dist-tags'].latest
}

export async function checkVersion(name: string, version: string) {
    const latestVersion = await getNpmLatestVersion(name)
    const needUpdate = gt(latestVersion, version)
    if (needUpdate) {
        console.warn(`检查到lly最新版本：${chalk.blackBright(latestVersion)}，当前版本是${chalk.blackBright(version)}`)
        console.log(`可使用：${chalk.yellow('npm install lly@latest')}，或者使用：${chalk.yellow('lly update')}更新`)
    }
    return needUpdate
}


export async function create(projectName?: string) {
    // 初始化模板列表
    const templateList = Array.from(templates).map((item: [string, TemplateInfo]) => {
        const [name, info] = item
        return {
            name,
            value: name,
            description: info.description
        }
    })

    if (!projectName) {
        projectName = await input({ message: '请输入项目名称' })
    }

    // 检查版本
    await checkVersion(name, version)

    // 如果已存在，提示是否覆盖
    const filePath = path.resolve(process.cwd(), projectName)
    let isRm = false
    if (fs.existsSync(filePath)) {
        isRm = await isOverWrite(projectName)
        if (!isRm) {
            return // 不覆盖直接推出
        }
    }

    const templateName = await select({
        message: '请选择模板',
        choices: templateList
    })

    const info = templates.get(templateName)

    if (info) {
        if (isRm) {
            fs.rmSync(filePath, { recursive: true, force: true }) //覆盖删除
        }
        await clone(info.downloadUrl, projectName, ['-b', info.branch])
    }
}