/// <reference path="../../../src/_all.d.ts" />
export declare class ServersAPI {
    private svnPath;
    serversList: Array<any>;
    constructor();
    getXMLList(): Promise<{}>;
    static extractText(htmlElement: any): string;
    getHostsListFromXML(xml_url: any): Promise<{}>;
}
