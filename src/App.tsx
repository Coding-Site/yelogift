import { Provider } from 'react-redux';
import NonAdminLayout from './Layouts/NonAdminLayout';
import { store } from './store/index';
import { HelmetProvider } from 'react-helmet-async';

function App() {
    return (
        <div className="bg-mainBlack text-mainWhite  dark:bg-white dark:text-mainLightBlack ">
            <Provider store={store}>
                <HelmetProvider>
                    <NonAdminLayout />
                </HelmetProvider>
            </Provider>
        </div>
    );
}

export default App;
