type NotificationType = 'error' | 'success'

export class Notification {
    private type: NotificationType
    private message: string;

    constructor(type: NotificationType, message: string) {
        this.type = type;
        this.message = message;
    }

    public getType(): NotificationType {
        return this.type;
    }
    public getMessage(): string {
        return this.message;
    }
}