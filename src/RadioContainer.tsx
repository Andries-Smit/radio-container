import { Component, Fragment, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { ValueStatus } from "mendix";

import { Alert } from "./components/Alert";
import { RadioGroup, Radio } from "./components/RadioGroup";
import { RadioContainerContainerProps } from "../typings/RadioContainerProps";

import "./ui/RadioGroup.css";

class RadioContainer extends Component<RadioContainerContainerProps> {
    onChange = this.onChangeHandler.bind(this);

    onChangeHandler(value: string) {
        if (this.props.attribute.status === ValueStatus.Available && !this.props.attribute.readOnly) {
            const oldValue = this.props.attribute.value;
            this.props.attribute.setValue(value);
            if (oldValue !== value && this.props.onChangeAction && this.props.onChangeAction.canExecute) {
                this.props.onChangeAction.execute();
            }
        }
    }

    render(): ReactNode {
        const { attribute, options, id } = this.props;
        return (
            <Fragment>
                <RadioGroup
                    id={id}
                    value={attribute.value}
                    onChange={this.onChange}
                    hasError={!!attribute.validation}
                >
                    {options.map(option => <Radio value={option.value} label={option.ariaLabel?.value}>{option.content}</Radio>) as any}
                </RadioGroup>
                <Alert id={`${id}-error`} validation={attribute.validation} />
            </Fragment>
        );
    }
}

export default hot(RadioContainer);
