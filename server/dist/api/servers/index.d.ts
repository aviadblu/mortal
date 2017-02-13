/// <reference path="../../../src/_all.d.ts" />
export declare class ServersAPI {
    private _projectsMetadata;
    constructor();
    loadData(): Promise<void>;
    static extractText(htmlElement: any): string;
    static extractLinkHref(htmlLinkElement: any): string;
    private getXMLListInDirectory(group, dirUrl);
    private getXMLList();
    private getHostsList();
    private extractHostsListFromXML(xmlUrl);
    readonly projectsMetadata: Object;
}
