import { BASE_CODE_COUNT, CHARS_STR, MOD_CODE_MAP, WEIGHTS } from "../types/orgCodeTypes.ts";
import { randomInt } from "../utils/tools.ts";


/**
 * 生成组织机构代码
 * 9位数字及大写字母组合, 最后一位为校验码, 通过短横线连接 05266367-4
 * 可指定8位的本位码，由函数计算出校验码得到完整的编码，不指定时是随机生成
 * 标准文件: https://www.cods.org.cn/c/2020-10-29/12582.html
 * https://wiki.mbalib.com/wiki/%E7%BB%84%E7%BB%87%E6%9C%BA%E6%9E%84%E4%BB%A3%E7%A0%81
 * @param baseCode 本位码
 * @returns {string}
 */
export function generate(baseCode?:string): string{
    let isValid = false; // 指定的码是否是有效code
    // 8位字符串是前提
    if (typeof baseCode === "string" && baseCode.length === BASE_CODE_COUNT) {
        // 先将可能存在的小写转换成大写, 然后在看是否都在可用的字符组合内
        baseCode = baseCode.toUpperCase()
        isValid = baseCode.split("").every(char => CHARS_STR.includes(char));
    }

    if (!isValid) {
        baseCode = ""; // 先重置成空字符串
        // 生成前8位代码并转换成字符串
        while (baseCode.length < BASE_CODE_COUNT) {
            baseCode += CHARS_STR[randomInt(CHARS_STR.length - 1)];
        }
    }
    const c9 = getVerityCode(baseCode as string);
    return `${baseCode}-${c9}`
}

/**
 * 获取校验码
 * @param baseCode 前8位符号码
 * @returns {string}
 */
export function getVerityCode(baseCode: string): string {
    if (!baseCode) return "";
    // 按位加权求和
    let total = WEIGHTS.reduce((sum, wi, i) => {
        sum += (wi * MOD_CODE_MAP.indexOf(baseCode[i]))
        return sum;
    }, 0)

    const c9 = (11 - total % 11).toString();
    // 特列值映射表
    let specialMap: { [key: string]: string } = { 10: "X", 11: "0" };
    return specialMap[c9] || c9;
}

/**
 * 验证组织机构合法性方法
 * @param code
 * @returns {boolean}
 */
export function validate(code: string): boolean {
    if (!code) return false;
    code = code.trim();
    let verityCode = getVerityCode(code.substring(0, 8));
    return code.endsWith(verityCode);
}
