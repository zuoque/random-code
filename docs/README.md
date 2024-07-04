**@zuoque/random-coding** • [**Docs**](modules.md)

***

# Random-coding

## 简介

提供随机的身份证号、统一社会信用代码、组织机构代码、手机号、银行卡号生成方法的工具库。主要是为了用于开发环境，创建mock数据。

## 安装

```shell
npm i -D @zuoque/random-coding
```

## 使用

方式一：全局引入

```js
import { idNoUtils } from "@zuoque/random-coding"

// 生成身份证号
console.log(idNoUtils.generate())
```

方式二：单独引入

```js
import { generate } from "@zuoque/random-coding/id-no"
// 生成身份证号
console.log(generate())
```

## 详细文档

对每个模块提供的api详细说明

**@zuoque/random-coding** • [**详细文档**]()
