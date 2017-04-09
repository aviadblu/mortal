/// <reference path="../../../src/_all.d.ts" />
export declare class ServersAPI {
    private _projectsMetadata;
    private machineData;
    private _serversStatus;
    constructor();
    private loadServersStatus();
    private loadServersData();
    private loadData();
    static extractText(htmlElement: any): string;
    static extractLinkHref(htmlLinkElement: any): string;
    private getXMLListInDirectory(group, dirUrl);
    private getXMLList();
    private getHostsList();
    private extractHostsListFromXML(xmlUrl);
    readonly projectsMetadata: Object;
    readonly serversStatus: any[];
}
