import { css } from '@emotion/css';
import Box from '../../styles/Box';
import { bgFade } from '../../styles/colors';

type DirectiveLabelProps = {
  directive: string;
  sentence?: string;
};

export default function DirectiveLabel({
  directive,
  sentence,
}: DirectiveLabelProps) {
  return (
    <Box
      width={470}
      padding={8}
      bg="#88006180"
      borderRadius={4}
      alignItems="center"
      flexDirection="column"
      boxShadow={`0px 0px 4px ${bgFade(0.8)}`}>
      <p
        className={css({
          fontFamily: 'Work Sans',
          fontWeight: 'bold',
          fontSize: 16,
          color: '#BDBDBD',
        })}>
        {directive}
      </p>
      {sentence && (
        <p
          className={css({
            fontFamily: 'Work Sans',
            fontWeight: 'bold',
            fontSize: 32,
            color: '#FFFFFF',
            textAlign: 'center',
          })}>
          {sentence}
        </p>
      )}
    </Box>
  );
}
