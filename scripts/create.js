import fs from "fs-extra";
import shell from "shelljs";
import chalk from "chalk";
import logSymbols from "log-symbols";
import clone from "./clone.js";
import { removeDir, changePackageJson } from "./utils.js";
import { templates, messages } from "./constants.js";
import {
  inquirerConfirm,
  inquirerChoose,
  inquirerInputs,
} from "./interactive.js";

/**
 * 创建项目方法
 * @param {String} appName 项目名称
 * @param {JSON} option 配置项
 */
export default async function create(appName, option) {
  if (!shell.which("git")) {
    console.log(
      logSymbols.error,
      chalk.redBright("Error: 运行脚手架必须先安装git！")
    );
  }
  // 验证appName输入是否符合规范
  if (appName.match(/[\u4E00-\u9FFF`~!@#$%&^*[\]()\\;:<.>/?]/g)) {
    console.log(
      logSymbols.error,
      chalk.redBright("Error: <app-name>存在非法字符！")
    );
    return;
  }

  let repository = "";

  // 验证是否使用了--template配置项
  if (option.template) {
    // 从模板列表中找到目标template，如果不存在则抛出异常
    const template = templates.find(
      (template) => template.name === option.template
    );
    console.log("template", template);
    if (!template) {
      console.log(
        logSymbols.warning,
        `不存在模板${chalk.yellowBright(option.template)}`
      );
      console.log(
        `\r\n运行 ${chalk.cyanBright("si-cli ls")} 查看所有可用模板\r\n}`
      );
      return;
    }
    repository = template.value;
  } else {
    // 从模板列表中选择
    repository = await inquirerChoose("请选择项目模板: ", templates);
  }

  // 验证是否存在appName同名文件夹
  if (fs.existsSync(appName)) {
    if (option.force) {
      // 存在force配置项，直接覆盖
      await removeDir(appName);
    } else {
      // 询问是否覆盖
      const isCover = await inquirerConfirm(
        `已存在同名文件夹${appName}，是否覆盖：`
      );
      if (isCover) {
        await removeDir(appName);
      } else {
        console.log(
          logSymbols.error,
          chalk.redBright(`Error：项目创建失败！存在同名文件夹${appName}`)
        );
        return;
      }
    }
  }

  let answers = {};

  // 验证是否使用了--ignore配置项
  if (!option.ignore) {
    answers = await inquirerInputs(messages);
  }

  try {
    await clone(repository, appName);
  } catch (error) {
    console.log(logSymbols.error, chalk.redBright("项目创建失败"));
    console.log(error);
    shell.exit(1);
  }

  // 最后更新package.json
  if (answers.name || answers.description) {
    await changePackageJson(appName, answers);
  }
}
