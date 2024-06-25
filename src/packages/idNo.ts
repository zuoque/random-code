import { findAreaCode, randomAreaCode } from './area.ts'
import { isDataType, randomInt } from '../utils/tools.ts'
import { IdNoGenOptions, VERIFY_CODES, WEIGHT_LIST } from '../types/idNoTypes.ts'
import { SexEnum } from "../types/enums.ts";

/**
 * 随机生成一个身份证号码
 */
export function generate(): string;
/**
 * 随机生成一个指定年龄的身份证号码
 * @param age 年龄 eg: 18
 */
export function generate(age: number): string;
/**
 * 通过解析一个出生年月（eg: 19901024, 1990-10-24, 1990/10/24），随机生成一个生日的身份证号码
 */
/**
 * 通过解析一个出生年月，随机生成一个指定生日的身份证号码
 * @param birthday 出生日期 eg: 19901024, 1990-10-24, 1990/10/24
 */
export function generate(birthday: string): string;

/**
 * 随机生成一个指定年龄和性别的身份证号码
 * @param age 年龄 eg: 18
 * @param sex 性别，eg: 男（or 1）、女（or 2）
 */
export function generate(age: number, sex: SexEnum): string;
/**
 * 通过解析一个出生年月，随机生成一个指定生日和性别的身份证号码
 * @param birthday 出生日期 eg: 19901024, 1990-10-24, 1990/10/24
 * @param sex 性别，eg: 男（or 1）、女（or 2）
 */
export function generate(birthday: string, sex: SexEnum): string;
/**
 * 随机生成一个指定年龄、性别、出生地的身份证号码
 * @param age 年龄 eg: 18
 * @param sex 性别，eg: 男（or 1）、女（or 2）
 * @param birthplace 出生地 eg: 安徽省凤阳县
 */
export function generate(age: number, sex: SexEnum, birthplace: string): string;
/**
 * 通过解析一个出生年月，随机生成一个指定年龄、性别、出生地的身份证号码
 * @param birthday 出生日期 eg: 19901024, 1990-10-24, 1990/10/24
 * @param sex 性别，eg: 男（or 1）、女（or 2）
 * @param birthplace 出生地 eg: 安徽省凤阳县
 */
export function generate(birthday: string, sex: SexEnum, birthplace: string): string;
/**
 * 随机生成指定配置的身份证号码
 * @param options {IdNoGenOptions} 配置项
 */
export function generate(options: IdNoGenOptions): string;
/**
 * 生成身份证号, 可以指定如下参数，不指定就是随机的
 * @param ageOrBirthdayOrOptions 年龄或者直接指定出生日期 19901230，指定年龄和随机生成时年龄都会限制在16-90岁
 *            如果age是一个对象，则可包含的字段有 minAge maxAge age, sex, area; 主要方便传递多个参数
 * @param sex 性别 1 or 男, 2 or 女
 * @param birthplace 所在地: eg: 安徽省凤阳县
 */
export function generate(ageOrBirthdayOrOptions?: number | string | IdNoGenOptions, sex?: SexEnum, birthplace?: string) {
    let minAge = 16,
        maxAge = 90,
        birthday: Nullable<string>,
        age: Nullable<number>;
    if (isDataType(ageOrBirthdayOrOptions, 'object')) {
        let obj = ageOrBirthdayOrOptions as IdNoGenOptions
        minAge = obj.minAge || minAge; // 不接受0
        maxAge = obj.maxAge || maxAge; // 不接受0
        sex = obj.sex || sex;
        birthplace = obj.birthplace || birthplace;
        birthday = obj.birthday;
        age = obj.age; // 不接受0
    } else if (isDataType(ageOrBirthdayOrOptions, 'number')) {
        age = ageOrBirthdayOrOptions as number;
    } else if (isDataType(ageOrBirthdayOrOptions, 'string')) {
        birthday = ageOrBirthdayOrOptions as string;
    }

    // 随机行政编号
    let areaCode = birthplace && findAreaCode(birthplace) || randomAreaCode();
    // 随机出生日期: 16-90岁
    birthday = birthday && isValidBirthday(birthday) && birthday.replace(/\D/g, "")
        || ( age ? genBirthday(age) : genBirthday(minAge, maxAge));
    // 随机顺序码
    let rand = getRand(sex);

    let idNo = areaCode + birthday + rand;
    // 校验码
    let verifyCode = getVerifyCode(idNo);

    return idNo + verifyCode;
}

