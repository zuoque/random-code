[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / packages/creditCode

# packages/creditCode

## Functions

### generate()

> **generate**(`dept`?, `org`?, `area`?): `string`

随机生成统一社会信用代码

#### Parameters

• **dept?**: `string`

登记管理部门名称

• **org?**: `string`

机构类别名称

• **area?**: `string`

公司所在地

#### Returns

`string`

#### Defined in

[packages/creditCode.ts:22](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/creditCode.ts#L22)

***

### getVerifyCode()

> **getVerifyCode**(`baseCode`): `string`

获取校验码

#### Parameters

• **baseCode**: `string`

本体代码

#### Returns

`string`

#### Defined in

[packages/creditCode.ts:69](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/creditCode.ts#L69)

***

### validate()

> **validate**(`creditCode`): `boolean`

校验统一信用代码是否正确

#### Parameters

• **creditCode**: `string`

#### Returns

`boolean`

#### Defined in

[packages/creditCode.ts:55](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/creditCode.ts#L55)
