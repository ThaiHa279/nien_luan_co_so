import './Header.css'
import { Breadcrumb, Layout, Menu, theme,  Button, Card , Space} from 'antd';
import img_url from "../../assets/images/building-supplies-lumber.png";
const {Meta} = Card
const {Content, Footer, Header: AntHeader } = Layout;
const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
      <AntHeader>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </AntHeader>
      
  );
};
export default Header;