import * as messages from "$paraglide/messages";

export function formatDuration(seconds: number): string {
    if (seconds >= 60 && seconds % 60 === 0) {
        return messages.duration_minutes({ value: seconds / 60 });
    }

    return messages.duration_seconds({ value: seconds });
}