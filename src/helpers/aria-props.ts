export const getValidationAriaProps = (invalid: boolean, id: string) => {
    return invalid
        ? {
              "aria-invalid": true,
              "aria-describedby": `${id}-error`
          }
        : undefined;
};
