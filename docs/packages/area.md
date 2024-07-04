[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / packages/area

# packages/area

## Variables

### addrMap

> `const` **addrMap**: `Record`\<`string`, `string`\>

#### Defined in

[packages/area.ts:72](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L72)

## Functions

### findAreaCode()

> **findAreaCode**(`addr`): `string`

根据地址获取对应的行政区划代码

#### Parameters

• **addr**: `string`

#### Returns

`string`

#### Defined in

[packages/area.ts:145](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L145)

***

### findAreaNamesByCode()

> **findAreaNamesByCode**(`codeOrIdNo`, `isCompletion`): `string`[]

根据行政区划代码或身份证号获取对应的三级地址

#### Parameters

• **codeOrIdNo**: `string`

• **isCompletion**: `boolean` = `false`

如果三级地址不完整时，是否随机补全

#### Returns

`string`[]

#### Defined in

[packages/area.ts:45](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L45)

***

### findFullAddrNoRepeatWord()

> **findFullAddrNoRepeatWord**(`fuzzyAddr`): `string`

根据地址模糊匹配完整三级区域地址

#### Parameters

• **fuzzyAddr**: `string`

#### Returns

`string`

#### Defined in

[packages/area.ts:134](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L134)

***

### findFullAreaAddr()

> **findFullAreaAddr**(`fuzzyAddr`): `string`

根据地址模糊匹配完整三级区域地址

#### Parameters

• **fuzzyAddr**: `string`

#### Returns

`string`

#### Defined in

[packages/area.ts:83](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L83)

***

### getCountyByCode()

> **getCountyByCode**(`codeOrIdNo`): `string`

根据行政区划代码获取对应的县级名称

#### Parameters

• **codeOrIdNo**: `string`

#### Returns

`string`

#### Defined in

[packages/area.ts:166](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L166)

***

### randomAddrByCode()

> **randomAddrByCode**(`codeOrIdNo`): `string`

根据行政区划代码或身份证号精确或随机获取一个包含三级区域的地址

#### Parameters

• **codeOrIdNo**: `string`

行政区代码或身份证号

#### Returns

`string`

#### Defined in

[packages/area.ts:156](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L156)

***

### randomAreaCode()

> **randomAreaCode**(`areaLevel`, `parentAreaCode`?): `string`

获取随机的行政区划代码

#### Parameters

• **areaLevel**: `AreaLevelEnum` = `AreaLevelEnum.County`

行政区划级别 省级（1），市级（2），县级（3）

• **parentAreaCode?**: `string`

父级(祖父级)行政区划代码

#### Returns

`string`

#### Defined in

[packages/area.ts:10](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/area.ts#L10)
