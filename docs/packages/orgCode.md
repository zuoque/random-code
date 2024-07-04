[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / packages/orgCode

# packages/orgCode

## Functions

### generate()

> **generate**(`baseCode`?): `string`

生成组织机构代码
9位数字及大写字母组合, 最后一位为校验码, 通过短横线连接 05266367-4
可指定8位的本位码，由函数计算出校验码得到完整的编码，不指定时是随机生成
标准文件: https://www.cods.org.cn/c/2020-10-29/12582.html
https://wiki.mbalib.com/wiki/%E7%BB%84%E7%BB%87%E6%9C%BA%E6%9E%84%E4%BB%A3%E7%A0%81

#### Parameters

• **baseCode?**: `string`

本位码

#### Returns

`string`

#### Defined in

[packages/orgCode.ts:14](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/orgCode.ts#L14)

***

### getVerityCode()

> **getVerityCode**(`baseCode`): `string`

获取校验码

#### Parameters

• **baseCode**: `string`

前8位符号码

#### Returns

`string`

#### Defined in

[packages/orgCode.ts:52](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/orgCode.ts#L52)

***

### validate()

> **validate**(`code`): `boolean`

验证组织机构合法性方法

#### Parameters

• **code**: `string`

#### Returns

`boolean`

#### Defined in

[packages/orgCode.ts:71](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/orgCode.ts#L71)
