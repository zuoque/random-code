[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / packages/bankAccount

# packages/bankAccount

## Type Aliases

### Range

> **Range**: `MapValueType`\<*typeof* [`BANK_BIN_RANG_MAP`](bankAccount.md#bank_bin_rang_map)\>

#### Defined in

[packages/bankAccount.ts:20](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/bankAccount.ts#L20)

## Variables

### BANK\_BIN\_RANG\_MAP

> `const` **BANK\_BIN\_RANG\_MAP**: `Map`\<`string`, `object`\>

#### Defined in

[packages/bankAccount.ts:5](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/bankAccount.ts#L5)

***

### BIN\_LIST

> `const` **BIN\_LIST**: `string`[]

#### Defined in

[packages/bankAccount.ts:4](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/bankAccount.ts#L4)

## Functions

### generate()

> **generate**(`bankName`?, `len`?): `string`

随机生成银行卡号
https://www.jianshu.com/p/4c8a284f4dd1
https://pay.weixin.qq.com/docs/merchant/development/chart/bank-of-deposit.html

#### Parameters

• **bankName?**: `string`

银行名称或是英文简写

• **len?**: `number`

指定长度

#### Returns

`string`

#### Defined in

[packages/bankAccount.ts:29](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/bankAccount.ts#L29)

***

### getVerityCode()

> **getVerityCode**(`bankAccountBaseCode`): `string`

获取校验码

#### Parameters

• **bankAccountBaseCode**: `string`

银行账号的本位码(除校验码外的数字组合)

#### Returns

`string`

#### Defined in

[packages/bankAccount.ts:51](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/bankAccount.ts#L51)

***

### validate()

> **validate**(`bankAccount`): `boolean`

校验银行卡号是否合法

#### Parameters

• **bankAccount**: `string`

#### Returns

`boolean`

#### Defined in

[packages/bankAccount.ts:79](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/bankAccount.ts#L79)
