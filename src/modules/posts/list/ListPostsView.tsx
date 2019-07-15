import * as React from 'react'
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
} from 'native-base'

export default function ListPostsView() {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent={true}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>This is Content Section</Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button full={true}>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  )
}
