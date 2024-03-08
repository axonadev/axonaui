import React from "react";
import { useEnv, useToken } from "axonalib";
import { CssStruct, LoadingSpinner } from "./lib/index";
import Layout from "./Layout/Layout";

const App = () => {
  const { REACT_APP_CSSFOLDER, REACT_APP_SERVERAPI } = useEnv();

  localStorage.setItem(
    "axn_token",
    "n_p_QUhki_p_9Py_s_dgCg7fV7GX39d2M4uFsxlYj4pLC5kEH437FAtCSXQypHtJG6SW6cKVo1Dqd_s_iNJnu6Km34gqzz9MHgdaZRrDsLjLBzOSbhoJpQEvJCsdfAQxJtsJISoiF0wAV_p_LWzaL8uxP7jakt6w=="
  );
  localStorage.setItem("axn_piva", "02710430188");
  localStorage.setItem(
    "axn_exptime",
    "Fri Nov 10 2123 15:00:39 GMT+0100 (Ora standard dell’Europa centrale)"
  );
  localStorage.setItem(
    "axn_v_moduli",
    '[{"Moduli_Nome":"Soggetti","Moduli_IndirizzoModulo":"soggetti","Moduli_Ambito":1,"Moduli_Pos":1,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"soggetti","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Articoli","Moduli_IndirizzoModulo":"articoli","Moduli_Ambito":1,"Moduli_Pos":2,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"articoli","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Iva","Moduli_IndirizzoModulo":"iva","Moduli_Ambito":1,"Moduli_Pos":3,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"iva","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Magazzini","Moduli_IndirizzoModulo":"magazzini","Moduli_Ambito":1,"Moduli_Pos":4,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"magazzini","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Pagamenti","Moduli_IndirizzoModulo":"pagamenti","Moduli_Ambito":1,"Moduli_Pos":5,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"pagamenti","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Categorie","Moduli_IndirizzoModulo":"categorie","Moduli_Ambito":1,"Moduli_Pos":6,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"categorie","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Unità di misura","Moduli_IndirizzoModulo":"unitamisura","Moduli_Ambito":1,"Moduli_Pos":7,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"unitamisura","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Marche","Moduli_IndirizzoModulo":"marche","Moduli_Ambito":1,"Moduli_Pos":8,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"marche","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Causali Fatture","Moduli_IndirizzoModulo":"causalifte","Moduli_Ambito":1,"Moduli_Pos":9,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"causali","Ambito_Nome":"Anagrafica","Ambito_Icona":"anagrafica"},{"Moduli_Nome":"Fatture","Moduli_IndirizzoModulo":"fattureemesse","Moduli_Ambito":2,"Moduli_Pos":1,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"fatture","Ambito_Nome":"Gestione","Ambito_Icona":"gestione"},{"Moduli_Nome":"Movimenti","Moduli_IndirizzoModulo":"movimenti","Moduli_Ambito":2,"Moduli_Pos":2,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"movimenti","Ambito_Nome":"Gestione","Ambito_Icona":"gestione"},{"Moduli_Nome":"Preventivi","Moduli_IndirizzoModulo":"documenti?tp=PR","Moduli_Ambito":2,"Moduli_Pos":3,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"fatture","Ambito_Nome":"Gestione","Ambito_Icona":"gestione"},{"Moduli_Nome":"DDT","Moduli_IndirizzoModulo":"documenti?tp=DT","Moduli_Ambito":2,"Moduli_Pos":4,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"fatture","Ambito_Nome":"Gestione","Ambito_Icona":"gestione"},{"Moduli_Nome":"Fatture acquisto","Moduli_IndirizzoModulo":"documenti?tp=FF","Moduli_Ambito":2,"Moduli_Pos":5,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"fatture","Ambito_Nome":"Gestione","Ambito_Icona":"gestione"},{"Moduli_Nome":"Ordini Cliente","Moduli_IndirizzoModulo":"documenti?tp=OC","Moduli_Ambito":3,"Moduli_Pos":1,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"fatture","Ambito_Nome":"Ordini","Ambito_Icona":"ordini"},{"Moduli_Nome":"Conferme","Moduli_IndirizzoModulo":"conferme","Moduli_Ambito":3,"Moduli_Pos":2,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"conferme","Ambito_Nome":"Ordini","Ambito_Icona":"ordini"},{"Moduli_Nome":"Produzione","Moduli_IndirizzoModulo":"produzione","Moduli_Ambito":3,"Moduli_Pos":3,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"produzione","Ambito_Nome":"Ordini","Ambito_Icona":"ordini"},{"Moduli_Nome":"Spedizioni","Moduli_IndirizzoModulo":"spedizioni","Moduli_Ambito":3,"Moduli_Pos":4,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"spedizioni","Ambito_Nome":"Ordini","Ambito_Icona":"ordini"},{"Moduli_Nome":"Ordini Fornitore","Moduli_IndirizzoModulo":"documenti?tp=OF","Moduli_Ambito":3,"Moduli_Pos":5,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"fatture","Ambito_Nome":"Ordini","Ambito_Icona":"ordini"},{"Moduli_Nome":"Piano Conti","Moduli_IndirizzoModulo":"pianoconti","Moduli_Ambito":4,"Moduli_Pos":1,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"pianoconti","Ambito_Nome":"Contabilita","Ambito_Icona":"contabilita"},{"Moduli_Nome":"Causali Contabili","Moduli_IndirizzoModulo":"causalicontabili","Moduli_Ambito":4,"Moduli_Pos":2,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"causali","Ambito_Nome":"Contabilita","Ambito_Icona":"contabilita"},{"Moduli_Nome":"Prima Nota","Moduli_IndirizzoModulo":"primanota","Moduli_Ambito":4,"Moduli_Pos":3,"Moduli_Pacchetto":2,"AZIENDA":"00000000000","Moduli_Icona":"primanota","Ambito_Nome":"Contabilita","Ambito_Icona":"contabilita"}]'
  );

  localStorage.setItem("axn_pathimg", "http://192.168.2.159:8011/img");

  const { connesso } = useToken(
    REACT_APP_SERVERAPI + "api/axo_login",
    localStorage.getItem("axn_token")
  );

  return (
    <CssStruct
      url={REACT_APP_CSSFOLDER}
      piva={localStorage.getItem("axn_piva")}
      template={"template1"}
    >
      <div className='App'>
        {connesso === 0 && <LoadingSpinner />}
        {connesso === 1 && <Layout piva={localStorage.getItem("axn_piva")} />}
      </div>
    </CssStruct>
  );
};

export default App;
