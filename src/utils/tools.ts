
/**
 * 判断值是否是null或是undefined
 * @param v 要判断的值
 */
export function isUndef(v: any): v is undefined | null {
    return v === undefined || v === null
}

/**
 * 判断值是否是非null或非undefined
 * @param v 要判断的值
 */
export function isDef<T>(v: T): v is NonNullable<T> {
    return v !== undefined && v !== null
}

/**
 * 判断值是否是true
 * @param v
 */
export function isTrue(v: any): boolean {
    return v === true
}

/**
 * 判断值是否是false
 * @param v
 */
export function isFalse(v: any): boolean {
    return v === false
}

/**
 * 生成随机整数
 * @returns {number} 随机整数。
 */
export function randomInt(): number;
/**
 * 返回一个 0 到 max 之间的随机整数。
 * @param {number} max - 最大值。
 * @returns {number} 随机整数。
 */
export function randomInt(max: number): number;
/**
 * 返回一个 min 到 max 之间的随机整数。
 * @param {number} min - 最小值。
 * @param {number} max - 最大值。
 * @returns {number} 随机整数。
 */
export function randomInt(min: number, max: number): number;
/**
 * 实现返回随机整数的函数。
 * - 如果没有参数，返回 0 到 Number.MAX_SAFE_INTEGER 之间的随机整数。
 * - 如果传入一个参数，返回 0 到 max 之间的随机整数。
 * - 如果传入两个参数，返回 min 到 max 之间的随机整数。
 *
 * @param {number} [minOrMax] - 如果是单个参数，表示最大值；如果是两个参数中的第一个，表示最小值。
 * @param {number} [max] - 最大值。
 * @returns {number} 随机整数。
 */
export function randomInt(minOrMax?: number, max?: number): number {
    let min:number;
    if (minOrMax === undefined) {
        min = 0;
        max = max ?? Number.MAX_SAFE_INTEGER;
    } else if (max === undefined) {
        min = 0;
        max = minOrMax;
    } else {
        min = minOrMax;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

/**
 * 从一个数组中, 随机选择一个元素
 * @param list 一个类数组对象
 */
export function randomPick<T>(list: ArrayLike<T>): Nullable<T> {
    list = Array.from(list);
    let len = list.length;
    let index = randomInt(len - 1);
    return list[index];
}

/**
 * 生成随机长度的数据数字字符串
 * @param {number} len - 字符长度
 */
export function randomNumericStr(len:number): string {
    if (!len) return "";
    let random = "";
    while (random.length < len ) {
        random = random + Math.random().toString().substring(2);
    }
    return random.substring(0, len);

}

/**
 * 在一组词组内找出与给定词语最匹配的词组
 * @param keyword - 要匹配的词语
 * @param wordList - 词组列表
 * @param minEqual - 最小相同字符数, 默认是2
 */
export function findFitWords(keyword:string, wordList: string[], minEqual = 2): string[] {
    let target:string[] = [];
    let preEqualWords = 0; // 上一个匹配的最大相同字数
    let minDiffWords = Infinity; // 最小不同字数
    for (const el of wordList) {
        // 如果是直接匹配到的, 则直接返回
        if (el === keyword) {
            target.push(el);
            break;
        } else {
            let { diff, equal } = countDiffAndEqual(el, keyword);
            // 相同字符数比前一次匹配到的要多
            // 如果相同字符相同,则比较哪个剩下的不相同字符数最少
            if (equal >= minEqual && (equal > preEqualWords || (equal === preEqualWords && diff <= minDiffWords))) {
                if (equal === preEqualWords && diff === minDiffWords) {
                    // 有相同和不相同的字符一样的词组合并返回
                    target.push(el)
                } else {
                    target = [el]
                }
                minDiffWords = diff;
                preEqualWords = equal;
            }
        }
    }

    return target
}


/**
 * 计算两个字符串的不同和相同的字符数
 * @param word1 - 字符1
 * @param word2 - 字符2
 * @returns {DiffAndEqualMap} 包含不同和相同字符数的对象
 */
type DiffAndEqualMap = { diff:number, equal:number }
export function countDiffAndEqual(word1:string, word2:string): DiffAndEqualMap {
    let result = { diff: 0, equal: 0 }
    // 存在相互包含
    if (word1 && word2) {
        // 将最长的串作为word2
        if (word1.length > word2.length) {
            let temp = word1;
            word1 = word2;
            word2 = temp;
        }
        let index = 0;
        // 比较相同的字有多少个
        Array.from(word1).forEach((str) => {
            let i = word2.indexOf(str, index);
            if (i !== -1) {
                index = i;
                result.equal = result.equal + 1;
            }
        })

        result.diff = word2.length - result.equal;
    }

    return result;
}

/**
 * 返回数据类型
 * @param data
 * @returns {string} - 小写字母数据类型名称
 */
export function getDataType(data: any): string {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

/**
 * 判断数据是否是指定的类型
 * @param data 数据
 * @param type 要指定的类型，如 string， number, object
 */
export function isDataType(data: any, type:string): boolean {
    if (!type) return false;
    return getDataType(data) === type.toLowerCase();
}

/**
 * 去掉文本中的重复词汇
 * @param text
 */
export function removeDuplicateWords(text: string): string {
    if (!text || !isDataType(text, "string")) return "";
    // 存在连续词汇（两个字以上）的重复时，则去掉重复的部分
    return text.replace(/(.{2,})\1/g, "$1");
}


/**
 * 通过身份证号或生日计算法定年龄(或虚岁)
 * @param idNoOrBirthday
 * @param isVirtualAge 是否计算为虚岁
 */
export function getAge(idNoOrBirthday: string, isVirtualAge = false): Nullable<number> {
    if (!idNoOrBirthday) return null;
    let birthday = idNoOrBirthday;
    if (idNoOrBirthday.length === 18) {
        birthday = idNoOrBirthday.slice(6, 14);
    }
    birthday = birthday.replace(/\D/g, "");
    let now = new Date(),
        cYear = now.getFullYear(),
        bYear = +birthday.slice(0, 4),
        bMonth = +birthday.slice(4, 6),
        bDay = +birthday.slice(6, 8);

    // 未来出生的都算作0
    if (bYear > cYear) return 0;
    let base = Math.max(cYear - bYear, 0);
    if (isVirtualAge) return base + 1;
    // 如果是当年出生的，直接算0岁
    if (base === 0) return 0;
    // 如果是往年出生的，要看今年是否过了生日
    const nextBirthday = new Date(cYear, bMonth - 1, bDay, 0, 0, 0);
    // 如果还没过生日要少算一年
    return (+now >= +nextBirthday) ? base : base - 1;
}