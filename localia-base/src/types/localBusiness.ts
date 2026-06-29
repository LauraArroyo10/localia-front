export interface LocalBusiness {
	id: string;
	name: string;
	description: string;
	category: string;

	location: string;
	city?: string;

	latitude: number;
	longitude: number;

	image: string;

	rating: number;

}