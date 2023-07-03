export interface PushSubscription {
    endpoint: string;
    expirationTime: DOMHighResTimeStamp,
    keys: {
        p256dh: string;
        auth: string;
    }
}

export interface Settings {
    showEmail: boolean;
    showPhone: boolean;
    pushSubscription: PushSubscription | null;
}