/**
 * 获取身份证校验码
 * @param idNo 身份证号编码
 */
export function getVerifyCode(idNo: string): string {
    if (!idNo || !/^\d{17}(\d|x|X)?$/.test(idNo)) {
        return "";
    }
    let total = WEIGHT_LIST.reduce((sum,digit, index ) => sum + Number(digit) * Number(idNo.charAt(index)), 0)
    return Number.isNaN(total) ? "" : VERIFY_CODES[total % 11];
}

export function validate(idNo: string) {
    if (!idNo) return false;
    // 将可能的小写转换成大写
    idNo = idNo.toUpperCase();
    let result = /^(\d{6})(\d{8})(\d{3})([0-9Xx]$)/.test(idNo);
    // 基础格式正则都不通过, 直接false
    if (!result) return false;
    let verityCode = idNo[idNo.length - 1]?.toUpperCase(); // 最后一位是校验码，小写的x转大写
    // 校验码都不通过, 直接false
    return getVerifyCode(idNo) === verityCode;
}

/**
 * 生成一个指定年龄的出生日期
 * @param age
 */
export function genBirthday(age: number): string;
/**
 * 生成一个指定年龄范围内的出生日期
 * @param ageMin
 * @param ageMax
 */
export function genBirthday(ageMin: number, ageMax: number): string;

/**
 * 根据年龄随机生成一个出生日期
 * @param ageOrAgeMin 指定的年龄或是最小年龄
 * @param ageMax 最大年龄
 */
export function genBirthday(ageOrAgeMin: number, ageMax?: number): string {
    if (!ageOrAgeMin && ageOrAgeMin !== 0) {
        return ""
    }
    let age = ageOrAgeMin;
    let min = ageOrAgeMin;
    let max = ageMax;
    let now = new Date();

    if ((min || min === 0) && (max || max === 0)) {
        // 最小至少是1
        let rMin = Math.max(1, Math.min(min, max))
        let rMax = Math.max(min, max, 1);
        age = randomInt(rMin, rMax)
    }

    // 年份由年龄决定
    let year = Math.max(1, now.getFullYear() - age);
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let yearFormat = ("0000" + year ).slice(-4)
    let monthFormat = ("00" + month ).slice(-2)
    let dayFormat = ("00" + day ).slice(-2)
    return `${yearFormat}${monthFormat}${dayFormat}`; // eg: 19901201
}

/**
 * 校验是否有有效出生年月
 * @param birthday
 * @returns {boolean}
 */
function isValidBirthday(birthday: any): boolean {
    if (!birthday) return false;
    // 该正则无法过滤出类似这样的不存在的日期 2023-02-30  2023-09-31
    let reg = /^([012]\d{3})([/.-]?)((0[1-9])|(1[012]))\2((0[1-9])|([12]\d)|(3[01]))$/;
    let match = (birthday + "").match(reg);
    if (match) {
        // 基本正则通过的情况下
        let year = match[1],
            month = match[3],
            day = match[6];

        let date = new Date(`${year}/${month}/${day}`);
        // 无法被正确解析的返回false
        if (date.toString() === "Invalid Date") return false;

        // 如果能正确解析出来并且解析出的日期与字符串的日期一致时表示正确
        // 主要是为了判断出2023-02-30  2023-09-31 这样的不存在的日期
        if (date.getDate() === +day && date.getMonth() + 1 === +month && date.getFullYear() === +year) {
            return true;
        }
    }

    return false;
}

/**
 * 生成顺序码
 * @param sex 性别 1:男, 2:女
 */
function getRand(sex?: SexEnum) {
    let code = randomInt(999);
    sex = (sex === SexEnum.Male && SexEnum.MaleCode ) || (sex === SexEnum.Female && SexEnum.FemaleCode) || sex;
    if ((sex === 1 && code % 2 === 0) || (sex === 2 && code % 2 === 1)) {
        code = code === 999 ? code - 1 : code + 1;
    }
    return ("000" + code).slice(-3);
}