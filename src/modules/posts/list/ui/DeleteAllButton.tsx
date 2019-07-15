import React from 'react'
import { Icon, Fab, Button, Text, Footer, FooterTab } from 'native-base'
import colors from '../../../../theme/colors'
import isPlatform from '../../../../utils/isPlatform'

interface IDeleteAllButton {
  onPress?: () => void
}

function DeleteAllButton({ onPress }: IDeleteAllButton) {
  const android = (
    <Fab
      active={false}
      direction="up"
      containerStyle={{}}
      style={{ backgroundColor: colors.accent }}
      onPress={onPress}
      position="bottomRight"
    >
      <Icon name="trash" />
    </Fab>
  )

  const ios = (
    <Footer style={{ backgroundColor: colors.transparent }}>
      <FooterTab>
        <Button
          full={true}
          style={{ backgroundColor: colors.accent }}
          onPress={onPress}
        >
          <Text style={{ color: colors.white }}>Delete All</Text>
        </Button>
      </FooterTab>
    </Footer>
  )

  return isPlatform({
    platform: 'ios',
    isComponent: ios,
    notComponent: android,
  })
}
export default DeleteAllButton
