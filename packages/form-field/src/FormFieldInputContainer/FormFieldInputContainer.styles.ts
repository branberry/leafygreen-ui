import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  Size,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';
import { FormFieldContextProps } from '../FormFieldContext';

export const inputElementClassName = createUniqueClassName('form-field-input');
export const iconClassName = createUniqueClassName('form-field-icon');
const autofillShadowOverride = (color: string) => `0 0 0 100px ${color} inset`;

export const inputWrapperBaseStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[1]}px;
  font-size: inherit;
  line-height: inherit;
  font-family: ${fontFamilies.default};
  width: 100%;
  height: 36px;
  font-weight: ${fontWeights.regular};
  border: 1px solid;
  z-index: 1;
  outline: none;
  border-radius: 6px;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
  z-index: 0;

  & .${inputElementClassName} {
    font-family: ${fontFamilies.default};
    color: inherit;
    background-color: inherit;
    font-size: inherit;
    line-height: inherit;
    outline: none;
    border: none;
  }

  & .${iconClassName} svg,
  & svg {
    min-height: 16px;
    min-width: 16px;
  }
`;

export const inputWrapperModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.primary.default};
    background: ${color.light.background.primary.default};
    border: 1px solid ${color.light.border.primary.default};

    &:hover,
    &:active {
      &:not(:focus) {
        box-shadow: ${hoverRing.light.gray};
      }
    }

    & .${inputElementClassName} {
      &:-webkit-autofill {
        color: ${color.light.text.primary.default};
        background: ${color.light.background.primary.default};
        border: 1px solid ${color.light.border.primary.default};

        -webkit-text-fill-color: ${color.light.text.primary.default};
        box-shadow: ${autofillShadowOverride(palette.white)};

        &:focus {
          box-shadow: ${autofillShadowOverride(palette.white)},
            ${focusRing.light.input};
          border-color: ${palette.white};
        }

        &:hover:not(:focus) {
          box-shadow: ${autofillShadowOverride(palette.white)},
            ${hoverRing.light.gray};
        }
      }

      &::placeholder {
        color: ${palette.gray.base};
        font-weight: ${fontWeights.regular};
      }
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light3};
    background-color: ${color.dark.background.secondary.default};
    border: 1px solid ${color.dark.border.primary.default};

    &:hover,
    &:active {
      &:not(:focus) {
        box-shadow: ${hoverRing.dark.gray};
      }
    }

    & .${inputElementClassName} {
      &:-webkit-autofill {
        border: 1px solid ${color.dark.border.primary.default};
        color: ${palette.gray.light3};
        background: ${color.dark.background.secondary.default};
        -webkit-text-fill-color: ${palette.gray.light3};
        box-shadow: ${autofillShadowOverride(palette.gray.dark4)};

        &:focus {
          box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
            ${focusRing.dark.input};
          border-color: ${color.dark.border.primary.focus};
        }

        &:hover:not(:focus) {
          box-shadow: ${autofillShadowOverride(palette.gray.dark4)},
            ${hoverRing.dark.gray};
        }
      }

      &::placeholder {
        color: ${palette.gray
          .dark1}; // note this is the same color as our disabled token, probably a mistake?
        font-weight: ${fontWeights.regular};
      }
    }
  `,
};

const focusSelector = (styles: string) => css`
  @supports selector(:has(a, b)) {
    &:focus-within:not(:has(.${iconClassName}:focus)) {
      ${styles}
    }
  }

  /* Fallback for when "has" is unsupported */
  @supports not selector(:has(a, b)) {
    &:focus-within {
      ${styles}
    }
  }
`;

export const inputWrapperFocusStyles: Record<Theme, string> = {
  [Theme.Light]: focusSelector(`
     {
      box-shadow: ${focusRing.light.input};
      border-color: ${palette.white};
    }
  `),
  [Theme.Dark]: focusSelector(`
     {
      box-shadow: ${focusRing.dark.input};
      border-color: ${palette.gray.dark4};
    }
  `),
};

/** Selector that is true if the icon element passed in is a button */
const iconIsButtonSelector = `&:has(button.${iconClassName})`;

