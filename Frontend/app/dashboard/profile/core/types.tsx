export type Avatar = {
	_id: string;
	avatarImageURL: string;
};

export type User = {
	_id?: string;
	username?: string;
	email?: string;
	badges?: string[];
	avatar?: string;
	dateCreated?: string;
	passwordLength: number;
};

export type Sightings = {
	userToken: string;
	petToken: string;
	photos: string[];
	description: string;
	location: string;
	date: string;
};

export type URL = {
	url?: string;
};

export type Badge = {
	_id: string;
	badgeName?: string;
	badgeImageURL?: string;
};

export type Result = {
	success?: string;
	error?: string;
};