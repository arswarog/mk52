import { MKButton } from "./common";

export const MK52Keyboard = [
    [
        new MKButton('A1', 'F', 'f', null),
        new MKButton('A2', 'ШГ→', 'b', null, 'x<0', null),
        new MKButton('A3', 'П→X', 'b', null, 'L0', null),
        new MKButton('A4', '7', 'w', '07', 'sin', null, '[x]', null),
        new MKButton('A5', '8', 'w', '08', 'cos', null, '{x}', null),
        new MKButton('A6', '9', 'w', '09', 'tg', null, 'max', null),
        new MKButton('A7', '-', 'w', '11', '√', null),
        new MKButton('A8', '÷', 'w', '13', '1/x', null),
    ], [
        new MKButton('B1', 'K', 'k', null),
        new MKButton('B2', 'ШГ←', 'b', null, 'x=0', null),
        new MKButton('B3', 'X→П', 'b', null, 'L1', null),
        new MKButton('B4', '4', 'w', '04', 'sin⁻¹', null, '|x|', null),
        new MKButton('B5', '5', 'w', '05', 'cos⁻¹', null, 'ЗН', null),
        new MKButton('B6', '6', 'w', '06', 'tg⁻¹', null, '°′', null),
        new MKButton('B7', '+', 'w', '10', 'π', null, '°′', null),
        new MKButton('B8', '×', 'w', '12', 'x²'),
    ], [
        new MKButton('C1', '⇵', 'b', null),
        new MKButton('C2', 'В/О', 'b', null, 'x⩾0', null),
        new MKButton('C3', 'БП', 'b', null, 'L2', null),
        new MKButton('C4', '1', 'w', '01', 'eⁿ', null),
        new MKButton('C5', '2', 'w', '02', 'lg', null),
        new MKButton('C6', '3', 'w', '03', 'ln', null, '°′″', null),
        new MKButton('C7', '↔', 'w', null, 'xⁿ', null, '°′″', null),
        new MKButton('C8', 'В↑', 'w', '0E', 'Bx', '0F', 'СЧ', null, 'e'),
    ], [
        new MKButton('D1', 'А↑', 'b', null),
        new MKButton('D2', 'С/П', 'b', null, 'x≠0'),
        new MKButton('D3', 'ПП', 'b', null, 'L3'),
        new MKButton('D4', '0', 'w', '00', '10ⁿ', null, 'НОП', null),
        new MKButton('D5', '·', 'w', null, '⟳', null, '∧', null, 'a'),
        new MKButton('D6', '/-/', 'w', null, 'АВТ', null, '∨', null, 'b'),
        new MKButton('D7', 'ВП', 'w', '0C', 'ПРГ', null, '⊕', null, 'c'),
        new MKButton('D8', 'СX', 'r', null, 'CF', null, 'ИНВ', null, 'd'),
    ],
];