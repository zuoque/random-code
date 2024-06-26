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
})