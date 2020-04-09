import { parseGithubUrl } from './github.utils';
import { UrlType } from './github.types';

describe('parseGithubUrl', () => {
    it('', () => {
        expect(parseGithubUrl('https://github.com/arswarog/mk52-programs')).toEqual({
            type: UrlType.Repository,
            owner: 'arswarog',
            repo: 'mk52-programs',
        });
    });
    it('', () => {
        expect(parseGithubUrl('https://github.com/arswarog/mk52-programs/tree/master')).toEqual({
            type: UrlType.Directory,
            owner: 'arswarog',
            repo: 'mk52-programs',
            branch: 'master',
            path: '/',
        });
    });
    it('', () => {
        expect(parseGithubUrl('https://github.com/arswarog/mk52-programs/tree/master/config')).toEqual({
            type: UrlType.Directory,
            owner: 'arswarog',
            repo: 'mk52-programs',
            branch: 'master',
            path: '/config',
        });
    });
    it('', () => {
        expect(parseGithubUrl('https://github.com/arswarog/mk52-programs/blob/master/math-basic/quadratic_equation.mk'))
            .toEqual({
                type: UrlType.Programm,
                owner: 'arswarog',
                repo: 'mk52-programs',
                branch: 'master',
                path: '/math-basic/quadratic_equation.mk',
            });
    });
    it('', () => {
        expect(parseGithubUrl('https://github.com/arswarog/mk52-programs/blob/master/math-basic/quadratic_equation'))
            .toEqual({
                type: UrlType.OtherFile,
                owner: 'arswarog',
                repo: 'mk52-programs',
                branch: 'master',
                path: '/math-basic/quadratic_equation',
            });
    });
});
