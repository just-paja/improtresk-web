import Col from 'react-bootstrap/lib/Col';
import Markdown from 'react-markdown';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Button from '../../../../src/web/components/button';
import ImageHeader from '../../../../src/web/components/imageHeader';
import LinkServiceList from '../../../../src/web/components/linkServiceList';
import SurveyAnswer from '../../../../src/web/components/survey/answer';

describe('SurveyAnswer component', () => {
  it('renders', () => {
    expect(shallow(
      <SurveyAnswer
        id={132}
        description="Answer description"
        image="http://example.com/image.png"
        links={[
          {
            address: 'http://example.com',
            service: 'web',
            name: 'Example link',
          },
        ]}
        onVote={() => {}}
        text="Answer text"
        votes={13}
        votesTotal={53}
      />
    ).node).to.eql(
      <li className="list-group-item">
        <Row>
          <Col sm={3} className="answer-imageContainer">
            <ImageHeader
              className="answer-image"
              cover
              image="http://example.com/image.png"
            />
          </Col>
          <Col sm={6}>
            <h4 className="list-group-item-heading">
              Answer text
            </h4>
            <LinkServiceList
              inline
              links={[
                {
                  address: 'http://example.com',
                  service: 'web',
                  name: 'Example link',
                },
              ]}
            />
            <div>Pro: 13/53</div>
          </Col>
          <Col sm={3}>
            <Button
              bsSize="small"
              className="pull-right"
              disabled={false}
              title={null}
              icon="thumbs-up"
              onClick={() => {}}
            >Hlasovat</Button>
          </Col>
        </Row>
        <div>
          <hr />
          <Markdown source="Answer description" />
        </div>
      </li>
    );
  });
  it('renders as disabled', () => {
    expect(shallow(
      <SurveyAnswer
        disabled
        id={132}
        onVote={() => {}}
        text="Answer text"
        votes={13}
        votesTotal={53}
      />
    ).node).to.eql(
      <li className="list-group-item">
        <Row>
          <Col sm={3} className="answer-imageContainer" />
          <Col sm={6}>
            <h4 className="list-group-item-heading">Answer text</h4>
            <div>
              Pro: 13/53
            </div>
          </Col>
          <Col sm={3}>
            <Button
              bsSize="small"
              className="pull-right"
              disabled
              title="Už jsi hlasoval"
              icon="thumbs-up"
              onClick={() => {}}
            >Hlasovat</Button>
          </Col>
        </Row>
      </li>
    );
  });
  it('renders as loading', () => {
    expect(shallow(
      <SurveyAnswer
        id={132}
        loading
        onVote={() => {}}
        text="Answer text"
        votes={13}
        votesTotal={53}
      />
    ).node).to.eql(
      <li className="list-group-item">
        <Row>
          <Col sm={3} className="answer-imageContainer" />
          <Col sm={6}>
            <h4 className="list-group-item-heading">Answer text</h4>
            <div>
              Pro: 13/53
            </div>
          </Col>
          <Col sm={3}>
            <Button
              bsSize="small"
              className="pull-right"
              icon="thumbs-up"
              loading
              onClick={() => {}}
              title={null}
            >Hlasovat</Button>
          </Col>
        </Row>
      </li>
    );
  });
  it('renders as closed', () => {
    expect(shallow(
      <SurveyAnswer
        closed
        id={132}
        onVote={() => {}}
        text="Answer text"
        votes={13}
        votesTotal={53}
      />
    ).node).to.eql(
      <li className="list-group-item">
        <Row>
          <Col sm={3} className="answer-imageContainer" />
          <Col sm={6}>
            <h4 className="list-group-item-heading">Answer text</h4>
            <div>
              Pro: 13/53
            </div>
          </Col>
          <Col sm={3} />
        </Row>
      </li>
    );
  });
  it('triggers onVote on button click', () => {
    const voteSpy = sinon.spy();
    const comp = shallow(
      <SurveyAnswer
        id={132}
        loading
        onVote={voteSpy}
        text="Answer text"
        votes={13}
        votesTotal={53}
      />
    );

    comp.find(Button).simulate('click');
    expect(voteSpy.args).to.eql([
      [132],
    ]);
  });
});
