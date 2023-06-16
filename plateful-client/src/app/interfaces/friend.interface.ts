import { FriendshipStatus } from "../enums/friendship-status.enum";

export interface Friend {
  friendId: string;
  status: FriendshipStatus
}
