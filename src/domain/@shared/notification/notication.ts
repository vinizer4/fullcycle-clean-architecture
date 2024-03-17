export type NoticationError = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NoticationError[] = [];

    addError(error: NoticationError) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }
}