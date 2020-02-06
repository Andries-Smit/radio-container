import { createElement } from "react";

export interface ErrorProps {
    id?: string;
    validation?: string;
}

const Alert = (props: ErrorProps) =>
    props.validation ? (
        <div id={props.id} className={"alert alert-danger mx-validation-message"} role="alert">
            {props.validation}
        </div>
    ) : null;

export { Alert };
