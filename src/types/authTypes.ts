export type UserRole = "USER" | "ADMIN" | "WRITER";

export interface AuthUser {
    id: string;
    pseudo: string;
    role: UserRole;
    profilePicture: string;
    characters: string[];
    mainCharacter: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}