export const inputWrapperSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    height: 22px;
    padding-inline: ${spacing[200]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[100]}px;
    }
  `,
  [Size.Small]: css`
    height: 28px;
    padding-inline: ${spacing[200]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[100]}px;
    }
  `,
  [Size.Default]: css`
    height: 36px;
    padding-inline: ${spacing[300]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[150]}px;
    }
  `,
  [Size.Large]: css`
    height: 48px;
    padding-inline: ${spacing[300]}px;

    ${iconIsButtonSelector} {
      padding-inline-end: ${spacing[200]}px;
    }
  `,
};

export const inputWrapperStateStyles: Record<
  FormFieldState,
  Record<Theme, string>
> = {
  [FormFieldState.Error]: {
    [Theme.Light]: css`
      border-color: ${color.light.border.error.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing.light.red};
        }
      }
    `,
    [Theme.Dark]: css`
      border-color: ${color.dark.border.error.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing.dark.red};
        }
      }
    `,
  },
  [FormFieldState.None]: {
    [Theme.Light]: css``,
    [Theme.Dark]: css``,
  },
  [FormFieldState.Valid]: {
    [Theme.Light]: css`
      border-color: ${color.light.border.success.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing.light.green};
        }
      }
    `,
    [Theme.Dark]: css`
      border-color: ${color.dark.border.success.default};

      &:hover,
      &:active {
        &:not(:focus) {
          box-shadow: ${hoverRing.dark.green};
        }
      }
    `,
  },
};

export const inputWrapperDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    background-color: ${color.light.background.disabled.default};
    border-color: ${color.light.border.disabled.default};

    &:hover,
    &:active {
      &:not(:focus) {
        box-shadow: inherit;
      }
    }

    & .${inputElementClassName} {
      cursor: not-allowed;
      pointer-events: none;
      color: ${color.light.text.disabled.default};

      &::placeholder {
        color: inherit;
      }

      &:-webkit-autofill {
        &,
        &:hover,
        &:focus {
          appearance: none;
          border: 1px solid ${color.light.border.primary.default};
          color: ${color.light.text.disabled.default};
          box-shadow: ${autofillShadowOverride(palette.gray.light2)};
        }

        &:hover:not(:focus) {
          box-shadow: inherit;
        }
      }
    }
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark3};
    border-color: ${color.dark.border.disabled.default};

    &:hover,
    &:active {
      &:not(:focus) {
        box-shadow: inherit;
      }
    }

    & .${inputElementClassName} {
      cursor: not-allowed;
      pointer-events: none;
      color: ${palette.gray.dark2};

      &:-webkit-autofill {
        &,
        &:hover,
        &:focus {
          appearance: none;
          border: 1px solid ${palette.gray.dark1};
          -webkit-text-fill-color: ${color.dark.text.disabled.focus};
          box-shadow: ${autofillShadowOverride(palette.gray.dark2)};
        }

        &:hover:not(:focus) {
          box-shadow: inherit;
        }
      }

      &::placeholder {
        color: inherit;
      }
    }
  `,
};

export function getInputWrapperStyles({
  disabled,
  size: sizeProp,
  state,
  theme,
}: Required<
  Pick<FormFieldContextProps, 'disabled' | 'size' | 'state'> & { theme: Theme }
>) {
  return cx(
    inputWrapperBaseStyles,
    inputWrapperModeStyles[theme],
    inputWrapperSizeStyles[sizeProp],
    {
      [cx(
        inputWrapperModeStyles[theme],
        inputWrapperStateStyles[state][theme],
        inputWrapperFocusStyles[theme],
      )]: !disabled,
      [inputWrapperDisabledStyles[theme]]: disabled,
    },
  );
}

export const childrenWrapperStyles = css`
  width: 100%;
`;

export const additionalChildrenWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const iconDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
};

export const iconStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.icon.secondary.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.icon.secondary.default};
  `,
};

export const optionalTextBaseStyle = css`
  font-size: 12px;
  line-height: 12px;
  font-style: italic;
  font-weight: ${fontWeights.regular};
  display: flex;
  align-items: center;
  > p {
    margin: 0;
  }
`;

export const optionalTextThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.secondary.default};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};
