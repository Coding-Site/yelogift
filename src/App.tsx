import { Provider } from "react-redux";
import NonAdminLayout from "./Layouts/NonAdminLayout";
import {store} from './store/index'
function App() {
    return (
        <div className="bg-mainBlack text-mainWhite  dark:bg-white dark:text-mainLightBlack ">
            <Provider store={store}>
                <NonAdminLayout />
            </Provider>
        </div>
    );
}

export default App;
