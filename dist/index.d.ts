import { Config, Registration } from './types';
export declare module tootjs {
    class Mastodon {
        private config;
        private auth;
        constructor(config: Config);
        registerApp(clientName: string): Promise<Registration>;
        getAuthUrl(): string;
        get(api: string, opts: {
            [key: string]: string;
        }): Promise<object>;
    }
}
