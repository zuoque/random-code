/**
 * 第1位：登记管理部门代码，使用阿拉伯数字或英文字母表示。
 * 分为1机构编制；2外交；3司法行政；4文化；5民政；6旅游；7宗教；8工会；9工商；A中央军委改革和编制办公室；N农业；Y其他。
 * 第2位：机构类别代码，使用阿拉伯数字表示。分为：
 *
 * 　　1机构编制：1机关，2事业单位，3中央编办直接管理机构编制的群众团体，9其他；
 *
 * 　　2外交：1外国常住新闻机构，9其他；
 *
 * 　　3司法行政：1律师执业机构，2公证处，3基层法律服务所，4司法鉴定机构，5仲裁委员会，9其他；
 *
 * 　　4文化：1外国在华文化中心，9其他；
 *
 * 　　5民政：1社会团体，2民办非企业单位，3基金会，9其他；
 *
 * 　　6旅游：1外国旅游部门常驻代表机构，2港澳台地区旅游部门常驻内地（大陆）代表机构，9其他；7宗教：1宗教活动场所，2宗教院校，9其他；
 *
 * 　　8工会：1基层工会，9其他；
 *
 * 　　9工商：1企业，2个体工商户，3农民专业合作社；
 *
 * 　　A中央军委改革和编制办公室：1军队事业单位，9其他；
 *
 * 　　N农业：1组级集体经济组织，2村级集体经济组织，3乡镇级集体经济组织，9其他；
 *
 * 　　Y其他：不再具体划分机构类别，统一用1表示。
 */

export const MANAGE_DEPT_CODES_MAP = {
    "机构编制": {
        code: 1,
        child: {
            "机关": 1,
            "事业单位": 2,
            "中央编办直接管理机构编制的群众团体": 3,
            "其他": 9,
        },
    },
    "外交": {
        code: 2,
        child: {
            "外国常驻新闻机构": 1,
            "其他": 9,
        },
    },
    "司法行政": {
        code: 3,
        child: {
            "律师执业机构": 1,
            "公证处": 2,
            "基层法律服务所": 3,
            "司法鉴定机构": 4,
            "仲裁委员会": 5,
            "其他": 9,
        },
    },
    "文化": {
        code: 4,
        child: {
            "外国在华文化中心": 1,
            "其他": 9,
        },
    },
    "民政": {
        code: 5,
        child: {
            "社会团体": 1,
            "民办非企业单位": 2,
            "基金会": 3,
            "其他": 9,
        },
    },
    "旅游": {
        code: 6,
        child: {
            "外国旅游部门常驻代表机构": 1,
            "港澳台地区旅游部门常驻内地（大陆）代表机构": 2,
            "其他": 9,
        },
    },
    "宗教": {
        code: 7,
        child: {
            "宗教活动场所": 1,
            "宗教院校": 2,
            "其他": 9,
        },
    },
    "工会": {
        code: 8,
        child: {
            "基层工会": 1,
            "其他": 9,
        },
    },
    "工商": {
        code: 9,
        child: {
            "企业": 1,
            "个体工商户": 2,
            "农民专业合作社": 3,
        },
    },
    "中央军委改革和编制办公室": {
        code: "A",
        child: {
            "军队事业单位": 1,
            "其他": 9,
        },
    },
    "农业": {
        code: "N",
        child: {
            "组级集体经济组织": 1,
            "村级集体经济组织": 2,
            "乡镇级集体经济组织": 3,
            "其他": 9,
        },
    },
    "其他": {
        code: "Y",
        child: {
            default: 1,
        },
    },
};

export type ManageDeptCodesMap = typeof MANAGE_DEPT_CODES_MAP;

// 部门类型
export type DeptNameType = keyof ManageDeptCodesMap;
// 各部门类型
export type DeptValueMap = ManageDeptCodesMap[DeptNameType];
// 各部门的下级机构类型
export type DeptChildMap = DeptValueMap['child'];

export type DeptAndOrgName2CodeMap = ManageDeptCodesMap | DeptChildMap;

export type DeptOrOrgNames = keyof DeptAndOrgName2CodeMap;

// 17个权重因子集合
export const WEIGHTS = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];

// 代码字符数值表
export const CHAR_CODE_MAP = "0123456789ABCDEFGHJKLMNPQRTUWXY"

export type CodeType = Nullable<string | number>;
export type DeptAndOrgCodeMapType = { deptCode: CodeType, orgCode: CodeType }