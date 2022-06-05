import React from "react";
import { createStore } from "redux";
import movieApp from "./reducers/reducers";
import { Provider } from "react-redux";
import MainView from "./components/main-view/main-view";


function App (){
    const myFlixStore = createStore (movieApp)

    return (
        <Provider store={myFlixStore}>
            <MainView />



        </Provider>

    )
}
export default App;