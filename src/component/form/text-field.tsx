import React, { ReactElement } from 'react';
import { TextField as TF } from '@radix-ui/themes';
export interface TextFieldProps extends TF.RootProps {
  icon?: ReactElement;
  button?: ReactElement;
}
export function TextField({ icon, button, ...props }: TextFieldProps) {
  return (
    <TF.Root {...props}>
      {icon && <TF.Slot>{icon}</TF.Slot>}
      {button && <TF.Slot>{button}</TF.Slot>}
    </TF.Root>
  );
}
