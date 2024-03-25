import IUser from "./IUser";

export default interface AppStoreState {
    user: any | null;
    userDetailsLoggedIn: IUser | null;
    openSidebar: boolean;
    openSubMenu: boolean;
    setOpenSubMenu: (value: boolean) => void;
    setOpenSidebar: (value: boolean) => void;
    setUserDetailsLoggedIn: (data: any) => void;
    setUser: (data: any) => void;
    unsetUser: () => void;
}
