import React from "react";

import Tuner from "../Tuner";

import styles from "./App.module.scss";
import AppState from "components/AppState";

const App = () => {
  return (
    <div className={styles.app}>
      <AppState>
        <Tuner />
      </AppState>
    </div>
  );
};

export default App;
