[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / packages/phone

# packages/phone

## Functions

### generate()

随机生成手机号
也可以随机生成指定号段的手机号

#### Param

指定号段 eg: 183,  或指定运营商： eg: 电信。为空时会随机生成

#### generate()

> **generate**(): `string`

随机生成手机号

##### Returns

`string`

##### Defined in

[packages/phone/index.ts:12](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/phone/index.ts#L12)

#### generate(telco)

> **generate**(`telco`): `string`

随机生成指定运营商的手机号

##### Parameters

• **telco**: `TELCO_ENUM`

运营商 eg: 电信、移动、联通、广电

##### Returns

`string`

##### Defined in

[packages/phone/index.ts:17](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/phone/index.ts#L17)

#### generate(haoduan)

> **generate**(`haoduan`): `string`

随机生成指定号段的手机号

##### Parameters

• **haoduan**: `string`

号段 eg: 183, 192

##### Returns

`string`

##### Defined in

[packages/phone/index.ts:22](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/phone/index.ts#L22)

***

### validate()

> **validate**(`phone`): `boolean`

校验手机号

#### Parameters

• **phone**: `string`

#### Returns

`boolean`

#### Defined in

[packages/phone/index.ts:54](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/phone/index.ts#L54)
