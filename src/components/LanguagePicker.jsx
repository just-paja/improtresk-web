import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';

import LinkContainer from './LinkContainer';

const LanguagePicker = ({
  availableLangs,
  className,
  pathName,
  selectedLang,
}) => (
  <UncontrolledDropdown className={className} nav inNavbar>
    <DropdownToggle nav caret>
      <FontAwesome name="language" />
    </DropdownToggle>
    <DropdownMenu>
      {availableLangs.map(lang => (
        <LinkContainer key={lang} lang={lang} to={pathName}>
          <DropdownItem active={lang === selectedLang}>
            {lang}
          </DropdownItem>
        </LinkContainer>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
);

LanguagePicker.propTypes = {
  className: PropTypes.string,
  availableLangs: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLang: PropTypes.string.isRequired,
  pathName: PropTypes.string.isRequired,
};

LanguagePicker.defaultProps = {
  className: null,
};

export default LanguagePicker;
