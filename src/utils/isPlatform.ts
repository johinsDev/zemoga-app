import { Platform } from 'react-native'

interface IParams {
  platform: 'ios' | 'android'
  isComponent?: React.ReactElement
  notComponent?: React.ReactElement
}

export default ({
  platform,
  isComponent = null,
  notComponent = null,
}: IParams) => {
  if (Platform.OS === platform) {
    return isComponent
  }

  return notComponent
}
