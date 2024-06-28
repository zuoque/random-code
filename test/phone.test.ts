import {generate, validate} from "../src/packages/phone";
import {TELCO_ENUM} from "../src/types/enums";
import {HaoDuan} from "../src/packages/phone/HaoDuan";

describe("手机号生成相关方法测试", () => {
    it("测试校验方法", () => {
        expect(validate("13800138000")).toBe(true)
        expect(validate("03800138000")).toBe(false)
        expect(validate("1380013800")).toBe(false)
        expect(validate("138001380000")).toBe(false)
        expect(validate("14400138000")).toBe(false)
        expect(validate("12400138000")).toBe(false)
        expect(validate("13400138000")).toBe(true)
        expect(validate("13490138000")).toBe(false)
    })

    it("测试生成-无参", () => {
        for (let i = 0; i < 1000; i++) {
            const phoneNo = generate();
            // 主要看是哪些手机号没有通过
            expect(phoneNo).toBe(validate(phoneNo) ? phoneNo : '');
        }
    })

    it("测试生成-指定运营商-移动", () => {
        const phoneNo = generate(TELCO_ENUM.CM);
        const isPass = validate(phoneNo);
        expect(isPass).toBe(true);
        const telco = phoneNo.slice(0, 3);
        expect(HaoDuan.HAO_DUAN_MAP[TELCO_ENUM.CM]).toContainEqual(telco);
    })

    it("测试生成-指定运营商-电信", () => {
        const phoneNo = generate(TELCO_ENUM.CT);
        const isPass = validate(phoneNo);
        expect(isPass).toBe(true);
        const telco = phoneNo.slice(0, 3);
        expect(HaoDuan.HAO_DUAN_MAP[TELCO_ENUM.CT]).toContainEqual(telco);
    })

    it("测试生成-指定运营商-联通", () => {
        const phoneNo = generate(TELCO_ENUM.CU);
        const isPass = validate(phoneNo);
        expect(isPass).toBe(true);
        const telco = phoneNo.slice(0, 3);
        expect(HaoDuan.HAO_DUAN_MAP[TELCO_ENUM.CU]).toContainEqual(telco);
    })

    it("测试生成-指定运营商-广电", () => {
        const phoneNo = generate(TELCO_ENUM.CRT);
        const isPass = validate(phoneNo);
        expect(isPass).toBe(true);
        const telco = phoneNo.slice(0, 3);
        expect(HaoDuan.HAO_DUAN_MAP[TELCO_ENUM.CRT]).toContainEqual(telco);
    })
})