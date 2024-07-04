import { generate, getVerityCode, validate } from "../src/packages/orgCode"
import { CHARS_STR } from "../src/types/orgCodeTypes";

const letters = CHARS_STR.slice(10)
const codeReg = new RegExp(`^((\\d{8})|([${letters}]\\d{7})|([${letters}]{2}\\d{6})|([${letters}]{3}\\d{5}))-[0-9X]$`);

describe("测试orgCode.ts", () => {
    it("测试validate方法", () => {
        expect(validate("05266367-4")).toBe(true);
        expect(validate("87764067-X")).toBe(true);
        expect(validate("HMFMNBNY-1")).toBe(true);
        expect(validate("FH5U55Q8-X")).toBe(true);
        expect(validate("052663674")).toBe(false);
        expect(validate("87764067X")).toBe(false);
        expect(validate("87764067")).toBe(false);
        expect(validate("87764067X5")).toBe(false);
    })

    it("测试getVerityCode方法", () => {
        expect(getVerityCode("PPQ40708")).toBe("9");
        expect(getVerityCode("08207142")).toBe("6");
        expect(getVerityCode("HMFMNBNY-1")).toBe("1");
        expect(getVerityCode("87764067X5")).toBe("X");
        expect(getVerityCode("8776406")).toBe("");
    })

    it("测试generate方法-随机", () => {
        new Array(1000).fill(1).forEach(() => {
            const orgCode = generate();
            expect(orgCode).toBe(validate(orgCode) ? orgCode: "");
            expect(orgCode).toMatch(codeReg);
        })
    })

    it("测试generate方法-指定本位码", () => {
        expect(generate("05266367")).toBe("05266367-4");
        expect(generate("P8Y20246")).toBe("P8Y20246-5");
        expect(generate("PYD20246")).toBe("PYD20246-1");
        // 小写转大写
        expect(generate("pyd20246")).toBe("PYD20246-1");
        // 不存在的本位码或位数不够
        expect(generate("PYD2024")).toMatch(codeReg);
        // 使用了不合法的字符I
        expect(generate("P8I20246")).toMatch(codeReg);
        expect(generate("P8O20246")).toMatch(codeReg);
        expect(generate("P8S20246")).toMatch(codeReg);
        expect(generate("P8V20246")).toMatch(codeReg);
        expect(generate("P8Z20246")).toMatch(codeReg);
    })
})