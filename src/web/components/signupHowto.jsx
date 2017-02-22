import Col from 'react-bootstrap/lib/Col';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';

import Link from './link';

const SignupHowto = () => (
  <div>
    <h2>Jak na to?</h2>
    <p>
      O přihlášení na workshop na Improtřesku ti pošleme e-mail, takže je dobré vyplnit
      svojí skutečnou e-mailovou adresu. Stejně tak se bude hodit k sledování stavu
      přihlášky, objednání obědů a dalším věcem.
    </p>
    <Row>
      <Col md={6}>
        <h3>Registrace</h3>
        <p>
          Všechny údaje nutně potřebujeme abychom mohli Improtřesk pořádně vyúčtovat. Není
          třeba se bát, neposkytujeme je nikdy třetím stranám. Přihláška s nesprávně
          vyplněnými údaji riskuje vyřazení bez vrácení peněz a za správnost vyplnění
          {' '}
          <Link to="conditions">zodpovídáš ty</Link>.
        </p>
      </Col>
      <Col md={6}>
        <h3>Přihlášení na workshop</h3>
        <p>
          Vybereš si workshop podle nabídky a aktuální obsazenosti. Pokud bude obsazeno,
          nebude se tam dát přihlásit. Může se stát, že přihlásíš a nezaplatíš. Potom tvoje
          místo na workshopu automaticky po nějaké lhůtě nabídneme ostatním. To je důvod
          proč budou počty míst na workshopu skákat nahoru a dolů.
        </p>
      </Col>
      <Col md={6}>
        <h3>Platba a potvrzení e-mailem</h3>
        <p>
          Platbu za přihlášku lze provést buď bankovním převodem a nebo kartou online.
        </p>
        <p>
          Na workshopu nejsi, dokud nedostaneš potvrzovací e-mail. Vznikne-li
          na cestě nějaký problém,
          {' '}
          <Link to="contact">tak se nám ozvi</Link>.
        </p>
      </Col>
      <Col md={6}>
        <h3>Výběr obědů</h3>
        <p>
          Jaké jídlo bude na výběr budeme znát až později po přihlášce, třeba někdy
          v&nbsp;dubnu. Dáme ti vědět e-mailem. Stačí se přihlásit a vybrat.
        </p>
      </Col>
    </Row>
  </div>
);

export default SignupHowto;
