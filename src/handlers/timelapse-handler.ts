import {HandlerInterface} from './handler.interface';
import {BotServiceInterface, CommandInterface} from '../services/bot/bot.service.interface';
import {Raspistill} from 'node-raspistill';
import {from} from 'rxjs';

export class TimelapseHandler implements HandlerInterface {
    protected readonly _raspistill = new Raspistill({
        encoding: 'jpg',
        noFileSave: true,
        noPreview: true,
    })
    protected readonly _timelapseInterval: number = 5000;
    protected readonly _timelapseDuration: number = 45000;

    constructor(
        protected readonly _command: CommandInterface,
        protected readonly _botService: BotServiceInterface
    ) {
    }

    public handle(): void {
        this._botService.message(this._command.fromChatId, 'Ок. Поехали!')
            .subscribe(() => {}, (err) => console.error(err));

        from(this._raspistill.timelapse(this._timelapseInterval, this._timelapseDuration, (buf) => {

            this._botService.photo(this._command.fromChatId, buf)
                .subscribe(() => {}, (err) => console.error(err));
        }))
            .subscribe(() => {}, (err) => console.error(err));
    }
}