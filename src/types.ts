export interface Config {
    host: string
    scope: string
    api_base?: string
    redirect_to?: string
    proxy?: string
    registration?: Registration
    access_token?: string
}

export interface Registration {
    id: string
    client_id: string
    client_secret: string
}