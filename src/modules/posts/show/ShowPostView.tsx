import * as React from 'react'
import {
  Container,
  View,
  Button,
  Icon,
  H1,
  Content,
  Text,
  ListItem,
} from 'native-base'
import { Platform } from 'react-native'

import Header from '../../shared/Header'
import { styles, stylesDescription, styleCommentHeader } from './styles'

export default function ShowPostView() {
  const rightComponent = (
    <Button transparent={true}>
      <Icon style={[styles.starIcon]} name={'star-o'} type="FontAwesome" />
    </Button>
  )

  return (
    <Container style={styles.container}>
      <Header back={true} rightComponent={rightComponent} title="Post" />

      <Content>
        <View padder={true}>
          <H1 style={styles['mh-10']}>Description</H1>

          <Text
            style={[
              styles['mh-10'],
              styles.colorGray,
              stylesDescription[Platform.OS],
            ]}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque,
            incidunt necessitatibus. Hic, aliquam consequatur et ab nulla
            officia nam at, a soluta tempora labore maiores incidunt nesciunt!
            A, optio doloribus.
          </Text>

          <H1 style={styles['mh-10']}>User</H1>

          <Text style={[styles['mh-10'], styles.colorGray]}>Name</Text>
          <Text style={[styles['mh-10'], styles.colorGray]}>Email</Text>
          <Text style={[styles['mh-10'], styles.colorGray]}>Phone</Text>
          <Text style={[styles['mh-10'], styles.colorGray]}>Website</Text>
        </View>

        <View style={styles.commentHeader}>
          <Text style={styleCommentHeader[Platform.OS]}>COMMENTS</Text>
        </View>

        <View padder={Platform.OS === 'ios' ? true : false}>
          <ListItem style={styles.commentCard} noIndent={true}>
            <Text style={styles.comment}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              illum sequi tempore ad impedit quaerat? Quae quis sequi sint,
              maiores minus labore et suscipit dicta ad ea voluptatibus
              provident ut.
            </Text>
          </ListItem>
        </View>
      </Content>
    </Container>
  )
}
