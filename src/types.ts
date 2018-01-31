export interface Config {
    host: string
    api_base?: string
    redirect_to?: string
    proxy?: string
    registration?: Registration
}

export interface Registration {
    id: string
    client_id: string
    client_secret: string
}