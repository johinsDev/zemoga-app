import * as React from 'react'
import {
  Header as HeaderNV,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  NativeBase,
  Text,
} from 'native-base'
import { StyleSheet, Platform } from 'react-native'
import { withNavigation, NavigationScreenProps } from 'react-navigation'
import colors from '../../theme/colors'
import isPlatform from '../../utils/isPlatform'

interface IHeaderProps extends NavigationScreenProps {
  title: string
  leftComponent?: React.ReactElement
  rightComponent?: React.ReactElement
  back?: boolean
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
  },
  title: {
    color: colors.white,
  },
})

function Header({
  title,
  leftComponent,
  rightComponent,
  navigation,
  back,
  ...rest
}: IHeaderProps & NativeBase.Header) {
  return (
    <HeaderNV
      style={styles.header}
      androidStatusBarColor={colors.darkPrimary}
      iosBarStyle="light-content"
      noLeft={!leftComponent && !back}
      {...rest}
    >
      <Left style={{ flex: 1 }}>
        {leftComponent}

        {!back &&
          isPlatform({
            platform: 'android',
            isComponent: <Title style={styles.title}>{title}</Title>,
          })}

        {back && (
          <Button transparent={true} onPress={() => navigation.goBack(null)}>
            <Icon name="arrow-back" style={{ color: colors.white }} />
          </Button>
        )}
      </Left>

      <Body>
        {isPlatform({
          platform: 'ios',
          isComponent: <Title style={styles.title}>{title}</Title>,
        })}
      </Body>
      <Right>{rightComponent}</Right>
    </HeaderNV>
  )
}

export default withNavigation(Header)
