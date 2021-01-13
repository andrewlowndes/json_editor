import { JSONType } from "../interfaces/JSONType"

export const valueToString = (value: JSONType): string => {
    switch (typeof value) {
        case 'number': {
            return value.toString();
        }
        case 'string': {
            return value;
        }
        case 'boolean': {
            return value ? 'True': 'False';
        }
        default: {
            if (value === null || value === undefined) {
                return 'None';
            }
            
            if (Array.isArray(value)) {
                return value.map(item => valueToString(item)).join(', ');
            }

            return '(' + Object.keys(value).map((key) => key + ': ' + valueToString(value[key])).join(', ') + ')';
        }
    }
};
