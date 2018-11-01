//import * as ts from 'typescript';
////import { Digit } from "./register";
//
//let code = 'class Core {\n' +
//    '\n' +
//    '    /**\n' +
//    '     * Ввод 0\n' +
//    '     * Operation "0"\n' +
//    '     */\n' +
//    '    exec00() {\n' +
//    '        return this.input(Digit.h0);\n' +
//    '    }\n' +
//    '\n' +
//    '    /**\n' +
//    '     * Ввод 1\n' +
//    '     * Operation "1"\n' +
//    '     */\n' +
//    '    exec01() {\n' +
//    '        return this.input(Digit.h1);\n' +
//    '    }';
//
////const sourceFile = ts.createSourceFile(,
////    fs.readFileSync(filename).toString(), ts.ScriptTarget.ES6, false);
////console.log(sourceFile.ast);
//
//import * as fs from 'fs';
//
//code     = fs.readFileSync(__dirname + '/MK52Core.ts').toString();
////console.log(code);
//const sc = ts.createSourceFile('x.ts', code, ts.ScriptTarget.Latest, true);
//
////print_r(sc);
//
//console.log('-----');
//
//function print_r(node: any) {
//    if (typeof node !== 'object')
//        console.log(node);
//    else {
//        let obj = Object.assign(node);
//        if (typeof obj.parent === 'object')
//            obj.parent = '[OBJECT]';
//        console.log(obj);
//    }
//}
//
////print_r(sc.statements[0]);
////
////console.log('----- 1');
////print_r(sc.statements[0].members[0]);
////
////console.log('----- 2');
////print_r(sc.statements[0].members[1]);
//
//let cl = null;
//
////print_r(sc);
//console.log('---');
//sc.statements.forEach(item => {
//    print_r(item);
//    if (!item.name) return;
////    console.log(item.name.escapedText);
//    if (item.name.escapedText === 'MK52Core')
//        cl = item;
//});
//
//if (!cl) {
//    throw new Error('not found any names');
//}
//
//print_r(cl);
//console.log('---');
//let data = cl.members
//             .filter(member => member.name.escapedText.match(/^exec[0-9A-F]{2}$/))
//             .map(member => {
//                 let info = {
//                     code       : member.name.escapedText.substr(4),
//                     key        : null,
//                     operation  : null,
//                     description: '',
//                 };
//                 print_r(member);
//                 let comment = member.jsDoc ? member.jsDoc.map(item => item.comment).join('\n') : '';
//                 console.log(comment);
//                 let data     = {};
//                 let comments = comment.split('\n')
//                                       .map(line => {
//                                           let found = null;
//                                           if (!info.description) {
//                                               info.description = line;
//                                               return null;
//                                           }
//                                           if (found = line.match(/^Key\s+(\w+)/)) {
//                                               info.key = found[1];
//                                               return null;
//                                           }
//                                           if (found = line.match(/^Operation\s+"(.+)"/)) {
//                                               info.operation = found[1];
//                                               return null;
//                                           }
//                                           return line;
//                                       })
//                                       .filter(item => item);
//
//                 info['data']    = data;
//                 info['comment'] = comments.join('\n');
//                 return info;
//             });
//data.sort((a, b) => {
//    if (a.code > b.code)
//        return 1;
//    if (a.code < b.code)
//        return -1;
//    return 0;
//});
//
//console.log(JSON.stringify(data, null, 2));
