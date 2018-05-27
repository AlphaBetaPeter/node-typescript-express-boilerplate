export enum IRole {
	OWNER = "owner",
	ADMIN = "admin"
}

export interface IRoles {
	[userId: string]: IRole;
}
