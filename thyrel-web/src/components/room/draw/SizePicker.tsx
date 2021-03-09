import { css } from '@emotion/css';
import Box from 'styles/Box';
import { bgFade, primaryFade } from 'styles/colors';

type SizePickerProps = {
  currentSize: number;
  onSizeChange: (size: number) => void;
};

const buttonSizes = [4, 8, 16, 20, 24, 30];

export default function SizePicker({
  currentSize,
  onSizeChange,
}: SizePickerProps) {
  return (
    <Box
      padding={8}
      gap={8}
      bg="#88006120"
      borderRadius={4}
      borderWidth={1}
      borderColor="#000000"
      alignItems="center"
      boxShadow={`0px 0px 4px ${bgFade(0.8)}`}>
      {buttonSizes.map(size => {
        const isCurrentSize = currentSize === size;
        return (
          <button
            onClick={() => onSizeChange(size)}
            className={css({
              backgroundColor: 'transparent',
              outline: 'none',
              borderRadius: '50%',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              boxShadow: isCurrentSize
                ? `0 0 0 2px ${primaryFade(0.8)}`
                : undefined,
              boxSizing: 'border-box',
            })}>
            <Box
              borderRadius="50%"
              border="2px solid #000000"
              width={40}
              height={40}
              alignItems="center"
              justifyContent="center"
              flexDirection="column">
              <Box
                borderRadius="50%"
                border="1px solid #000000"
                bg="#000000"
                width={size}
                height={size}></Box>
            </Box>
          </button>
        );
      })}
    </Box>
  );
}
