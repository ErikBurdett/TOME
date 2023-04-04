import { FC } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import CombatTracker from './components/CombatTracker';
import PageContainer from './components/PageContainer';
import DayDecider from './components/DayDecider';
import './App.css'

const isAuthenticated = false;

const UnAuthApp: FC = () => {
  return (
    <PageContainer>
      <Routes>
        <Route path="/login" element={<CombatTracker />} />
        <Route path="/day" element={<DayDecider />} />
      </Routes>
    </PageContainer>
  );
};

const App: FC = () => {
  return (
    
    <PageContainer>
      <Routes>
        <Route path="/login" element={<CombatTracker />} />
      </Routes>
    </PageContainer>
  );
};

const WrappedApp: FC = () => {
  return (
    <HashRouter>
      {isAuthenticated ? <App /> : <UnAuthApp />}
    </HashRouter>
  );
};

export default WrappedApp;
