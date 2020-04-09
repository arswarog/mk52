import { IGithubUrlDetails, UrlType } from './github.types';

export function parseGithubUrl(url: string): IGithubUrlDetails {
    let match: RegExpMatchArray = null;
    if (!url.match(/^https:\/\/github.com/))
        return parseGithubUrlResult(UrlType.Invalid, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)$/))
        return parseGithubUrlResult(UrlType.Repository, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)\/tree\/([-\w]+)(.*)$/))
        return parseGithubUrlResult(UrlType.Directory, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)\/blob\/([-\w]+)(.*\.mk)$/))
        return parseGithubUrlResult(UrlType.Programm, match);

    if (match = url.match(/^https:\/\/github.com\/([\w-\.]+)\/([\w-\.]+)\/blob\/([-\w]+)(.*)$/))
        return parseGithubUrlResult(UrlType.OtherFile, match);

    return parseGithubUrlResult(UrlType.Invalid, match);
}

function parseGithubUrlResult(type: UrlType, match: RegExpMatchArray): IGithubUrlDetails {
    const result = {
        type,
    };

    switch (type) {
        case UrlType.Programm:
        case UrlType.OtherFile:
        case UrlType.Directory:
            result['path'] = match[4] ? match[4] : '/';
            result['branch'] = match[3];
        case UrlType.Repository        :
            result['repo'] = match[2];
            result['vendor'] = match[1];
        case UrlType.Invalid:
        default:
    }

    return result as IGithubUrlDetails;
}
