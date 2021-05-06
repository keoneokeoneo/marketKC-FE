export const USER_INIT = 'USER_INIT' as const;
export const USER_TOGGLE_CATEGORIES = 'USER_TOGGLE_CATEGORIES' as const;

type UserInit = { type: typeof USER_INIT };

type UserToggleCategories = {
  type: typeof USER_TOGGLE_CATEGORIES;
  categoryID: number;
};

export type UserDispatch = UserInit | UserToggleCategories;
