import type { ChangeEvent } from "react";
import { capitalize } from "../utils";

interface FormInputProps {
    className: string
    labelTxt: string
	name: string;
	type: string;
	onChange: (e: ChangeEvent<HTMLInputElement>, field: string) => void;
	errors: Map<string, Array<string>> | null;
}

function FormInput({ className, labelTxt, name, type, onChange, errors }: FormInputProps) {
	return (
		<>
			<label htmlFor={name}>{capitalize(labelTxt)}</label>
			<input className={className}
				type={type}
				name={name}
				onChange={(e) => onChange(e, name)}
				required
			></input>
            {errors ? <ul className={`form-err-container ${name}-err`}>
                {errors.get(name)?.map(errMsg => <li className="val-err-msg"><img className="val-err-icon" src="/svg/valError.svg" alt="validation error icon" />{errMsg}</li>)}
                </ul> : <></>
            }
		</>
	);
}

export default FormInput;
