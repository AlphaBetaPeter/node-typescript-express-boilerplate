import { IRoles } from ".";

export enum IVote {
	POSITIVE = "positive",
	NEGATIVE = "negative",
	NEUTRAL = "neutral"
}

export interface IVotes {
	[userId: string]: IVote;
}

export interface IPoll {
	id: string;
	comments: {
		[commentId: string]: boolean;
	};
	timestamp: number;
	document: string;
	title: string;
	votes: IVotes;
	roles: IRoles;
}

export interface IPolls {
	[id: string]: IPoll;
}
