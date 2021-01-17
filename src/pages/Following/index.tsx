import React from 'react';
import { View, FlatList } from 'react-native';

import Header from '../../components/Header';
import Heading from '../../components/Heading';
import Title from '../../components/Title';
import CategoryList from '../../components/CategoryList';
import StreamList from '../../components/StreamList';
import ChannelList from '../../components/ChannelList';

import { Container, Wrapper, Main } from './styles';

interface Item{ 
  key: string;
  render: () => JSX.Element;
  isTitle?: boolean;
}

const Following: React.FC = () => {
  //usememo pra fazer calculo assim q a pagina inicia, carregar
  //os conteudos, organizados, pra isso, fazer um map dos itens
  const { data, indices } = React.useMemo(()=> {
    const items: Item[] = [
      //chamada de renderização do item vai ser um elemento react
      //especificar se é um titulo ou se é um card.
      {
        key: 'PAGE_HEADING',
        render: () => <Heading>Following</Heading>,
      },

      {
        key: 'FOLLOWED_CATEGORIES',
        render: () => <Title>Followed Categories</Title>,
        isTitle: true,
      },
      { key: 'C1', render: () => <CategoryList/> },

      {
        key: 'LIVE CHANNELS',
        render: () => <Title>Live Channels</Title>,
        isTitle: true,
      },
      { key: 'C2', render: () => <StreamList/> },

      {
        key: 'CONTINUE_WATCHING',
        render: () => <Title>Continue Watching</Title>,
        isTitle: true,
      },
      { key: 'C3', render: () => <StreamList/> },

      {
        key: 'OFFLINE_CHANNELS',
        render: () => <Title>Offline Channels</Title>,
        isTitle: true,
      },
      { key: 'C4', render: () => <ChannelList/> },
    ];

    //dps criar array de indices, pra dizer se é titulo ou conteúdo
    //pra isso, tem essa logica verificando se é titulo ou n, se for, anota o
    //index dele pra dentro do array vazio
    const indices: number [] = [];

    items.forEach((item, index) => item.isTitle && indices.push(index))

    return{
      data: items,
      indices,
    }

  },[]);
  return (
   <Wrapper>
      <Container>
        <Header/>
        
        <Main>
          <FlatList<Item>
            data={data}
            renderItem={({ item }) => item.render()}
            keyExtractor={item => item.key}
            stickyHeaderIndices={indices}
            //efeito de refresh qd recarrega
            onRefresh={() => {}}
            refreshing={false}
          />
        </Main>

      </Container>
   </Wrapper>
  );
};

export default Following;

//flatlist é uma coluna, de cima pra baixo, e ela recebe dados, ele requer
//um parâmetro de item, que é uma lista daqueles items q foram criados


