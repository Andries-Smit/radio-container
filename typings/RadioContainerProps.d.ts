/**
 * This file was generated from RadioContainer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { ActionPreview } from "@mendix/pluggable-widgets-typing-generator/dist/typings";
import { ActionValue, DynamicValue, EditableValue } from "mendix";

interface CommonProps {
    name: string;
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface OptionsType {
    value: string;
    content: ReactNode;
    ariaLabel?: DynamicValue<string>;
}

export interface OptionsPreviewType {
    value: string;
    content: ReactNode;
    ariaLabel?: string;
}

export interface OptionsVisibilityType {
    value: boolean;
    content: boolean;
    ariaLabel: boolean;
}

export interface RadioContainerContainerProps extends CommonProps {
    options: OptionsType[];
    attribute: EditableValue<string>;
    onChangeAction?: ActionValue;
}

export interface RadioContainerPreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;
    options: OptionsPreviewType[];
    attribute: string;
    onChangeAction?: ActionPreview;
}

export interface VisibilityMap {
    options: OptionsVisibilityType[] | boolean;
    attribute: boolean;
    onChangeAction: boolean;
}
