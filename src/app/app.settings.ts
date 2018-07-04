import { environment } from '../environments/environment';
export class AppSettings {
    public static get API_ENDPOINT(): string {
        return environment.API;
    }

    public static get WEBSOCKET_ENDPOINT(): string {
        return environment.WEBSOCKET;
     }
}
