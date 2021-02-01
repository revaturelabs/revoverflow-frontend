import React from 'react';
import './App.css';
import { MainComponent } from './components/main.component';
import { store } from './store';
import { Provider } from 'react-redux';
import { RichTextBoxComponent } from './components/rich-text-box-component';
import { AddFAQComponent } from './components/pages/faq-components/add-faq-component';


function App() {
  return (
    <div className="App">
      <AddFAQComponent></AddFAQComponent>
        <Provider store={store}>
          <MainComponent />
        </Provider>
    </div>
  );
}

export default App;
