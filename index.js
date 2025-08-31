#!/usr/bin/env node

import fs from "fs-extra";
import figlet from "figlet";
import chalk from "chalk";
import { table } from "table";
import { program } from "commander";
import create from "./scripts/create.js";
import { templates } from "./scripts/constants.js";

// 读取package.json配置信息
const pkg = fs.readJsonSync(new URL("./package.json", import.meta.url));

// 查看版本号
program.version(pkg.version);

// 创建项目命令
program
  .command("create <app-name>")
  .description("创建一个新的Si-Web项目")
  .option("-t --template [template]", "输入模板名称快速创建项目")
  .option("-f --force", "强制覆盖本地同名项目")
  .option("-i --ignore", "忽略项目相关描述,快速创建项目")
  .action(create);

// 查看模板列表
program
  .command("ls")
  .description("查看所有可用的模板")
  .action(() => {
    const data = templates.map((item) => [
      chalk.greenBright(item.name),
      chalk.white(item.value),
      chalk.white(item.desc),
    ]);
    data.unshift([
      chalk.white("模板名称"),
      chalk.white("模板地址"),
      chalk.white("模板描述"),
    ]);
    console.log(table(data));
  });

// 配置脚手架基本信息
program
  .name("si-cli")
  .description(
    "基于个人IP的自定义脚手架，目的用于解决新建项目时繁琐的依赖安装和环境配置，直接从创建项目到开发"
  )
  .usage("<command> [options]")
  // 用在内置的帮助信息之后输出自定义的额外信息
  .on("--help", () => {
    console.log(
      "\r\n" +
        chalk.greenBright.bold(
          figlet.textSync("si-cli", {
            font: "Standard",
            horizontalLayout: "default",
            verticalLayout: "default",
            width: 100,
            whitespaceBreak: true,
          })
        )
    );
    console.log(
      `\r\n Run ${chalk.cyanBright(
        `si-cli <command> --help`
      )} for detailed usage of given command.`
    );
  });

program.parse(process.argv);
