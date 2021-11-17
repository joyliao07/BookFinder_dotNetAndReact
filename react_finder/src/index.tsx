import ReactDOM from 'react-dom';
import './layout/styles.css';
import 'semantic-ui-css/semantic.min.css';
import App from './layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './stores/store';
import { BrowserRouter } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
    <StoreContext.Provider value={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
