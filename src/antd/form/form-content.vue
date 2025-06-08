<template>

</template>
<script lang="ts" setup>
const items = [
  {
    label: "用户名",
    type: "group",
    children: [
      {
        label: "用户名",
        type: "input",
        placeholder: "请输入用户名",
      },
      {
        label: "密码",
        type: "input",
        placeholder: "请输入密码",
      },
    ],
  },
  {
    label: "邮箱",
    type: "input",
    placeholder: "请输入邮箱",
  },
  {
    label: "手机号",
    type: "input",
    placeholder: "请输入手机号",
  },
];

/**
 * 递归生成表单
 * 
 * 1. 没有 group 类型， 最外层抱一个 row
 * 2. 部分 group 类型， [a, b, c] 3 个元素， 只有 b 是 group 类型， 则 a, b, c 分别 row 包裹， a, b 的 col 值是全局的
 */
</script>
