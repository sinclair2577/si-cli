/**
 * 项目模板列表
 * 通过配置项目模板在独立的远程仓库中可以保证更新及时跟进，
 * 脚手架搭建完成后一般不作改动
 */
export const templates = [
  {
    name: "si-vue-template",
    value: "direct:https://github.com/sinclair2577/si-vue-template#main",
    desc: "基于Vue3+TypeScript的自定义项目模板",
  },
  {
    name: "si-react-template",
    value: "direct:https://github.com/sinclair2577/si-react-template#main",
    desc: "基于Nextjs+TailwindCSS的自定义项目模板",
  },
];

/**
 * 项目信息
 */
export const messages = [
  {
    name: "name",
    message: "请输入项目名称：",
  },
  {
    name: "description",
    message: "请输入项目描述：",
  },
];
