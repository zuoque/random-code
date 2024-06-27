import * as tools from "../src/utils/tools.ts";
import { addrMap } from "../src/packages/area.ts";
import { format } from "date-fns"

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

    it('getAge方法测试-周岁', () => {
        const getAge = tools.getAge;
        const now = new Date();
        const year = now.getFullYear();

        const currentDate = (formatStr: string = 'MMdd') => format(now, formatStr);
        const nextDate = (formatStr: string = 'MMdd') => format(new Date(+now + 86400000), formatStr);
        const lastDate = (formatStr: string = 'MMdd') => format(new Date(+now - 86400000), formatStr);

        let age = year - 1993;
        // 已过生日
        expect(getAge(`1993-${lastDate('MM-dd')}`)).toBe(age)
        expect(getAge(`3204021993${lastDate()}8492`)).toBe(age)
        // 生日当天
        expect(getAge(`1993-${currentDate('MM-dd')}`)).toBe(age)
        expect(getAge(`3204021993${currentDate()}8492`)).toBe(age)
        // 未过生日
        expect(getAge(`1993-${nextDate('MM-dd')}`)).toBe(age - 1)
        expect(getAge(`3204021993${nextDate()}8492`)).toBe(age - 1)

        // 去年出生的
        const lastYear = year - 1;
        expect(getAge(`${lastYear}-${lastDate('MM-dd')}`)).toBe(1)
        expect(getAge(`320402${lastYear}${lastDate()}8492`)).toBe(1)
        expect(getAge(`${lastYear}-${currentDate('MM-dd')}`)).toBe(1)
        expect(getAge(`320402${lastYear}${currentDate()}8492`)).toBe(1)
        expect(getAge(`${lastYear}-${nextDate('MM-dd')}`)).toBe(0)
        expect(getAge(`320402${lastYear}${nextDate()}8492`)).toBe(0)

        // 今年出生的
        expect(getAge(`${year}-${lastDate('MM-dd')}`)).toBe(0)
        expect(getAge(`320402${year}${lastDate()}8492`)).toBe(0)
        expect(getAge(`${year}-${currentDate('MM-dd')}`)).toBe(0)
        expect(getAge(`320402${year}${currentDate()}8492`)).toBe(0)
        expect(getAge(`${year}-${nextDate('MM-dd')}`)).toBe(0)
        expect(getAge(`320402${year}${nextDate()}8492`)).toBe(0)
    })

    it('getAge方法测试-虚岁', () => {
        const getAge = (birthday: string) => tools.getAge(birthday, true);
        const now = new Date();
        const year = now.getFullYear();

        const currentDate = (formatStr: string = 'MMdd') => format(now, formatStr);
        const nextDate = (formatStr: string = 'MMdd') => format(new Date(+now + 86400000), formatStr);
        const lastDate = (formatStr: string = 'MMdd') => format(new Date(+now - 86400000), formatStr);

        let age = year - 1993 + 1;
        // 已过生日
        expect(getAge(`1993-${lastDate('MM-dd')}`)).toBe(age)
        expect(getAge(`3204021993${lastDate()}8492`)).toBe(age)
        // 生日当天
        expect(getAge(`1993-${currentDate('MM-dd')}`)).toBe(age)
        expect(getAge(`3204021993${currentDate()}8492`)).toBe(age)
        // 未过生日
        expect(getAge(`1993-${nextDate('MM-dd')}`)).toBe(age)
        expect(getAge(`3204021993${nextDate()}8492`)).toBe(age)

        // 去年出生的
        const lastYear = year - 1;
        expect(getAge(`${lastYear}-${lastDate('MM-dd')}`)).toBe(2)
        expect(getAge(`320402${lastYear}${lastDate()}8492`)).toBe(2)
        expect(getAge(`${lastYear}-${currentDate('MM-dd')}`)).toBe(2)
        expect(getAge(`320402${lastYear}${currentDate()}8492`)).toBe(2)
        expect(getAge(`${lastYear}-${nextDate('MM-dd')}`)).toBe(2)
        expect(getAge(`320402${lastYear}${nextDate()}8492`)).toBe(2)

        // 今年出生的
        expect(getAge(`${year}-${lastDate('MM-dd')}`)).toBe(1)
        expect(getAge(`320402${year}${lastDate()}8492`)).toBe(1)
        expect(getAge(`${year}-${currentDate('MM-dd')}`)).toBe(1)
        expect(getAge(`320402${year}${currentDate()}8492`)).toBe(1)
        expect(getAge(`${year}-${nextDate('MM-dd')}`)).toBe(1)
        expect(getAge(`320402${year}${nextDate()}8492`)).toBe(1)
    })
})