export type UserInformations = {
    id: string;
    pseudo: string;
    emailAddress: string;
    password: string;
    profilePicture: string;
    role: UserRole;
    characters: string[];
    mainCharacter: string;
    createdAt: Date;
    updatedAt: Date;
}

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    WRITER = "WRITER"
}