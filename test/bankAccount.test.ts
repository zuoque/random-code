import { BANK_BIN_RANG_MAP, generate, getVerityCode, validate, Range } from "../src/packages/bankAccount.ts";


describe("测试bankAccount.ts", () => {
    it("测试validate方法", () => {
        expect(validate("531545215250068863")).toBe(true);
        expect(validate("688002191363639250")).toBe(true);
        expect(validate("47953524964886292")).toBe(true);
        // bin码不合法的
        expect(validate("91130224999019646")).toBe(false);
        expect(validate("031545215250068864")).toBe(false);
    })

    it("测试getVerifyCode方法", () => {
        expect(getVerityCode("")).toBe("");
        expect(getVerityCode("53154521525006886")).toBe("3");
        expect(getVerityCode("68800219136363925")).toBe("0");
        expect(getVerityCode("4795352496488629")).toBe("2");
    })

    it("测试generate方法-无参", () => {
        new Array(1000).fill(null).forEach((_v, i) => {
            const bankAccount = i % 2 === 0 ? generate() : generate("银联");
            expect(bankAccount).toBe(validate(bankAccount) ? bankAccount: "");
            expect(bankAccount).toMatch("^62");
        })
    })

    it("测试generate方法-指定银行", () => {
        const bankNameList = Array.from(BANK_BIN_RANG_MAP.keys());
        const base = 100;
        new Array(bankNameList.length * base).fill(null).forEach((_v, i) => {
            const index = Math.floor(i / base);
            const [name, code] = bankNameList[index].split("|")
            const bankAccount = i % 2 === 0 ? generate(name) : generate(code);
            expect(bankAccount).toBe(validate(bankAccount) ? bankAccount: "");
            const bankBin = +bankAccount.slice(0, 6);
            const { start, end } = BANK_BIN_RANG_MAP.get(bankNameList[index]) as Range;
            expect(bankBin).toBeGreaterThanOrEqual(start);
            expect(bankBin).toBeLessThanOrEqual(end);
        })
    })
})