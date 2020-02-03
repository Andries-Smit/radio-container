import { Component, ReactNode, createElement } from "react";
import { hot } from "react-hot-loader/root";
import { ValueStatus } from "mendix";

//@ts-ignore
import { RadioGroup, Radio } from "@palmerhq/radio-group";
import { RadioContainerContainerProps } from "../typings/RadioContainerProps";

import "@palmerhq/radio-group/styles.css";

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
        const {attribute, options} = this.props;
        return (
            <RadioGroup value={attribute.value} onChange={this.onChange}>
                {options.map(option => (
                    <Radio value={option.value}>{option.content}</Radio>
                ))}
            </RadioGroup>
        );
    }
}

export default hot(RadioContainer);

