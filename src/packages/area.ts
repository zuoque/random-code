import {areaList} from "@vant/area-data"
import {removeDuplicateWords} from "../utils/tools.ts";
import {AreaLevelEnum} from "../types/enums.ts";

/**
 * 获取随机的行政区划代码
 * @param areaLevel 行政区划级别 省级（1），市级（2），县级（3）
 * @param parentAreaCode 父级(祖父级)行政区划代码
 */
export function randomAreaCode(areaLevel: AreaLevelEnum = AreaLevelEnum.County, parentAreaCode?: string): string {
    let areaMap: Record<string, string>;
    const _getParentAreaCode = (length: number): string => {
        if (!parentAreaCode) return "";
        const code = parentAreaCode.substring(0, length);
        if (code === "") return "";
        // 去掉00的代码
        return code.replace(/^(([1-9]\d)+)?(0*)$/g, "$1");
    }
    switch (areaLevel) {
        case AreaLevelEnum.Province:
            areaMap = areaList.province_list;
            parentAreaCode = ""; // 如果是随机省份, 没有父级行政区划代码
            break;
        case AreaLevelEnum.City:
            areaMap = areaList.city_list;
            parentAreaCode = _getParentAreaCode(2); // 前两个是父级省份代码
            break;
        case AreaLevelEnum.County:
        default:
            areaMap = areaList.county_list;
            parentAreaCode = _getParentAreaCode(4); // 前四个是父级省份+城市代码
            break;
    }
    let codeList = Object.keys(areaMap).filter(code => code.startsWith(parentAreaCode));
    let len = codeList.length;
    let index = Math.floor(Math.random() * len);
    return codeList[index] || ""
}

/**
 * 根据行政区划代码或身份证号获取对应的三级地址
 * @param codeOrIdNo
 * @param isCompletion 如果三级地址不完整时，是否随机补全
 */
export function findAreaNamesByCode(codeOrIdNo: string, isCompletion: boolean = false): string[] {
    if (!codeOrIdNo) return [];
    const countyCode = codeOrIdNo.substring(0, 6);
    let provinceCode = countyCode.substring(0, 2) + "0000";
    let cityCode = countyCode.substring(0, 4) + "00";
    let provinceName = areaList.province_list[provinceCode] || "";
    let cityName = areaList.city_list[cityCode] || ""
    let countyName = areaList.county_list[countyCode] || "";
    if (isCompletion) {
        if (!provinceName) {
            const code = randomAreaCode(AreaLevelEnum.County);
            return findAreaNamesByCode(code, false);
        } else if(!cityName) {
            const code = randomAreaCode(AreaLevelEnum.County, provinceCode);
            return findAreaNamesByCode(code, false);
        } else if (!countyName) {
            const code = randomAreaCode(AreaLevelEnum.County, cityCode);
            return findAreaNamesByCode(code, false);
        }
    }

    return [provinceName, cityName, countyName];
}

// 将三级地址对应的行政区划代码为键, 值是省市区的字符拼接成的完整地址表述
// eg: {310115: "上海市上海市浦东新区"}
// type CodeKey = keyof areaList.county_list
export const addrMap:Record<string, string> = Object.keys(areaList.county_list).reduce((map, code) => {
    const areaNameList = findAreaNamesByCode(code);
    map[code] = areaNameList.filter(name => !!name).join("")
    return map;
}, {} as Record<string, string>)


/**
 * 根据地址模糊匹配完整三级区域地址
 * @param fuzzyAddr
 */
export function findFullAreaAddr(fuzzyAddr: string): string {
    if (!fuzzyAddr) return "";

    // 如果能直接在countyList中匹配到,则直接返回
    let countyAreaCodes = Object.keys(areaList.county_list).filter(code => areaList.county_list[code] === fuzzyAddr);
    if (countyAreaCodes.length === 1) {
        // 唯一匹配, 直接返回完整地址
        return addrMap[countyAreaCodes[0]]
    }

    // 先匹配省
    let target = "";
    let preEqualWords = 0; // 上一个匹配的最大相同字数
    let minDiffWords = Infinity; // 最小不同字数
    Object.values(addrMap).forEach(addr => {
        // 一些无关的的字去掉
        let reg = /(自治)?([省市区县乡])/g;
        let addrCharList = addr.replace(reg, "").split("");
        let areaCharList = fuzzyAddr.replace(reg, "").split("");
        let len = addrCharList.length;
        let count = 0; // 相同字统计
        let index = 0;
        // 比较相同的字有多少个
        areaCharList.forEach(str => {
            let i = addrCharList.indexOf(str, index);
            if (i !== -1 && i < len) {
                index = i;
                count ++;
            }
        })

        // 当前不同字统计
        let currDiffCount = len - count;
        // 相同字至少要有4个, 并且
        // 1. 当前统计的相同字数比之前匹配的多
        // 2. 或是与前一个匹配到相同的字数相同, 但是不同的字更少
        if (count >= Math.min(fuzzyAddr.length, 4) && (count > preEqualWords || (count === preEqualWords && currDiffCount < minDiffWords))) {
            minDiffWords = currDiffCount;
            preEqualWords = count;
            target = addr;
        }
    })

    if (!target) console.log(`通过【${fuzzyAddr}】无法匹配到唯一完整地址 \r\t\n==============================`);
    return target;
}

/**
 * 根据地址模糊匹配完整三级区域地址
 * @param fuzzyAddr
 */
export function findFullAddrNoRepeatWord(fuzzyAddr: string): string {
    if (!fuzzyAddr) return "";
    const target = findFullAreaAddr(fuzzyAddr);
    if (!target) return "";
    return removeDuplicateWords(target);
}

/**
 * 根据地址获取对应的行政区划代码
 * @param addr
 */
export function findAreaCode(addr: string): string {
    let target = findFullAreaAddr(addr);
    if (!target) return "";
    let code = Object.keys(addrMap).find(code => addrMap[code] === target)
    console.log("当前模糊地址: ", addr);
    console.log("当前匹配到的完整地址: ", target);
    console.log("对应地址的code: ", code)
    console.log("=====================================")
    return code || "";
}

/**
 * 根据行政区划代码或身份证号精确或随机获取一个包含三级区域的地址
 * @param codeOrIdNo 行政区代码或身份证号
 */
export function randomAddrByCode(codeOrIdNo: string): string {
    if (!codeOrIdNo) return "";
    const nameList = findAreaNamesByCode(codeOrIdNo, true);
    return removeDuplicateWords(nameList.join(""));
}

/**
 * 根据行政区划代码获取对应的县级名称
 * @param codeOrIdNo
 */
export function getCountyByCode(codeOrIdNo: string): string {
    if (!codeOrIdNo) return ""
    let code = codeOrIdNo;
    if (code.length > 6) code = code.substring(0, 6);
    return areaList.county_list[code] || "";
}

console.log(findFullAreaAddr("东至"))