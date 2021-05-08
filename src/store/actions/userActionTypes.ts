import { FeedCategory, Location } from '../../types';
import { User } from '../types';

export const USER_INIT = 'USER_INIT' as const;
export const USER_TOGGLE_CATEGORIES = 'USER_TOGGLE_CATEGORIES' as const;
export const USER_CHANGE_LOCATION = 'USER_CHANGE_LOCATION' as const;

type UserInit = {
  type: typeof USER_INIT;
  userData: User;
  userCategories: FeedCategory[];
};

type UserToggleCategories = {
  type: typeof USER_TOGGLE_CATEGORIES;
  categoryID: number;
};

type UserChangeLocation = {
  type: typeof USER_CHANGE_LOCATION;
  currentLocation: Location;
};

export type UserDispatch = UserInit | UserToggleCategories | UserChangeLocation;
