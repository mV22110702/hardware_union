import React from 'react';
import {Content} from "../content/content";
import {Layout as AntLayout} from "antd";
import {Header} from "../header/header";
import {Footer} from "../footer/footer";
import {RouterOutlet} from "../router/router";
import '~/assets/css/scaffolding.scss';

function App() {
    return (
        <AntLayout>
            <Header/>
            <Content>
                <RouterOutlet/>
            </Content>
            <Footer/>
        </AntLayout>
    );
}

export {App};
