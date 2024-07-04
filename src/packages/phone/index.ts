/**
 * 相关参考
 * 1：维基百科：中国大陆移动终端通信号码 [https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86%E7%A7%BB%E5%8A%A8%E7%BB%88%E7%AB%AF%E9%80%9A%E4%BF%A1%E5%8F%B7%E7%A0%81#cite_note-5]
 * 2：全球短信发送规则 [https://support.huaweicloud.com/intl/zh-cn/productdesc-msgsms/phone_numbers.html#section1]
 */
import { randomInt, randomNumericStr } from "../../utils/tools";
import { TELCO_ENUM } from "../../types/enums"
import { HaoDuan } from "./HaoDuan";
/**
 * 随机生成手机号
 */
export function generate(): string;
/**
 * 随机生成指定运营商的手机号
 * @param telco 运营商 eg: 电信、移动、联通、广电
 */
export function generate(telco: TELCO_ENUM): string;
/**
 * 随机生成指定号段的手机号
 * @param haoduan 号段 eg: 183, 192
 */
export function generate(haoduan: string): string;
/**
 * 随机生成手机号
 * 也可以随机生成指定号段的手机号
 * @param haoduanOrTelco 指定号段 eg: 183,  或指定运营商： eg: 电信。为空时会随机生成
 * @returns {*}
 */
export function generate(haoduanOrTelco?: string | TELCO_ENUM): string {
    let haoDuan = "";
    if (haoduanOrTelco && /^1\d{3,4}$/.test(haoduanOrTelco) && HaoDuan.isValid(haoduanOrTelco)) {
        // 指定号段
        haoDuan = haoduanOrTelco
    } else if (haoduanOrTelco && Object.values(TELCO_ENUM).includes(haoduanOrTelco as TELCO_ENUM)) {
        // 指定运营商
        haoDuan = HaoDuan.randomHaoDuan(haoduanOrTelco as TELCO_ENUM)
    } else {
        // 随机生成
        haoDuan = HaoDuan.randomHaoDuan();
    }
    if (haoDuan === "134") {
        // 134的号段，第二位是0-8
        return haoDuan + randomInt(0, 8) + randomNumericStr(7);
    }
    let nextCode = randomNumericStr(11 - haoDuan.length)
    return haoDuan + nextCode;
}

/**
 * 校验手机号
 * @param phone
 * @returns {boolean}
 */
export function validate(phone: string): boolean {
    if (!phone) return false;
    if (phone.length !== 11) return false;
    let haoduanReg = HaoDuan.HAO_DUAN_LIST.map(code => (code === "134" ? "" : code)).join("|")
    let reg = new RegExp(`^((${haoduanReg})\\d{8}|(134[0-8]\\d{7}))$`)
    return reg.test(phone)
}

