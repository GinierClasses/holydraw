import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Icon, IconProps, Input, InputGroup, InputProps } from 'rsuite';
import { baseColor, bgColor, paperColor } from '../../styles/colors';

type BigInputProps = InputProps & {
  icon?: IconProps['icon'];
  placeholder?: string;
};

const Ig = styled(InputGroup)({
  height: 48,
  borderWidth: 4,
  borderColor: baseColor,
});

export default function BigInput({ icon, ...props }: BigInputProps) {
  return (
    <InputGroup className="rsuit-input-group__override">
      {icon && (
        <InputGroup.Addon
          className={css({
            backgroundColor: paperColor,
          })}>
          <Icon icon={icon} size="2x" />
        </InputGroup.Addon>
      )}
      <Input
        className={css({
          padding: icon ? '8px 4px' : undefined,
        })}
        {...props}
        size="lg"
      />
    </InputGroup>
  );
}
