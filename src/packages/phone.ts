/**
 * 相关参考
 * 1：维基百科：中国大陆移动终端通信号码 [https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E5%A4%A7%E9%99%86%E7%A7%BB%E5%8A%A8%E7%BB%88%E7%AB%AF%E9%80%9A%E4%BF%A1%E5%8F%B7%E7%A0%81#cite_note-5]
 * 2：全球短信发送规则 [https://support.huaweicloud.com/intl/zh-cn/productdesc-msgsms/phone_numbers.html#section1]
 */
import { randomInt, randomNumericStr } from "../utils/tools.ts";
import { TELCO_ENUM } from "../types/enums.ts"


export class HaoDuan {
    /**
     * 运营商-号段映射表
     */
    static HAO_DUAN_MAP: Record<string, Array<string>> = {
        // 电信
        [TELCO_ENUM.CT]: ['133', '149', '153', '173', '177', '180', '181', '189', '190', '191', '193', '199'],
        // 移动 134(0-8)  1440(物联网，不算在内)
        [TELCO_ENUM.CM]: ['134', '135', '136', '137', '138', '139', '147', '148', '150', '151', '152', '157', '158', '159', '172', '178', '182', '183', '184', '187', '188', '195', '197', '198'],
        // 联通
        [TELCO_ENUM.CU]: ['130', '131', '132', '145', '155', '156', '166', '167', '171', '175', '176', '185', '186', '196'],
        // 广电
        [TELCO_ENUM.CRT]: ['192'],
    }

    /**
     * 号段列表
     */
    static HAO_DUAN_LIST = Object.values(HaoDuan.HAO_DUAN_MAP).flat() as string[]


    /**
     * 获取随机号段, 也可指定运营商
     * @param telco 运营商 eg: 电信、移动、联通、广电
     */
    static randomHaoDuan(telco?: TELCO_ENUM): string {
        let haoDuanList: string[] = HaoDuan.HAO_DUAN_LIST;
        if (telco) {
            haoDuanList = HaoDuan.HAO_DUAN_MAP[telco] || [];
        }
        let max = haoDuanList.length;
        return haoDuanList[randomInt(max)] || "";
    }

    /**
     * 是否是有效号段
     * @param haoDuan
     */
    static isValid(haoDuan: string): boolean {
        return HaoDuan.HAO_DUAN_LIST.includes(haoDuan)
    }
}

/**
 * 随机生成手机号
 */
export function generatePhoneNo(): string;
/**
 * 随机生成指定运营商的手机号
 * @param telco 运营商 eg: 电信、移动、联通、广电
 */
export function generatePhoneNo(telco: TELCO_ENUM): string;
/**
 * 随机生成指定号段的手机号
 * @param haoduan 号段 eg: 183, 192
 */
export function generatePhoneNo(haoduan: string): string;
/**
 * 随机生成手机号
 * 也可以随机生成指定号段的手机号
 * @param haoduanOrTelco 指定号段 eg: 183,  或指定运营商： eg: 电信。为空时会随机生成
 * @returns {*}
 */
export function generatePhoneNo(haoduanOrTelco?: string | TELCO_ENUM): string {
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
        return haoDuan + randomInt(0, 8);
    }
    let nextCode = randomNumericStr(11 - haoDuan.length)
    return haoDuan + nextCode;
}

/**
 * 校验手机号
 * @param phone
 * @returns {boolean}
 */
export function validatePhone(phone: string): boolean {
    if (!phone) return false;
    if (phone.length !== 11) return false;
    let haoduanReg = HaoDuan.HAO_DUAN_LIST.map(code => (code === "134" ? "" : code)).join("|")
    let reg = new RegExp(`^((${haoduanReg})\\d{8}|(134[0-8]\\d{7}))$`)
    return reg.test(phone)
}

