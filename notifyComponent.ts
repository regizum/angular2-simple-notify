import {Component, OnInit, Input, Output} from 'angular2/core'
import {Router} from 'angular2/router'

import {NotifyService} from "./notifyService";
import {NotifyInterface} from "./notifyInterface";

@Component({
    selector: 'notify',
    template: `
<div [class]="'notify-container ' + _getPosition()">
    <div
        *ngFor="#n of notify"
        [hidden]="!n.active"
        [innerHtml]="n.content"
        class="alert alert-dismissible alert-success">
    </div>
</div>
`
})
export class NotifyComponent implements OnInit {
    constructor(protected _router: Router) {}

    @Input() timeout: number = 3000;
    @Input() position: string = "top right";

    notify: NotifyInterface[];

    ngOnInit() {
        this._router.subscribe(() => this._getNotify());
        NotifyService.timeout = this.timeout;
        this._getNotify();
    }

    protected _getPosition() {
        return this.position.replace(' ', '-');
    }

    protected _getNotify() {
        NotifyService.clearNotify();
        this.notify = NotifyService.getAllNotify();
    }

    protected _getStyle() {
        return {
            top:            (/^top|top$/.test(this.position)) ? '0' : '',
            bottom:         (/^bottom|bottom$/.test(this.position)) ? '0' : '',
            right:          (/^right|right$/.test(this.position)) ? '0' : '',
            left:           (/^left|left$/.test(this.position)) ? '0' : '',
            position:       'fixed',
            width:          '400px',
            'max-width':    '100vw',
            'z-index':      '5100',
        };
    };
}
