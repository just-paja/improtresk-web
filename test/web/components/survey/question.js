import ListGroup from 'react-bootstrap/lib/ListGroup';
import React from 'react';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import SurveyAnswer from '../../../../src/web/components/survey/answer';
import SurveyQuestion from '../../../../src/web/components/survey/question';

describe('SurveyQuestion component', () => {
  it('renders', () => {
    expect(shallow(
      <SurveyQuestion
        answers={[
          {
            answerCount: 53,
            id: 132,
            image: 'http://example.com/image.png',
            text: 'Answer one',
            description: 'Answer one description',
            links: [
              {
                address: 'http://example.com',
                service: 'web',
                name: 'Example link',
              },
            ],
          },
          {
            answerCount: 1,
            id: 687,
            text: 'Answer two',
          },
        ]}
        id={65}
        onVote={() => {}}
        question="Why does Yoda speak so wierd?"
        votes={54}
      />
    ).node).to.eql(
      <div>
        <h3>Why does Yoda speak so wierd?</h3>
        <ListGroup>
          <SurveyAnswer
            description="Answer one description"
            id={132}
            image="http://example.com/image.png"
            links={[
              {
                address: 'http://example.com',
                service: 'web',
                name: 'Example link',
              },
            ]}
            onVote={() => {}}
            text="Answer one"
            votes={53}
            votesTotal={54}
          />
          <SurveyAnswer
            id={687}
            onVote={() => {}}
            text="Answer two"
            votes={1}
            votesTotal={54}
          />
        </ListGroup>
      </div>
    );
  });
  it('renders as voted', () => {
    expect(shallow(
      <SurveyQuestion
        answers={[
          {
            answerCount: 1,
            id: 687,
            text: 'Answer two',
          },
        ]}
        id={65}
        onVote={() => {}}
        question="Why does Yoda speak so wierd?"
        votes={54}
        voted
      />
    ).node).to.eql(
      <div>
        <h3>Why does Yoda speak so wierd?</h3>
        <ListGroup>
          <SurveyAnswer
            disabled
            id={687}
            onVote={() => {}}
            text="Answer two"
            votes={1}
            votesTotal={54}
          />
        </ListGroup>
      </div>
    );
  });
  it('renders as loading', () => {
    expect(shallow(
      <SurveyQuestion
        answers={[
          {
            answerCount: 1,
            id: 687,
            text: 'Answer two',
          },
        ]}
        id={65}
        loading
        onVote={() => {}}
        question="Why does Yoda speak so wierd?"
        votes={54}
      />
    ).node).to.eql(
      <div>
        <h3>Why does Yoda speak so wierd?</h3>
        <ListGroup>
          <SurveyAnswer
            loading
            id={687}
            onVote={() => {}}
            text="Answer two"
            votes={1}
            votesTotal={54}
          />
        </ListGroup>
      </div>
    );
  });
  it('renders as closed', () => {
    expect(shallow(
      <SurveyQuestion
        answers={[
          {
            answerCount: 1,
            id: 687,
            text: 'Answer two',
          },
        ]}
        closed
        id={65}
        onVote={() => {}}
        question="Why does Yoda speak so wierd?"
        votes={54}
      />
    ).node).to.eql(
      <div>
        <h3>Why does Yoda speak so wierd?</h3>
        <ListGroup>
          <SurveyAnswer
            closed
            id={687}
            onVote={() => {}}
            text="Answer two"
            votes={1}
            votesTotal={54}
          />
        </ListGroup>
      </div>
    );
  });
  it('triggers onVote on answer vote', () => {
    const voteSpy = sinon.spy();
    const comp = shallow(
      <SurveyQuestion
        answers={[
          {
            answerCount: 1,
            id: 687,
            text: 'Answer two',
          },
        ]}
        id={65}
        loading
        onVote={voteSpy}
        question="Why does Yoda speak so wierd?"
        votes={54}
      />
    );

    comp.find(SurveyAnswer).simulate('vote', 687);
    expect(voteSpy.args).to.eql([
      [65, 687],
    ]);
  });
});
