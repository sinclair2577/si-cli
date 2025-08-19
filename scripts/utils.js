/**
 * 文件操作
 */

import fs from "fs-extra";
import chalk from "chalk";
import path from "path";
import logSymbols from "log-symbols";

// 当前项目绝对路径
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

/**
 * 删除同名目录并创建新目录
 * @param {*} dir
 */
export async function removeDir(dir) {
  try {
    await fs.remove(resolveApp(dir));
    console.log(logSymbols.warning, `已覆盖同名文件夹${dir}`);
  } catch (error) {
    console.log(error);
    return;
  }
}

/**
 * 修改package.json配置
 * @param {*} name 项目名称
 * @param {*} info 描述
 */
export async function changePackageJson(name, info) {
  try {
    const pkg = await fs.readJson(resolveApp(`${name}/package.json`));
    Object.keys(info).forEach((item) => {
      if (info[item] && info[item].trim()) {
        pkg[item] = info[item];
      }
    });
    await fs.writeJson(resolveApp(`${name}/package.json`), pkg, { spaces: 2 });
  } catch (error) {
    console.log(error);
    console.log(
      logSymbols.warning,
      chalk.yellow("更新项目信息失败，请手动修改package.json")
    );
  }
}
