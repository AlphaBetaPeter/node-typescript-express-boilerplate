import { IRoles } from ".";

export interface IOrganization {
	id: string;
	name: string;
	photoURL: string;
	roles: IRoles;
}

export interface IOrganizations {
	[id: string]: IOrganization;
}
