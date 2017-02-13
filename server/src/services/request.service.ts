import * as request from "request";

export class RequestService {
    private credentialsEncoded = 'dHNnLWJ0by1hcHBzLWJ1aWxkOlRzZ2J0b0BwcHNidWlsZA==';

    private getRequestHeaders() {
        return {
            "Authorization": `Basic ${this.credentialsEncoded}`
        };
    }

    get(url) {
        const  options = {
            url: url,
            headers: this.getRequestHeaders()
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }


}
