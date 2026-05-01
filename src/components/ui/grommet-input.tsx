import { TextInput, TextInputProps, TextArea, TextAreaProps, FormField, CheckBox, CheckBoxProps, Select, SelectProps } from 'grommet';
import { ComponentProps, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// GInput - Text input with Grommet styling
interface GInputProps extends Omit<TextInputProps, 'size' | 'ref'> {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GInput = ({ className, size = 'md', ...props }: GInputProps) => {
  const sizeStyles = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-11 text-base',
  };

  return (
    <TextInput
      className={cn(
        'flex w-full rounded-lg border border-input bg-background px-3 py-2 ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};
GInput.displayName = 'GInput';

// GTextArea - Multi-line text input
interface GTextAreaProps extends Omit<TextAreaProps, 'ref'> {
  className?: string;
}

const GTextArea = ({ className, ...props }: GTextAreaProps) => {
  return (
    <TextArea
      className={cn(
        'flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
};
GTextArea.displayName = 'GTextArea';

// GCheckBox - Checkbox with Grommet styling
interface GCheckBoxProps extends Omit<CheckBoxProps, 'checked' | 'ref'> {
  className?: string;
  checked?: boolean;
}

const GCheckBox = ({ className, ...props }: GCheckBoxProps) => {
  return (
    <CheckBox
      className={cn(
        'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        className
      )}
      {...props}
    />
  );
};
GCheckBox.displayName = 'GCheckBox';

// GSelect - Dropdown select with Grommet styling
interface GSelectProps extends Omit<SelectProps, 'size' | 'ref'> {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const GSelect = ({ className, size = 'md', ...props }: GSelectProps) => {
  const sizeStyles = {
    sm: 'h-9 text-sm',
    md: 'h-10 text-sm',
    lg: 'h-11 text-base',
  };

  return (
    <Select
      className={cn(
        'flex w-full rounded-lg border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
};
GSelect.displayName = 'GSelect';

// GFormField - Form field wrapper
interface GFormFieldProps extends Omit<ComponentProps<typeof FormField>, 'ref'> {
  className?: string;
}

const GFormField = ({ className, children, ...props }: GFormFieldProps) => {
  return (
    <FormField
      className={cn('space-y-2', className)}
      {...props}
    >
      {children}
    </FormField>
  );
};
GFormField.displayName = 'GFormField';

export { GInput, GTextArea, GCheckBox, GSelect, GFormField };
