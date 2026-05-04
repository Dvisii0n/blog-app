interface AuthorData {
	username: string;
}

export interface PostData {
	id: string;
	authorId: string;
	author: AuthorData;
	imageURL: string;
	title: string;
	description: string;
	body: string;
	createdAt: string;
	publicationStatus: string;
}
