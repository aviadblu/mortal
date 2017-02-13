/// <reference path="../../_all.d.ts" />
"use strict";
const cheerio = require("cheerio");
const request_service_1 = require("../../services/request.service");
let requestSvc = new request_service_1.RequestService();
const pollXmlListInterval = 1000 * 60 * 10; // 10 minutes
//const pollXmlListInterval = 1000 * 10; // 10 seconds
class ServersAPI {
    constructor() {
        this._projectsMetadata = {};
        this.loadData();
        setInterval(this.loadData.bind(this), pollXmlListInterval);
    }
    loadData() {
        let self = this;
        return this.getXMLList()
            .then(() => {
            return self.getHostsList();
        });
    }
    static extractText(htmlElement) {
        let text = '';
        if (htmlElement[0] && htmlElement[0].children[0]) {
            text = htmlElement[0].children[0].data.trim();
        }
        return text;
    }
    static extractLinkHref(htmlLinkElement) {
        let href = '';
        if (htmlLinkElement && htmlLinkElement.attribs && htmlLinkElement.attribs.href) {
            href = htmlLinkElement.attribs.href;
        }
        return href.indexOf('..') < 0 || href.indexOf('.') < 0 ? href : null;
    }
    getXMLListInDirectory(group, dirUrl) {
        let self = this;
        return requestSvc.get(dirUrl)
            .then((response) => {
            const $ = cheerio.load(response);
            let linksArr = $('a');
            let href;
            self._projectsMetadata[group] = [];
            linksArr.each((index, link) => {
                href = ServersAPI.extractLinkHref(link);
                if (href && href.indexOf('.xml') > -1) {
                    self._projectsMetadata[group].push({
                        url: dirUrl + href,
                        environmentName: '',
                        hosts: []
                    });
                }
            });
            return true;
        });
    }
    getXMLList() {
        let self = this;
        const serverListUrl = "https://csvn1-pro.il.hpecorp.net:19181/svn/tsg-bto-apps-lt-ops/trunk/app/BuildManager/ALMToolsGlobal/Reports/Deployment";
        return requestSvc.get(serverListUrl)
            .then((response) => {
            self._projectsMetadata = {};
            let dirListPromises = [];
            const $ = cheerio.load(response);
            let dirsArr = $('a');
            dirsArr.each((index, dir) => {
                let href = ServersAPI.extractLinkHref(dir);
                if (href) {
                    let dirUrl = `${serverListUrl}/${ServersAPI.extractLinkHref(dir)}`;
                    dirListPromises.push(self.getXMLListInDirectory(href.replace('/', ''), dirUrl));
                }
            });
            return Promise.all(dirListPromises)
                .then(() => {
                return self._projectsMetadata;
            });
        });
    }
    getHostsList() {
        let self = this;
        let hostsPromises = [];
        Object.keys(this._projectsMetadata).forEach((groupKey) => {
            let jobIndex = 0;
            self._projectsMetadata[groupKey].forEach((job) => {
                hostsPromises.push(self.extractHostsListFromXML(job.url)
                    .then((hostData) => {
                    job.hosts = hostData['hosts'];
                    job.environmentName = hostData['environmentName'];
                }));
                jobIndex++;
            });
        });
    }
    extractHostsListFromXML(xmlUrl) {
        return requestSvc.get(xmlUrl)
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
                environmentName: environmentName,
                hosts: hosts
            };
        });
    }
    get projectsMetadata() {
        return this._projectsMetadata;
    }
}
exports.ServersAPI = ServersAPI;
//# sourceMappingURL=index.js.map