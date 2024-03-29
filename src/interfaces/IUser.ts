export default interface IUser {
    userId?: number;
    userName: string;
    userFirstname: string;
    userLastname: string;
    userEmail: string;
    balancaLeje: number;
    userIsActive: number;
    password?: string;
    userPervojePunes?: any[];
    userCertifikates?: any[];
    userEdukims?: any[];
    userProjekts?: any[];
    userAftesis?: any[];
    userRolis?: any[];
}
