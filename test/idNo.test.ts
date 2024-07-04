import {genBirthday, generate, getVerifyCode, validate} from "../src/packages/idNo";
import {SexEnum} from "../src/types/enums";
import {getAge} from "../src/utils/tools";

describe('测试idNo.ts相关函数', () => {
    // 先测试校验方法
    it('validate方法的测试', () => {
        expect(validate('42050419900611401X')).toBe(true);
        // 校验码错误
        expect(validate('420504199006114019')).toBe(false);
        // 长度不够
        expect(validate('42050419900611401')).toBe(false);
        // 长度多出一位
        expect(validate('42050419900611401X0')).toBe(false);
        // 虽然可能是不存在的身份证号但是符合校验规则的（有些前6位的地址码可能不在最新的行政区划码表内，也要算成功）
        expect(validate('999999199207041213')).toBe(true);
    })

    it('getVerifyCode方法测试', () => {
        expect(getVerifyCode(undefined as any)).toBe('');
        expect(getVerifyCode('')).toBe('');
        expect(getVerifyCode(null as any)).toBe('');
        expect(getVerifyCode(0 as any)).toBe('');
        expect(getVerifyCode({} as any)).toBe('');

        expect(getVerifyCode('42050419900611401')).toBe('X');
        expect(getVerifyCode('42050419900611401X')).toBe('X');

        expect(getVerifyCode('4205041990061140')).toBe('');
        expect(getVerifyCode('42050419900611401X4')).toBe('');
    });


    it('genBirthday方法测试', () => {
        const now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let monthStr = (month > 9 ? month : `0${month}`).toString();
        let day = now.getDate();
        expect(genBirthday(undefined as any)).toBe('');
        expect(genBirthday(-1)).toBe('');
        expect(genBirthday(0)).toBe(`${year}${monthStr}${day}`);
        expect(genBirthday(31)).toBe(`${year - 31}${monthStr}${day}`);
        let isPass = new Array(1000).fill(1).every(() => {
            const birthDate = genBirthday(18, 60);
            const birthYear = Number(birthDate.slice(0, 4));
            const diff = year - birthYear;
            return birthDate.length === 8 && diff >= 18 && diff <= 60;
        })
        expect(isPass).toBe(true);
    })


    it('generate方法测试-无参', () => {
        const now = new Date();
        let year = now.getFullYear();
        const idNo = generate();
        const isIdNo = validate(idNo);
        expect(isIdNo).toBe(true);
        const birthYear = Number(idNo.slice(6, 10));
        expect(birthYear).toBeLessThanOrEqual(year - 16);
        expect(birthYear).toBeGreaterThanOrEqual(year - 90);
    })

    it('generate方法测试-指定年龄-1', () => {
        const now = new Date();
        let year = now.getFullYear();
        [generate(-1), generate({age: -1})].forEach((idNo) => {
            const isIdNo = validate(idNo);
            expect(isIdNo).toBe(true);
            const birthYear = Number(idNo.slice(6, 10));
            expect(birthYear).toBeGreaterThanOrEqual(year - 90);
            expect(birthYear).toBeLessThanOrEqual(year - 16);
        })
    })

    it('generate方法测试-指定年龄0', () => {
        const now = new Date();
        let year = now.getFullYear();
        [generate(0), generate({age: 0})].forEach((idNo) => {
            const isIdNo = validate(idNo);
            expect(isIdNo).toBe(true);
            const birthYear = Number(idNo.slice(6, 10));
            expect(birthYear).toBe(year);
        })
    })

    it('generate方法测试-指定生日', () => {
        [
            generate("19930629"),
            generate({birthday: "19930629"}),
            generate("1993-06-29"),
            generate({birthday: "1993-06-29"}),
            generate("1993/06/29"),
            generate({birthday: "1993/06/29"}),
            generate("1993.06.29"),
            generate({birthday: "1993.06.29"}),
        ].forEach((idNo) => {
            const isIdNo = validate(idNo);
            expect(isIdNo).toBe(true);
            const birthYear = idNo.slice(6, 10);
            expect(birthYear).toBe("1993");
        });

        const now = new Date();
        let year = now.getFullYear();
        [
            generate("1993629"),
            generate({birthday: "1993629"}),
            generate("199306220"),
            generate({birthday: "199306220"}),
            generate("1993-06/29"),
            generate({birthday: "1993/06-29"}),
            generate("1993-06.29"),
            generate({birthday: "1993/06.29"}),
            generate("1993.06/29"),
            generate({birthday: "1993.06-29"}),
        ].forEach((idNo) => {
            const isIdNo = validate(idNo);
            expect(isIdNo).toBe(true);
            const birthYear = Number(idNo.slice(6, 10));
            expect(birthYear).toBeGreaterThanOrEqual(year - 90);
            expect(birthYear).toBeLessThanOrEqual(year - 16);
        })
    })

    it('generate方法测试-指定年龄与性别', () => {
        [
            generate(18, SexEnum.Female),
            generate(24, SexEnum.Male),
            generate(18, SexEnum.FemaleCode),
            generate(24, SexEnum.MaleCode),
            generate({ age: 18, sex: SexEnum.Female }),
            generate({ age: 24, sex: SexEnum.Male }),
            generate({ age: 18, sex: SexEnum.FemaleCode }),
            generate({ age: 24, sex: SexEnum.MaleCode }),
        ].forEach((idNo, index) => {
            const isIdNo = validate(idNo);
            expect(isIdNo).toBe(true);
            const age = getAge(idNo);
            expect(age).toBe(index % 2 === 0 ? 18 : 24);
            const sexSignCode = Number(idNo[16]);
            expect(sexSignCode % 2).toBe(index % 2);
        })
    })

    it('generate方法测试-指定年龄、性别和出生地', () => {
        [
            generate(18, SexEnum.FemaleCode, '上海浦东'),
            generate(18, SexEnum.Male, '安徽萧县'),
            generate({
                age: 18,
                sex: SexEnum.FemaleCode,
                birthplace: "上海浦东"
            }),
            generate({
                age: 18,
                sex: SexEnum.Male,
                birthplace: "安徽萧县"
            }),
        ].forEach((idNo, index) => {
            const isIdNo = validate(idNo);
            expect(isIdNo).toBe(true);
            const age = getAge(idNo);
            expect(age).toBe(18);
            const sexSignCode = Number(idNo[16]);
            expect(sexSignCode % 2).toBe(index % 2);
            const addressCode = idNo.slice(0, 6);
            expect(addressCode).toBe(index %2 === 0 ? "310115" : "341322")
        })
    })

    it('generate方法测试-指定年龄范围', () => {
        new Array(1000).fill(1).forEach(() => {
            const idNo = generate({ minAge: 90, maxAge: 120 });
            expect(validate(idNo)).toBe(true);
            const age = getAge(idNo);
            expect(age).not.toBeNull();
            expect(age).toBeGreaterThanOrEqual(90);
            expect(age).toBeLessThanOrEqual(120);
        })
    })
});