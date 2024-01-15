import { FC } from 'react';
import { ImageStyle, View, ViewProps, ViewStyle } from 'react-native';

import { styles } from '../styles';
import { useThemes } from '../themes';
import { Size, Themeable } from '../types';
import Container from './Container';

export interface Props extends Themeable, ViewProps
{
  size?: Size;
  highlight?: boolean;
}

const Circle: FC<Props> = ({ theme, shade, size, highlight, children, style: propStyle, ...viewProps }) =>
{
  const themes = useThemes(theme, shade);

  const sizePixels = size === 'large' ? 64 : (size === 'small' ? 24 : 48);

  const baseStyle: ImageStyle =
  {
    width: sizePixels,
    height: sizePixels,
    borderRadius: sizePixels / 2
  };

  const containerStyle: ViewStyle =
  {
    ...baseStyle,
    ...styles.centerContent,
    overflow: 'hidden'
  };

  const highlightStyle: ViewStyle =
  {
    ...baseStyle,
    position: 'absolute',
    borderWidth: size === 'small' ? 2 : 4,
    borderColor: themes.current.bright
  };

  const viewStyle = (propStyle ?? {}) as ViewStyle;

  return (
    <Container theme={theme} shade={shade} {...viewProps} style={{ ...containerStyle, ...viewStyle }}>
      {children}
      {highlight && <View style={highlightStyle} />}
    </Container>
  );
};

export default Circle;