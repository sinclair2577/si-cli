/**
 * 终端交互脚本
 */

import { input, confirm, select } from "@inquirer/prompts";

/**
 *
 * @param {string} message 询问提示语句
 * @returns {Object} 根据name属性获取用户输入的值{confirm: y/n}
 */
export const inquirerConfirm = async (message) => {
  return await confirm({
    message,
  });
};

/**
 * @param {string} message 询问提示语句
 * @param {Array} choices 选择模板列表，默认读取对象的name属性
 * @returns {Object} 根据name属性获取用户输入的值{请选择项目模板： xxxxxx}
 */
export const inquirerChoose = async (message, choices) => {
  return await select({
    message: message,
    choices: choices,
  });
};

/**
 * @param {Array} messages 询问提示语句数组
 * @returns {Object} 结果对象
 */
export const inquirerInputs = async (messages) => {
  const answers = {};

  for (const msg of messages) {
    const answer = await input({ message: msg.message });
    answers[msg.name] = answer;
  }

  return answers;
};
