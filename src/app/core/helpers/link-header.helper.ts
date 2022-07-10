import * as parse from 'parse-link-header';
import { Links } from 'parse-link-header';

export class LinkHeaderHelper {
    public static getNextPageNumber(link: string): number {
        const parsedLink = parse(link) as Links;
        const nextPage = parsedLink.next?.page;
        return parseInt(nextPage);
    }

    public static getPrevPageNumber(link: string): number {
        const parsedLink = parse(link) as Links;
        const prevPage = parsedLink.prev?.page;
        return parseInt(prevPage);
    }

    public static getPagesCount(link: string): number {
        const parsedLink = parse(link) as Links;
        const pagesCount = parsedLink.last.page;
        return parseInt(pagesCount);
    }

    public static getNextPageUrl(link: string): string {
        const parsedLink = parse(link) as Links;
        return parsedLink.next?.url || '';
    }

    public static getPreviousPageUrl(link: string): string {
        const parsedLink = parse(link) as Links;
        return parsedLink.prev?.url || '';
    }
}