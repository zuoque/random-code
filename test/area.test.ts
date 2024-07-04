import {
    randomAreaCode,
    findAreaNamesByCode,
    findFullAreaAddr,
    findFullAddrNoRepeatWord,
    findAreaCode,
    randomAddrByCode,
    getCountyByCode
} from "../src/packages/area";
import { AreaLevelEnum } from "../src/types/enums";
import { areaList } from "@vant/area-data"

describe("测试area.ts相关函数", () => {
    it("测试randomAreaCode方法-省级", () => {
        const code = randomAreaCode(AreaLevelEnum.Province)
        const isExist = Object.keys(areaList.province_list).includes(code);
        expect(isExist).toBe(true);
    })

    it("测试randomAreaCode方法-市级", () => {
        const code = randomAreaCode(AreaLevelEnum.City)
        const isExist = Object.keys(areaList.city_list).includes(code);
        expect(isExist).toBe(true);

        const specialCode = randomAreaCode(AreaLevelEnum.City, "34")
        const isExist2 = Object.keys(areaList.city_list).includes(code);
        expect(isExist2).toBe(true);
        expect(specialCode).toMatch(/^34/);
    })

    it("测试randomAreaCode方法-县级", () => {
        const code = randomAreaCode()
        const isExist = Object.keys(areaList.county_list).includes(code);
        expect(isExist).toBe(true);

        // 指定省份
        const specialCode2 = randomAreaCode(AreaLevelEnum.County, "34")
        const isExist2 = Object.keys(areaList.county_list).includes(specialCode2);
        expect(isExist2).toBe(true);
        expect(specialCode2).toMatch(/^34/);

        // 指定到市
        const specialCode3 = randomAreaCode(AreaLevelEnum.County, "341000")
        const isExist3 = Object.keys(areaList.county_list).includes(specialCode3);
        expect(isExist3).toBe(true);
        expect(specialCode3).toMatch(/^3410/);
    })

    it("测试findAreaNamesByCode方法-不补全", () => {
        const nameList = findAreaNamesByCode("320402202406272431");
        expect(nameList).toEqual(["江苏省", "常州市", "天宁区"]);

        const nameList2 = findAreaNamesByCode("320400");
        expect(nameList2).toEqual(["江苏省", "常州市", ""]);

        // 胡乱写的
        const nameList3 = findAreaNamesByCode("329999");
        expect(nameList3).toEqual(["江苏省", "", ""]);
    })

    it("测试findAreaNamesByCode方法-补全-无需补全", () => {
        const nameList = findAreaNamesByCode("320402202406272431", true);
        expect(nameList).toEqual(["江苏省", "常州市", "天宁区"]);
    })

    it("测试findAreaNamesByCode方法-补全-需补县级", () => {
        const nameList = findAreaNamesByCode("320400", true);
        expect(nameList.slice(0,2)).toEqual(["江苏省", "常州市"]);
        const countyList = Object.keys(areaList.county_list)
            .filter(code => code.startsWith("3204"))
            .map(code => areaList.county_list[code]);
        const isExist = countyList.includes(nameList[2]);
        expect(isExist).toBe(true)
    })

    it("测试findAreaNamesByCode方法-补全-需补市、县两级", () => {
        const nameList = findAreaNamesByCode("329999", true);
        const cityList = Object.keys(areaList.city_list)
            .filter(code => code.startsWith("32"))
            .map(code => areaList.city_list[code]);
        const countyList = Object.keys(areaList.county_list)
            .filter(code => code.startsWith("32"))
            .map(code => areaList.county_list[code]);
        expect(nameList[0]).toEqual("江苏省");
        const cityIsExist = cityList.includes(nameList[1]);
        expect(cityIsExist).toBe(true)
        const countyIsExist = countyList.includes(nameList[2]);
        expect(countyIsExist).toBe(true)
    })

    it("测试findFullAreaAddr方法", () => {
        const addr = findFullAreaAddr("浦东");
        expect(addr).toBe("上海市上海市浦东新区");
    })

    it("测试findFullAddrNoRepeatWord方法", () => {
        const addr = findFullAddrNoRepeatWord("浦东");
        expect(addr).toBe("上海市浦东新区");
    })

    it("测试findAreaCode方法", () => {
        const code = findAreaCode("浦东");
        expect(code).toBe("310115");
    })

    it("测试randomAddrByCode方法", () => {
        expect(randomAddrByCode("310115202406274270")).toBe("上海市浦东新区");
        expect(randomAddrByCode("310115")).toBe("上海市浦东新区");
    })

    it("测试getCountyByCode方法", () => {
        expect(getCountyByCode("310115")).toBe("浦东新区");
    })
})