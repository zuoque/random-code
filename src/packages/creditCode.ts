import {
    CHAR_CODE_MAP,
    WEIGHTS,
    MANAGE_DEPT_CODES_MAP,
    DeptAndOrgName2CodeMap,
    DeptOrOrgNames,
    DeptValueMap,
    CodeType,
    DeptAndOrgCodeMapType
} from "../types/creditCodeTypes.ts";
import {findFitWords} from "../utils/tools.ts";
import {findAreaCode, randomAreaCode} from "./area.ts";
import {generateOrgCode} from "./orgCode.ts";


/**
 * 随机生成统一社会信用代码
 * @param dept 登记管理部门名称
 * @param org 机构类别名称
 * @param area 公司所在地
 */
export function generateCreditCode(dept?:string, org?:string, area?:string): string {
    let deptCode: CodeType,
        orgCode: CodeType;

    if (dept) {
        // 登记管理部门与机构代码
        const result = getDeptAndOrgCode(dept, org);
        deptCode = result.deptCode;
        orgCode = result.orgCode;
    }

    // 如果无法找到, 则默认是工商部门9 企业机构1
    deptCode = deptCode || 9
    orgCode = orgCode || 1

    // 随机行政区划码
    let areaCode = area ? findAreaCode(area) : randomAreaCode();
    // 随机组织机构代码
    let randomOrgCode = generateOrgCode().replace("-", "");
    // 本位码
    let baseCode = `${deptCode}${orgCode}${areaCode}${randomOrgCode}`;

    // 校验码
    let verityCode = getVerifyCode(baseCode);

    return `${baseCode}${verityCode}`;
}

/**
 * 校验统一信用代码是否正确
 * @param creditCode
 * @returns {*|boolean}
 */
export function validateCreditCode(creditCode: string): boolean {
    if (!creditCode || creditCode.length !== 18) return false;
    // 前17位计算出的校验码
    let verifyCode = getVerifyCode(creditCode);
    // 直接通过判断是否是以这个校验码结尾
    return creditCode.endsWith(verifyCode);
}



/**
 * 获取校验码
 * @param baseCode 本体代码
 */
export function getVerifyCode(baseCode: string): string {
    if (!baseCode) return "";
    // 权重因子
    const weights = WEIGHTS;
    // 预定义映射表
    const codeMap = CHAR_CODE_MAP;

    // 计算每位上的权重并求和
    const total = weights.reduce((sum, wi, i) => {
        return sum + (wi * codeMap.indexOf(baseCode[i]));
    }, 0)

    // 计算校验码的余数
    const mod = total % 31;

    // 获取校验码字符
    return (mod === 0 ? 0 : codeMap[31 - mod]).toString();
}


/**
 * 指定登记管理部门名称, 返回对应的部门配置数据
 * @param name
 * @param nameCodeMap
 */
export function getManageDeptByName(
    name: string,
    nameCodeMap: DeptAndOrgName2CodeMap = MANAGE_DEPT_CODES_MAP
): Nullable<DeptValueMap | number | string>
{
    if (!name || !nameCodeMap) return null;
    let nameList = Object.keys(nameCodeMap);
    // 只返回第一个
    let [targetName] = findFitWords(name, nameList);

    if (targetName) {
        return nameCodeMap[targetName as DeptOrOrgNames];
    }

    return null;
}


/**
 * 返回指定管理部门及机构名称的
 * @param deptName
 * @param orgName
 */

export function getDeptAndOrgCode(deptName: string, orgName?:string): DeptAndOrgCodeMapType {
    const result: DeptAndOrgCodeMapType = { deptCode: null, orgCode: null }
    // 未提供登记管理部门名称时直接不用查了
    if (!deptName) return result;
    // 登记管理部门
    let deptMap = getManageDeptByName(deptName, MANAGE_DEPT_CODES_MAP) as DeptValueMap;
    result.deptCode = deptMap?.code as CodeType;
    result.orgCode = orgName && deptMap ? getManageDeptByName(orgName, deptMap.child) as CodeType : null;
    return result
}