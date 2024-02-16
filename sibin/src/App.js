
import Assignment from "./main";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";

        
function App() {
  // return (
  //  <>
  //   <Assignment/>
  //  </>
  // );

  return (
    <PrimeReactProvider>
        <Assignment  />
    </PrimeReactProvider>
);
}

export default App;
