[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / utils/tools

# utils/tools

## Functions

### countDiffAndEqual()

> **countDiffAndEqual**(`word1`, `word2`): `DiffAndEqualMap`

#### Parameters

• **word1**: `string`

• **word2**: `string`

#### Returns

`DiffAndEqualMap`

#### Defined in

[utils/tools.ts:146](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L146)

***

### findFitWords()

> **findFitWords**(`keyword`, `wordList`, `minEqual`): `string`[]

在一组词组内找出与给定词语最匹配的词组

#### Parameters

• **keyword**: `string`

要匹配的词语

• **wordList**: `string`[]

词组列表

• **minEqual**: `number` = `2`

最小相同字符数, 默认是2

#### Returns

`string`[]

#### Defined in

[utils/tools.ts:109](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L109)

***

### getAge()

> **getAge**(`idNoOrBirthday`, `isVirtualAge`): `Nullable`\<`number`\>

通过身份证号或生日计算法定年龄(或虚岁)

#### Parameters

• **idNoOrBirthday**: `string`

• **isVirtualAge**: `boolean` = `false`

是否计算为虚岁

#### Returns

`Nullable`\<`number`\>

#### Defined in

[utils/tools.ts:207](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L207)

***

### getDataType()

> **getDataType**(`data`): `string`

返回数据类型

#### Parameters

• **data**: `any`

#### Returns

`string`

- 小写字母数据类型名称

#### Defined in

[utils/tools.ts:177](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L177)

***

### isDataType()

> **isDataType**(`data`, `type`): `boolean`

判断数据是否是指定的类型

#### Parameters

• **data**: `any`

数据

• **type**: `string`

要指定的类型，如 string， number, object

#### Returns

`boolean`

#### Defined in

[utils/tools.ts:186](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L186)

***

### isDef()

> **isDef**\<`T`\>(`v`): `v is NonNullable<T>`

判断值是否是非null或非undefined

#### Type Parameters

• **T**

#### Parameters

• **v**: `T`

要判断的值

#### Returns

`v is NonNullable<T>`

#### Defined in

[utils/tools.ts:14](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L14)

***

### isFalse()

> **isFalse**(`v`): `boolean`

判断值是否是false

#### Parameters

• **v**: `any`

#### Returns

`boolean`

#### Defined in

[utils/tools.ts:30](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L30)

***

### isTrue()

> **isTrue**(`v`): `boolean`

判断值是否是true

#### Parameters

• **v**: `any`

#### Returns

`boolean`

#### Defined in

[utils/tools.ts:22](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L22)

***

### isUndef()

> **isUndef**(`v`): v is undefined \| null

判断值是否是null或是undefined

#### Parameters

• **v**: `any`

要判断的值

#### Returns

v is undefined \| null

#### Defined in

[utils/tools.ts:6](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L6)

***

### randomInt()

实现返回随机整数的函数。
- 如果没有参数，返回 0 到 Number.MAX_SAFE_INTEGER 之间的随机整数。
- 如果传入一个参数，返回 0 到 max 之间的随机整数。
- 如果传入两个参数，返回 min 到 max 之间的随机整数。

#### Param

如果是单个参数，表示最大值；如果是两个参数中的第一个，表示最小值。

#### Param

最大值。

#### randomInt()

> **randomInt**(): `number`

生成随机整数

##### Returns

`number`

随机整数。

##### Defined in

[utils/tools.ts:38](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L38)

#### randomInt(max)

> **randomInt**(`max`): `number`

返回一个 0 到 max 之间的随机整数。

##### Parameters

• **max**: `number`

最大值。

##### Returns

`number`

随机整数。

##### Defined in

[utils/tools.ts:44](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L44)

#### randomInt(min, max)

> **randomInt**(`min`, `max`): `number`

返回一个 min 到 max 之间的随机整数。

##### Parameters

• **min**: `number`

最小值。

• **max**: `number`

最大值。

##### Returns

`number`

随机整数。

##### Defined in

[utils/tools.ts:51](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L51)

***

### randomNumericStr()

> **randomNumericStr**(`len`): `string`

生成随机长度的数据数字字符串

#### Parameters

• **len**: `number`

字符长度

#### Returns

`string`

#### Defined in

[utils/tools.ts:93](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L93)

***

### randomPick()

> **randomPick**\<`T`\>(`list`): `Nullable`\<`T`\>

从一个数组中, 随机选择一个元素

#### Type Parameters

• **T**

#### Parameters

• **list**: `ArrayLike`\<`T`\>

一个类数组对象

#### Returns

`Nullable`\<`T`\>

#### Defined in

[utils/tools.ts:82](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L82)

***

### removeDuplicateWords()

> **removeDuplicateWords**(`text`): `string`

去掉文本中的重复词汇

#### Parameters

• **text**: `string`

#### Returns

`string`

#### Defined in

[utils/tools.ts:195](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/utils/tools.ts#L195)
