import { NotificationType } from "../enums/notification-types.enum";
import { UserPublicInfo } from "./user.interface";

interface FriendRequestNotificationDetail {
    acceptAction: string;
    requestor: UserPublicInfo;
}

interface ExpiryNotificationDetail {
    productId: string;
    expiryDate: Date;
}

interface GenericNotificationDetail {
    text: string;
}

type NotificationDetail<T extends NotificationType> = 
    T extends NotificationType.FRIEND_REQUEST ? FriendRequestNotificationDetail :
    T extends NotificationType.EXPIRY ? ExpiryNotificationDetail :
    T extends NotificationType.GENERIC ? GenericNotificationDetail :
    never;

export interface Notification<T extends NotificationType> {
    id: string;
    type: T;
    deleteAction: string;
    date: Date;
    detail: NotificationDetail<T>;
}