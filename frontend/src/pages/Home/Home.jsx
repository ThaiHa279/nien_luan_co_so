import './Home.css'
import { Breadcrumb, Layout, theme,  Button, Card , Space} from 'antd';
import img_url from "../../assets/images/building-supplies-lumber.png";
import Header from '../../components/Header/Header'; 
const {Meta} = Card
const {Content, Footer } = Layout;
const Home = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
            <br />
            <br />
            <Space size={50}>
            <Card
              hoverable
              style={{
                width: 200,
                border:'none',
              }}
              cover={
                <img className='img' src={img_url}/>
              }
            >
              <Meta title="Lumber" style={{ textAlign:'center' }}/>
            </Card>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="link">Link</Button>
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