import * as tools from "../src/utils/tools.ts";
import { addrMap } from "../src/packages/area.ts";

// 生成jest测试用例
describe("测试tool.ts相关工具函数", () => {
    const isUndef = tools.isUndef;
    it("isUndef方法测试", () => {
        expect(isUndef(undefined)).toBe(true);
        expect(isUndef(null)).toBe(true);
        expect(isUndef(0)).toBe(false);
        expect(isUndef("")).toBe(false);
        expect(isUndef({})).toBe(false);
        expect(isUndef([])).toBe(false);
        expect(isUndef(() => {})).toBe(false);
    })

    it('isDef方法测试', () => {
        const isDef = tools.isDef;
        expect(isDef(undefined)).toBe(false);
        expect(isDef(null)).toBe(false);
        expect(isDef(0)).toBe(true);
        expect(isDef("")).toBe(true);
        expect(isDef({})).toBe(true);
        expect(isDef([])).toBe(true);
        expect(isDef(() => {})).toBe(true);
    });

    it('isTrue方法测试', () => {
        const isTrue = tools.isTrue;
        expect(isTrue(true)).toBe(true);
        expect(isTrue(1)).toBe(false);
        expect(isTrue("true")).toBe(false);
        expect(isTrue("1")).toBe(false);
    });

    it('isFalse方法测试', () => {
        const isFalse = tools.isFalse;
        expect(isFalse(false)).toBe(true);
        expect(isFalse(0)).toBe(false);
        expect(isFalse("false")).toBe(false);
        expect(isFalse("0")).toBe(false);
    });

    it('randomInt方法测试', () => {
        const randomInt = tools.randomInt;
        expect(randomInt()).toBeGreaterThanOrEqual(0);
        expect(randomInt(100)).toBeGreaterThanOrEqual(0);
        expect(randomInt(1, 100)).toBeGreaterThanOrEqual(1);
        expect(randomInt(1, 100)).toBeLessThanOrEqual(100);
    })

    it('randomNumericStr方法测试', () => {
        const str = tools.randomNumericStr(10);
        expect(str.length).toBe(10);
        expect(str.match(/^\d+$/)).not.toBeNull();
    })


    it('findFitWords方法测试', () => {
        const strArr = tools.findFitWords("浦东", Object.values(addrMap));
        expect(strArr.length).toBeGreaterThan(0);
        expect(strArr[0]).toBe("上海市上海市浦东新区");
    })

    it('countDiffAndEqual的方法测试', () => {
        const result = tools.countDiffAndEqual("安徽歙县", "安徽省黄山市歙县")
        expect(result.diff).toBe(4);
        expect(result.equal).toBe(4);
    })

    it('getDataType方法测试', () => {
        const getDataType = tools.getDataType;
        expect(getDataType(undefined)).toBe("undefined");
        expect(getDataType(null)).toBe("null");
        expect(getDataType(0)).toBe("number");
        expect(getDataType("")).toBe("string");
        expect(getDataType({})).toBe("object");
        expect(getDataType([])).toBe("array");
        expect(getDataType(() => {})).toBe("function");
    });

    it('isDataType方法测试', () => {
        const isDataType = tools.isDataType;
        expect(isDataType(undefined, "undefined")).toBe(true);
        expect(isDataType(undefined, "null")).toBe(false);
        expect(isDataType(null, "null")).toBe(true);
        expect(isDataType(null, "object")).toBe(false);
        expect(isDataType(0, "number")).toBe(true);
        expect(isDataType("", "string")).toBe(true);
        expect(isDataType({}, "object")).toBe(true);
        expect(isDataType([], "array")).toBe(true);
        expect(isDataType([], "object")).toBe(false);
        expect(isDataType(() => {}, "function")).toBe(true);
    });

    it('removeDuplicateWords方法测试', () => {
        const removeDuplicateWords = tools.removeDuplicateWords;
        expect(removeDuplicateWords("上海市上海市浦东新区")).toBe("上海市浦东新区");
        expect(removeDuplicateWords("上海上海浦东新区")).toBe("上海浦东新区");
        expect(removeDuplicateWords("上海市上海浦东新区")).toBe("上海市上海浦东新区");
    })
})