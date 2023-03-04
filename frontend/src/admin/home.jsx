import '../assets/styles/seller_page.css'
import React, { Component, useEffect } from 'react';
import { Layout, Tabs , } from 'antd';
import { ExportOutlined, BarChartOutlined, ImportOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Example} from './export';
import {ImportComponet} from './import';
import Statistic from './statistic';

import { getAllItems } from "../redux/apiRequest";


export const HomePageAdmin = () => {

const {Header, Content, Footer} = Layout;
const user = useSelector((state) => state.auth.login?.currentUser);

const dispatch = useDispatch();
const navigate = useNavigate();
useEffect(()=> {
    if (!user) {
        navigate("/sign-in");
    } 
    if (user?.accessToken) {
        getAllItems(dispatch);
    }
}, [])


    return (
        <Layout>
            <Header
                style={{
                    background: '#b5f5ec',
                }}
            >
               This is header
            </Header>
            <Content>
                <Tabs
                    defaultActiveKey="1"
                    items={[BarChartOutlined , ExportOutlined, ImportOutlined].map((Icon, i) => {
                        const lable = ['Thống kê', 'Xuất hàng', 'Nhập hàng']
                        return {
                            label: (
                            <span>
                                {lable[i]}
                            </span>
                            ),
                            key: i+1,
                            children: [<Statistic/>,<Example/>,<ImportComponet/>][i]
                            
                        };
                    })}
                />
            </Content>
            <Footer></Footer>
        </Layout>
    )
  }