[**@zuoque/random-coding**](../README.md) • **Docs**

***

[@zuoque/random-coding](../modules.md) / packages/idNo

# packages/idNo

## Functions

### genBirthday()

根据年龄随机生成一个出生日期

#### Param

指定的年龄或是最小年龄

#### Param

最大年龄

#### genBirthday(age)

> **genBirthday**(`age`): `string`

生成一个指定年龄的出生日期

##### Parameters

• **age**: `number`

##### Returns

`string`

##### Defined in

[packages/idNo.ts:122](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L122)

#### genBirthday(ageMin, ageMax)

> **genBirthday**(`ageMin`, `ageMax`): `string`

生成一个指定年龄范围内的出生日期

##### Parameters

• **ageMin**: `number`

• **ageMax**: `number`

##### Returns

`string`

##### Defined in

[packages/idNo.ts:128](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L128)

***

### generate()

生成身份证号, 可以指定如下参数，不指定就是随机的

#### Param

年龄或者直接指定出生日期 19901230，指定年龄和随机生成时年龄都会限制在16-90岁
           如果age是一个对象，则可包含的字段有 minAge maxAge age, sex, area; 主要方便传递多个参数

#### Param

性别 1 or 男, 2 or 女

#### Param

所在地: eg: 安徽省凤阳县

#### generate()

> **generate**(): `string`

随机生成一个身份证号码

##### Returns

`string`

##### Defined in

[packages/idNo.ts:9](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L9)

#### generate(age)

> **generate**(`age`): `string`

随机生成一个指定年龄的身份证号码

##### Parameters

• **age**: `number`

年龄 eg: 18

##### Returns

`string`

##### Defined in

[packages/idNo.ts:14](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L14)

#### generate(birthday)

> **generate**(`birthday`): `string`

通过解析一个出生年月，随机生成一个指定生日的身份证号码

##### Parameters

• **birthday**: `string`

出生日期 eg: 19901024, 1990-10-24, 1990/10/24

##### Returns

`string`

##### Defined in

[packages/idNo.ts:20](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L20)

#### generate(age, sex)

> **generate**(`age`, `sex`): `string`

随机生成一个指定年龄和性别的身份证号码

##### Parameters

• **age**: `number`

年龄 eg: 18

• **sex**: `SexEnum`

性别，eg: 男（or 1）、女（or 2）

##### Returns

`string`

##### Defined in

[packages/idNo.ts:27](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L27)

#### generate(birthday, sex)

> **generate**(`birthday`, `sex`): `string`

通过解析一个出生年月，随机生成一个指定生日和性别的身份证号码

##### Parameters

• **birthday**: `string`

出生日期 eg: 19901024, 1990-10-24, 1990/10/24

• **sex**: `SexEnum`

性别，eg: 男（or 1）、女（or 2）

##### Returns

`string`

##### Defined in

[packages/idNo.ts:33](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L33)

#### generate(age, sex, birthplace)

> **generate**(`age`, `sex`, `birthplace`): `string`

随机生成一个指定年龄、性别、出生地的身份证号码

##### Parameters

• **age**: `number`

年龄 eg: 18

• **sex**: `SexEnum`

性别，eg: 男（or 1）、女（or 2）

• **birthplace**: `string`

出生地 eg: 安徽省凤阳县

##### Returns

`string`

##### Defined in

[packages/idNo.ts:40](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L40)

#### generate(birthday, sex, birthplace)

> **generate**(`birthday`, `sex`, `birthplace`): `string`

通过解析一个出生年月，随机生成一个指定年龄、性别、出生地的身份证号码

##### Parameters

• **birthday**: `string`

出生日期 eg: 19901024, 1990-10-24, 1990/10/24

• **sex**: `SexEnum`

性别，eg: 男（or 1）、女（or 2）

• **birthplace**: `string`

出生地 eg: 安徽省凤阳县

##### Returns

`string`

##### Defined in

[packages/idNo.ts:47](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L47)

#### generate(options)

> **generate**(`options`): `string`

随机生成指定配置的身份证号码

##### Parameters

• **options**: `IdNoGenOptions`

{IdNoGenOptions} 配置项

##### Returns

`string`

##### Defined in

[packages/idNo.ts:52](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L52)

***

### getVerifyCode()

> **getVerifyCode**(`idNo`): `string`

获取身份证校验码

#### Parameters

• **idNo**: `string`

身份证号编码

#### Returns

`string`

#### Defined in

[packages/idNo.ts:98](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L98)

***

### validate()

> **validate**(`idNo`): `boolean`

#### Parameters

• **idNo**: `string`

#### Returns

`boolean`

#### Defined in

[packages/idNo.ts:106](https://github.com/zuoque/random-coding/blob/e8e6dfab838210439b8d7b8a85a8f08aca64affb/src/packages/idNo.ts#L106)
