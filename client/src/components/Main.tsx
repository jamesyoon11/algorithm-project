import React from "react";
import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import Menu from "./Menu";
import GraphScreen from "./Graph/GraphScreen";
import GraphToolbar from "./Graph/GraphToolbar";
import GraphLegend from "./Graph/GraphLegend";
import SortScreen from "./Sort/SortScreen";
import SortToolbar from "./Sort/SortToolbar";
import TreeScreen from "./Tree/TreeScreen";
import TreeToolbar from "./Tree/TreeToolbar";

import {AlgorithmProvider} from "../contexts/algorithm-context";

class Main extends React.Component {


    // console.log('document heigh = ', $(document).height());
    // const screenWidth = $(document).width() * 0.96;
    // const marginLeft = $(document).width() * 0.01;
    // const screenHeight = $(document).height() * 0.76;
    // const menuHeight = $(document).height() * 0.08;
    // const toolbarHeight = $(document).height() * 0.08;
    // const footerHeight = $(document).height() * 0.02;

        // console.log('document heigh = ', $(document).height());
    screenWidth = $(document).width() * 0.96;
    marginLeft = $(document).width() * 0.01;
    screenHeight = $(document).height() * 0.76;
    menuHeight = $(document).height() * 0.08;
    toolbarHeight = $(document).height() * 0.08;
    footerHeight = $(document).height() * 0.02;

    constructor(props) {
        super(props);
            this.state = {
                global: {
                }
            };
    }

    render() {

    return (
            <AlgorithmProvider value={this.state.global}>
                <HashRouter>
                    <Menu menuHeight={this.menuHeight} />
                    <Switch>
                        <Route path="/sort/:sortAlgorithm" >
                            <SortToolbar toolbarHeight={this.toolbarHeight} />
                            <SortScreen screenWidth={this.screenWidth} screenHeight={this.screenHeight} marginLeft={this.marginLeft}/>
                        </Route>
                        <Route path={"/graph/:graphAlgorithm"} >
                            <GraphToolbar toolbarHeight={this.toolbarHeight} />
                            <GraphScreen screenWidth={this.screenWidth} screenHeight={this.screenHeight - 20} marginLeft={this.marginLeft}/>
                            <GraphLegend graphLegendHeight={20} />
                        </Route>
                        <Route path={"/tree/:treeAlgorithm"} >
                            <TreeToolbar toolbarHeight={this.toolbarHeight} />
                            <TreeScreen treeState={this.state.global} screenWidth={this.screenWidth} screenHeight={this.screenHeight} marginLeft={this.marginLeft}/>
                        </Route>
                        <Redirect to="/sort/bubble" />
                    </Switch>
                    <Footer footerHeight={this.footerHeight} />
                </HashRouter>
            </AlgorithmProvider>
        
    );
}
}

export default Main;