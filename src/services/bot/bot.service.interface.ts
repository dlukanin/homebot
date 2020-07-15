import {Observable} from 'rxjs';
import {Stream} from 'stream';

export interface CommandInterface {
    type: ECommand,
    fromUserId: string | number;
    fromChatId: string | number;
    meta: any;
}

export enum ECommand {
    PHOTO = 'PHOTO',
    VIDEO = 'VIDEO',
    UNKNOWN = 'UNKNOWN',
    NOT_ALLOWED = 'NOT_ALLOWED',
    TIMELAPSE = 'TIMELAPSE',
}

export interface BotServiceInterface {
    commands(): Observable<CommandInterface>;
    message(toUserId: string | number, message: string): Observable<void>;
    photo(toUserId: string | number, buffer: Buffer): Observable<void>;
    video(toUserId: string | number, buffer: Stream): Observable<void>;
}