import React, { Component, PropTypes } from 'react';

import Container from '../../container';
import ChangeWorkshop from '../../participant/changeWorkshop';

export default class ChangeWorkshopPage extends Component {
  componentWillMount() {
    this.props.onMount();
  }

  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const {
      changeWorkshop,
      order,
      onChangeWorkshopChange,
      onChangeWorkshopSubmit,
      workshops,
    } = this.props;

    return (
      <Container>
        <h1>Změna workshopu</h1>
        <p>
          V tuhle chvíli jsi přihlášený na workshopu <b>{order.workshop.name}</b>. Nabízíme ti
          možnost se přehlásit na jiný. Tak se mrkni co je ještě v nabídce. Dostupné jsou
          pouze workshopy které ještě nejsou plné. Pokud ti systém dovolí se přehlásit, je to
          okamžitá záležitost o které ti přijde e-mail.
        </p>
        <hr />
        <h2>Tvůj nový workshop</h2>
        <ChangeWorkshop
          form="changeWorkshop"
          onChange={onChangeWorkshopChange}
          onSubmit={onChangeWorkshopSubmit}
          workshops={workshops}
          {...changeWorkshop}
        />
      </Container>
    );
  }
}

ChangeWorkshopPage.propTypes = {
  changeWorkshop: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  onChangeWorkshopChange: PropTypes.func.isRequired,
  onChangeWorkshopSubmit: PropTypes.func.isRequired,
  onMount: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  workshops: PropTypes.arrayOf(PropTypes.object).isRequired,
};