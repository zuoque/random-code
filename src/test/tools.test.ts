import { isUndef, isDef, isTrue, isFalse, randomInt, randomNumericStr } from "../utils/tools.ts";

// 生成jest测试用例
describe("测试tool.ts相关工具函数", () => {
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
        expect(isDef(undefined)).toBe(false);
        expect(isDef(null)).toBe(false);
        expect(isDef(0)).toBe(true);
        expect(isDef("")).toBe(true);
        expect(isDef({})).toBe(true);
        expect(isDef([])).toBe(true);
        expect(isDef(() => {})).toBe(true);
    });

    it('isTrue方法测试', () => {
        expect(isTrue(true)).toBe(true);
        expect(isTrue(1)).toBe(false);
        expect(isTrue("true")).toBe(false);
        expect(isTrue("1")).toBe(false);
    });

    it('isFalse方法测试', () => {
        expect(isFalse(false)).toBe(true);
        expect(isFalse(0)).toBe(false);
        expect(isFalse("false")).toBe(false);
        expect(isFalse("0")).toBe(false);
    });

    it('randomInt方法测试', () => {
        expect(randomInt()).toBeGreaterThanOrEqual(0);
        expect(randomInt(100)).toBeGreaterThanOrEqual(0);
        expect(randomInt(1, 100)).toBeGreaterThanOrEqual(1);
        expect(randomInt(1, 100)).toBeLessThanOrEqual(100);
    })

    it('randomNumericStr方法测试', () => {
        const str = randomNumericStr(10);
        expect(str.length).toBe(10);
        expect(str.match(/^\d+$/)).not.toBeNull();
    })
})