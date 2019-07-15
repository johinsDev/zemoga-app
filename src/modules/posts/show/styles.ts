import { Platform, StyleSheet } from 'react-native'
import colors from '../../../theme/colors'

export const styles = StyleSheet.create({
  container: { backgroundColor: colors.background },
  commentHeader: {
    width: '100%',
    paddingVertical: Platform.OS === 'ios' ? 5 : 2,
    paddingHorizontal: 12,
    backgroundColor: colors.darkBackground,
  },
  commentCard: {
    borderColor: colors.darkBackground,
    paddingLeft: Platform.OS === 'ios' ? 0 : 15,
    paddingRight: Platform.OS === 'ios' ? 0 : 15,
    borderBottomWidth: 2,
  },
  comment: {
    color: colors.gray,
    textAlign: 'justify',
  },
  colorGray: {
    color: colors.gray,
  },
  'mh-10': {
    marginVertical: 10,
  },
  starIcon: {
    fontSize: 29,
    color: colors.white,
  },
  isFavorite: {
    color: colors.yellow,
  },
})

export const styleCommentHeader = StyleSheet.create({
  ios: {
    color: 'black',
  },
  android: {
    color: colors.gray,
  },
})

export const stylesDescription = StyleSheet.create({
  ios: {
    lineHeight: 20,
    textAlign: 'justify',
  },
  android: {
    lineHeight: 30,
    textAlign: 'justify',
  },
})
