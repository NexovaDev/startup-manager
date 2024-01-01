interface ResultObject {
	failed: Boolean,
	error: null | Error
}

interface StatusObject {
	exists: Boolean,
	status: 'ENABLED' | 'DISABLED' | 'UNKNOWN' | null
}

export default function Create(name: string, path: string, args: string[]): ResultObject;
export default function Delete(name: string): ResultObject;
export default function Enable(name: string): ResultObject;
export default function Disable(name: string): ResultObject;
export default function Status(name: string): StatusObject;