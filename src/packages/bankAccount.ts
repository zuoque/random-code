// 发卡行标识码(BIN)
import { randomInt, randomNumericStr, randomPick } from "../utils/tools.ts";

export const BIN_LIST = ["10","18","30","35","37","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","58","60","62","65","68","69","84","87","88","94","95","98","99"]
export const BANK_BIN_RANG_MAP = new Map([
    ['中国工商银行|ICBC', { start: 622200, end: 622999 }],
    ['中国建设银行|CCB', { start: 622700, end: 622899 }],
    ['中国农业银行|ABC', { start: 622800, end: 622899 }],
    ['中国银行|BOC', { start: 622150, end: 622199 }],
    ['中国招商银行|CMB', { start: 622575, end: 622576 }],
    ['中国民生银行|CMBC', { start: 622622, end: 622623 }],
    ['中国光大银行|CEB', { start: 622660, end: 622662 }],
    ['交通银行|BCM', { start: 622260, end: 622262 }],
    ['中信银行|CITIC', { start: 622690, end: 622699 }],
    ['平安银行|PAB', { start: 622155, end: 622157 }],
    ['华夏银行|HXB', { start: 622636, end: 622637 }],
    ['兴业银行|CIB', { start: 622908, end: 622909 }],
]);

export type Range = MapValueType<typeof BANK_BIN_RANG_MAP>

/**
 * 随机生成银行卡号
 * https://www.jianshu.com/p/4c8a284f4dd1
 * https://pay.weixin.qq.com/docs/merchant/development/chart/bank-of-deposit.html
 * @param bankName 银行名称或是英文简写
 * @param len 指定长度
 */
export function generate(bankName?: string, len?: number): string {
    // 随机发卡行标识码(前6位)-默认只生成银联卡号62开头的
    let bin = getBin(bankName ?? '银联');
    // 银联标准卡长度一般是16-19位。其中信用卡的长度为16位，借记卡的长度为19位
    const isYl = bin.startsWith("62");
    const max = 19;
    const min = isYl ? 16 : 10;
    len = len ? Math.max(min, Math.min(len, max)) : randomInt(min, max)
    // 从随机数的小数位中截取出9到12位数出来
    let endCode = randomNumericStr(len - 7);
    // 本位码
    let baseCodes = `${bin}${endCode}`;
    // 校验码
    let verifyCode = getVerityCode(baseCodes);
    return `${baseCodes}${verifyCode}`
}


/**
 * 获取校验码
 * @param bankAccountBaseCode 银行账号的本位码(除校验码外的数字组合)
 */
export function getVerityCode(bankAccountBaseCode: string): string {
    if (!bankAccountBaseCode) return "";
    // 获取本位码并反转
    let reverseBaseCodes = (bankAccountBaseCode + "").split("").reverse();
    // https://www.jianshu.com/p/4c8a284f4dd1 (文章里检验码算法逻辑好像有问题)
    // luhn算法: https://zh.wikipedia.org/zh-hans/%E5%8D%A2%E6%81%A9%E7%AE%97%E6%B3%95
    // 按维基百科介绍的算法是将反转过来的本位码, 偶数位上的数 * 2后再拆分为十位和个位两个数相加, 最后将操作后的数和奇数位的数相加求和
    let total = reverseBaseCodes.reduce((sum, numb, index) => {
        let val = +numb;  // 转换为数字
        if (index % 2 === 0) {
            // 偶数位的数乘2后,将个位和十位上的数字相加返回
            val = val * 2;
            let mod10 = val % 10; // 个位上的数
            let tenDigits = (val - mod10) / 10; // 十位上的数
            val = mod10 + tenDigits; // 个位和十位上的数相加
        }
        return sum + val;
    }, 0);

    // 第三步: 将10减去第二步计算结果的个位数，即个位数求10的补数；若个位数为0则检验码为0.
    let mod = total % 10;
    return (mod === 0 ? 0 : 10 - mod).toString();
}

/**
 * 校验银行卡号是否合法
 * @param bankAccount
 */
export function validate(bankAccount: string): boolean {
    if (!bankAccount) return false;
    const length = bankAccount.length;
    if (length < 10 || length > 19) return false;
    // 截取本位码
    let baseCodes = (bankAccount + "").slice(0, -1);
    let verifyCode = getVerityCode(baseCodes);
    if (verifyCode === null) return false;
    const reg = new RegExp(`^(${BIN_LIST.join("|")})`);
    return reg.test(bankAccount) && bankAccount.endsWith(verifyCode + "");
}


/**
 * 随机获取发卡行标识码
 * 也可以通过银行名称或是简称生成对应银行的标识码, 找不到则会返回任意银联卡号
 * 如果输入“银联” 则会随机生成一个银联成员银行的标识码
 * @param bankName
 */
function getBin(bankName?: string): string {
    if (bankName) {
        const bankNameList = Array.from(BANK_BIN_RANG_MAP.keys());
        let targetName: Nullable<string>;
        if (bankName.includes("银联")) {
            // 如果是堕入的银联，则会随机生成随机银行的标识码
            targetName = randomPick(bankNameList);
        } else {
            targetName = bankNameList.find(name => !!bankName && name.includes(bankName))
        }
        if (targetName) {
            let target = BANK_BIN_RANG_MAP.get(targetName)

            if (target) {
                let min = target.start;
                let max = target.end;
                return randomInt(min, max).toString();
            }
        } else {
            bankName = "银联";
            return getBin(bankName);
        }
    }
    let len = BIN_LIST.length;
    let index = randomInt(len - 1);
    let bin = BIN_LIST[index];
    // 生成后四位数
    let end = randomNumericStr(4);
    return "" + bin + end;
}