import './Home.css'
import { useEffect } from "react";
import { Breadcrumb, Layout, theme, Card , Space, Image, Typography} from 'antd';
import Header from '../../components/Header/Header'; 
import {NavLink } from "react-router-dom";
import { getTypeItems } from '../../redux/apiRequest';
import { useDispatch, useSelector } from "react-redux";

const {Meta} = Card
const {Content, Footer } = Layout;
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();

  useEffect(()=> {
    getTypeItems(dispatch);   
  }, [])
  
  const type_items =  useSelector((state) => state.materials?.items.typeItems);
  
  return (
    <Layout className="layout">
      <Header>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
            <br />
            <Image width={1350} src={require('../../assets/images/home.jpg')}></Image>
            <br />
            <br />
            <Space className='wrap_item' size={[7, 16]} wrap
              style={{marginTop:30}}
            >
              {
                type_items?.map((type) => {
                  const img_url = require(`../../assets/images/type/${type.name}.jpg`);
                  return (
                    <NavLink to='/item' state={{id: type.id}}>
                      <Card
                        style={{
                          width: 200,
                          border:'none',
                        }}
                        cover={
                          <img className='img' src={img_url}/>
                        }
                      >
                        <Meta title={type.name} style={{ textAlign:'center' }}/>
                      </Card>
                    </NavLink>
                  )
                })
              }
              
            </Space>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};
export default Home;