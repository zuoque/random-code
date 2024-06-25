import { TELCO_ENUM } from "../../types/enums.ts";
import { randomInt } from "../../utils/tools.ts";

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