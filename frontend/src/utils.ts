export function formatDate(date: string): string {
	return new Date(date).toLocaleDateString("en-GB");
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

interface ValidationError {
	path: string;
	msg: string;
}

export function groupErrorsByField(
	errors: Array<ValidationError>,
): Map<string, Array<string>> {
	const fields: Set<string> = new Set();
	errors.forEach((err) => fields.add(err.path));
	const groupedErrors: Map<string, Array<string>> = new Map();

	for (let field of fields.entries()) {
		const fieldStr: string = field[0];
		const correspondingErrorsMsgs: Array<string> = errors
			.filter((err) => err.path === field[0])
			.map((err) => capitalize(err.msg));
		groupedErrors.set(fieldStr, correspondingErrorsMsgs);
	}

	return groupedErrors;
}
