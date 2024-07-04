import { SexEnum } from "./enums";

export type IdNoGenOptions = {
    minAge?: number, // 最小年龄
    maxAge?: number, // 最大年龄
    sex?: SexEnum, // 性别
    birthplace?: string, // 出生地
    birthday?: string, // 出生日期
    age?: number, // 年龄
}

// 校验码
export const VERIFY_CODES = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
// 位权重
export const WEIGHT_LIST = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7","9", "10", "5", "8", "4", "2"];