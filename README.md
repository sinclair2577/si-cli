# 自定义前端脚手架

## 工具链

- **chalk**: 终端字体样式
- **commander**: 解析命令行
- **download-git-repo**: 下载并提取 git 仓库，用于下载模板
- **figlet**: 创建脚手架 Logo
- **fs-extra**: 文件处理
- **inquirer**: 命令行界面与用户交互
- **log-symbols**: 命令行界面状态图标
- **ora**: 显示 loading 动画效果
- **shelljs**: 基于 nodejs 的 shell 命令工具
- **table**: 命令行界面表格内容显示

> **注意**：download-git-repo 默认克隆 github 仓库，分支为 master，若要克隆其他分支需要在 url 尾部添加具体分支名称 `#dev`

### 安装工具链依赖包

```node
npm i chalk commander download-git-repo figlet fs-extra @inquirer/prompts log-symbols ora shelljs table
```

## 脚手架开发阶段

`npm link` 将文件映射到全局，这样可以在任意目录下使用自定义脚手架命令执行 `index.js` 脚本文件

> `npm list -g` 可以查看已安装的全局 node 模块

## 命令行交互
