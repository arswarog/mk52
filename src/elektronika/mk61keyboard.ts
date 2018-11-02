import { MKButton } from './common';

export const MK61Keyboard = [
    [
        new MKButton('FF', 'F', 'f', null),
        new MKButton('SF', 'ШГ→', 'b', null, 'x<0', null),
        new MKButton('SB', 'ШГ←', 'b', null, 'x=0', null),
        new MKButton('VO', 'В/О', 'b', null, 'x⩾0', null),
        new MKButton('SS', 'С/П', 'b', null, 'x≠0'),
    ], [
        new MKButton('KK', 'K', 'k', null),
        new MKButton('PX', 'П→X', 'b', null, 'L0', null),
        new MKButton('XP', 'X→П', 'b', null, 'L1', null),
        new MKButton('GO', 'БП', 'b', null, 'L2', null),
        new MKButton('SU', 'ПП', 'b', null, 'L3'),
    ], [
        new MKButton('07', '7', 'w', '07', 'sin', null, '[x]', null),
        new MKButton('08', '8', 'w', '08', 'cos', null, '{x}', null),
        new MKButton('09', '9', 'w', '09', 'tg', null, 'max', null),
        new MKButton('MI', '-', 'w', '11', '√', null),
        new MKButton('PR', '÷', 'w', '13', '1/x', null),
    ], [
        new MKButton('04', '4', 'w', '04', 'sin⁻¹', null, '|x|', null),
        new MKButton('05', '5', 'w', '05', 'cos⁻¹', null, 'ЗН', null),
        new MKButton('06', '6', 'w', '06', 'tg⁻¹', null, '°′', null),
        new MKButton('PL', '+', 'w', '10', 'π', null, '°′', null),
        new MKButton('MU', '×', 'w', '12', 'x²'),
    ], [
        new MKButton('01', '1', 'w', '01', 'eⁿ', null),
        new MKButton('02', '2', 'w', '02', 'lg', null),
        new MKButton('03', '3', 'w', '03', 'ln', null, '°′″', null),
        new MKButton('XY', '↔', 'w', null, 'xⁿ', null, '°′″', null),
        new MKButton('UP', 'В↑', 'w', '0E', 'Bx', '0F', 'СЧ', null, 'e'),
    ], [
        new MKButton('00', '0', 'w', '00', '10ⁿ', null, 'НОП', null),
        new MKButton('0D', '·', 'w', null, '⟳', null, '∧', null, 'a'),
        new MKButton('0S', '/-/', 'w', null, 'АВТ', null, '∨', null, 'b'),
        new MKButton('EX', 'ВП', 'w', '0C', 'ПРГ', null, '⊕', null, 'c'),
        new MKButton('RX', 'СX', 'r', null, 'CF', null, 'ИНВ', null, 'd'),
    ],
];