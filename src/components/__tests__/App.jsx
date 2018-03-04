import React from 'react';

import { shallow } from 'enzyme';

import App from '../App';

describe('App component', () => {
  it('renders loader when loading', () => {
    const comp = shallow(
      <App
        lang="cs"
        progress={{ loading: true, valid: true }}
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );
    expect(comp.find('AppLoader')).toHaveLength(1);
  });

  it('renders footer', () => {
    const comp = shallow(
      <App
        lang="cs"
        progress={{ valid: true }}
        activeRequests={5}
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );
    expect(comp.find('Footer')).toHaveLength(1);
  });

  it('renders app errors', () => {
    const comp = shallow(
      <App
        lang="cs"
        progress={{ valid: true }}
        activeRequests={5}
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );
    expect(comp.find('AppErrors')).toHaveLength(1);
  });

  it('renders navigation', () => {
    const comp = shallow(
      <App
        lang="cs"
        progress={{ valid: true }}
        activeRequests={5}
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );
    expect(comp.find('Navigation')).toHaveLength(1);
  });

  it('renders app helmet', () => {
    const comp = shallow(
      <App
        lang="cs"
        progress={{ valid: true }}
        activeRequests={5}
        host="http://foo"
        onMount={() => {}}
        currentYear={{ year: '2016', topic: 'Kůže' }}
        errors={[]}
        location={{ pathname: '/' }}
        years={[
          { year: '2016', topic: 'Ovce' },
        ]}
      />
    );
    expect(comp.find('AppHelmet')).toHaveLength(1);
  });
});
