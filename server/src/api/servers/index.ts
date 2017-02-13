/// <reference path="../../_all.d.ts" />
"use strict";

import * as cheerio from "cheerio";
import {RequestService} from "../../services/request.service";
let requestSvc = new RequestService();

export class ServersAPI {
    private svnPath: string = '/Users/shimonmo/svn/';

    serversList: Array<any> = [
        {
            name: 'mock server1'
        },
        {
            name: 'mock server2'
        }
    ];

    constructor() {
        console.log('hello from ServersAPI class');
    }

    getXMLList() {
        const serverListUrl = "https://csvn1-pro.il.hpecorp.net:19181/svn/tsg-bto-apps-lt-ops/trunk/app/BuildManager/ALMToolsGlobal/Reports/Config";
        return requestSvc.get(serverListUrl)
            .then((response) => {
                const $ = cheerio.load(response);
                let linksArr = $('a');
                let links = [];
                linksArr.each((index, link) => {
                    if (link && link.attribs && link.attribs.href && link.attribs.href.indexOf('.xml') > -1) {
                        links.push(`${serverListUrl}/${link.attribs.href}`);
                    }
                });

                return links;
            });
    }

    static extractText(htmlElement) {
        let text = '';
        if (htmlElement[0] && htmlElement[0].children[0]) {
            text = htmlElement[0].children[0].data.trim();
        }
        return text;
    }

    getHostsListFromXML(xml_url) {
        return requestSvc.get(xml_url)
            .then((response) => {
                const $ = cheerio.load(response, {
                    normalizeWhitespace: true,
                    xmlMode: true
                });

                let environmentName = ServersAPI.extractText($('environmentName'));

                const hostsSelector = $('Host');
                let hosts = [];
                hostsSelector.each((index, host) => {

                    let hostElement = cheerio.load(host, {
                        normalizeWhitespace: true,
                        xmlMode: true
                    });

                    hosts.push({
                        name: ServersAPI.extractText(hostElement('name')),
                        Description: ServersAPI.extractText(hostElement('Description')),
                        InstalledOS: ServersAPI.extractText(hostElement('InstalledOS'))
                    });

                });


                return {
                    'environment-name': environmentName,
                    hosts: hosts
                };
            });

    }

}

