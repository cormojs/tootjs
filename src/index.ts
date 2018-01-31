import { Config, Registration } from './types'
import * as fetch from 'isomorphic-fetch'
import * as OAuth2 from 'client-oauth2'



export class Mastodon {
    private config: Config
    private auth: OAuth2

    public constructor(config: Config) {
        this.config = config
        this.config.api_base = config.api_base ? config.api_base : "/api/v1/"
        this.config.redirect_to = config.redirect_to ? config.redirect_to : "urn:ietf:wg:oauth:2.0:oob"
    }

    public async registerApp(clientName: string): Promise<Registration> {
        let url = `https://${this.config.host}${this.config.api_base}apps`
        let params = new URLSearchParams()
        params.set('client_name', clientName)
        params.set('redirect_uris', this.config.redirect_to)
        params.set("scope", this.config.scope)
        let resp = await fetch(`url?${params.toString()}`, { method: "post",  })
        let json = await resp.json()
        this.config.registration = json
        return json
    }
    public getAuthUrl(): string {
        this.auth = new OAuth2({
            clientId: this.config.registration.client_id,
            clientSecret: this.config.registration.client_secret,
            scopes: this.config.scope.split(' '),
            authorizationUri: `${this.config.host}/oauth/authorize`,

        })
        return this.auth.token.getUri()
    }

    // public setAccessToken(code: string): this

    public async get(api: string, opts: { [key: string]: string }): Promise<object> {
        let params = new URLSearchParams()
        for (let k in opts)
            params.set(k, opts[k]);
        let f = await fetch(`${this.config.host}${this.config.api_base}${api}${params.toString()}`)
        return f.json
    }
    // public post(api: string, params: { string?: string }): Promise<Result>
}