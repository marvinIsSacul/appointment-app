import { InputException } from './exceptions'

export type Validator<T> = {
	key: keyof T
	required: boolean
	validator?: (value: any) => boolean
}

/**
 * Validates and makes sure that object is of type T.
 */
export function assemble<T>(object: any, validators: Array<Validator<T>>): T {
	validators.forEach((validator) => {
		const value = object[validator.key]

		if (validator.required) {
			if (value === undefined) {
				throw new InputException(`Error validating value of ${validator.key}, required value not set`)
			}

			if (validator.validator && !validator.validator(value)) {
				throw new InputException(`Error validating value of ${validator.key}, got value: ${value}`)
			}
		}
	})

	return object as T
}
