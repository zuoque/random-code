import { generate, validate, getVerifyCode } from "../src/packages/creditCode.ts";


describe("测试creditCode.ts", () => {
    it("测试validate方法", () => {
        expect(validate("91130224999019646U")).toBe(true);
        expect(validate("91130224999019646T")).toBe(false);
        expect(validate("91130224999019646UU")).toBe(false);
        expect(validate("91130224999019646")).toBe(false);
    })

    it("测试getVerifyCode方法", () => {
        expect(getVerifyCode("")).toBe("");
        expect(getVerifyCode("91130224999019646")).toBe("U");
        expect(getVerifyCode("91130224999019646U")).toBe("U");
        expect(getVerifyCode("91130224640964094")).toBe("E");
    })

    it("测试generate方法-无参", () => {
        new Array(1000).fill(1).forEach(() => {
            const creditCode = generate();
            expect(creditCode).toBe(validate(creditCode) ? creditCode: "");
        })
    })


    it("测试generate方法-指定部门", () => {
        new Array(1000).fill(1).forEach(() => {
            const creditCode = generate("工会");
            expect(creditCode).toBe(validate(creditCode) ? creditCode: "");
            expect(creditCode).toMatch(/^8[19]/);
        })
    })

    it("测试generate方法-指定部门、机构", () => {
        new Array(1000).fill(1).forEach(() => {
            const creditCode = generate("宗教", "宗教活动");
            expect(creditCode).toBe(validate(creditCode) ? creditCode: "");
            expect(creditCode).toMatch(/^71/);
        })
    })

    it("测试generate方法-指定部门、机构、地区", () => {
        new Array(1000).fill(1).forEach(() => {
            const creditCode = generate("工商", "个体工商户", "上海");
            expect(creditCode).toBe(validate(creditCode) ? creditCode: "");
            expect(creditCode).toMatch(/^9231/);
        })
    })

    it("测试generate方法-指定部门、地区", () => {
        new Array(1000).fill(1).forEach(() => {
            const creditCode = generate("工商", "", "上海浦东");
            expect(creditCode).toBe(validate(creditCode) ? creditCode: "");
            expect(creditCode).toMatch(/^9[123]310115/);
        })
    })

    it("测试generate方法-只指定地区", () => {
        new Array(1000).fill(1).forEach(() => {
            const creditCode = generate("", "", "上海浦东");
            expect(creditCode).toBe(validate(creditCode) ? creditCode: "");
            expect(creditCode).toMatch(/^\d{2}310115/);
        })
    })
})