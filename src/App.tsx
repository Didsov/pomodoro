
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Header } from './Componets/Header/Header'
import { Logo } from './Componets/Header/Logo/Logo'
import { Navigation } from './Componets/Header/Navigation/Navigation'
import { StatsLink } from './Componets/Header/Navigation/StatsLink/StatsLink'
import { Layout } from './Componets/Layout/Layout'
import { Main } from './Componets/Main/Main'
import { Stats } from './Componets/Stats/Stats'
//import { SettingsLink } from './Componets/Header/Navigation/SettingsLink/SettingsLink'


function App() {

  return (
    <BrowserRouter>
    <Layout>
      
        <Header>
            <Logo/>
            <Navigation>
               {
               //<SettingsLink/>
              }      
               <StatsLink/>
            </Navigation>
        </Header>
        <Routes>
          <Route path='/pomodoro/' element={<Main/>} />
          <Route path='/pomodoro/stats/' element={<Stats/>}/>
        </Routes>
    </Layout>
    </BrowserRouter>
  )
}

export default App
