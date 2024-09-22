export type Avatar = {
	_id: string;
	avatarImageURL: string;
};

export type User = {
	_id?: string;
	username?: string;
	email?: string;
	password?: string;
	badges?: string[];
	avatar?: string;
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
