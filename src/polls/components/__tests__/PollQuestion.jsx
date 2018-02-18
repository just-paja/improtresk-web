import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import PollQuestions from '../PollQuestion';

describe('PollQuestions component', () => {
  it('renders question text', () => {
    const comp = shallow(
      <PollQuestions
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
        translate={msg => msg}
        votes={54}
      />
    );
    expect(comp.find({
      children: 'Why does Yoda speak so wierd?',
    })).toHaveLength(1);
  });

  it('renders answer', () => {
    const comp = shallow(
      <PollQuestions
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
        ]}
        id={65}
        onVote={() => {}}
        question="Why does Yoda speak so wierd?"
        translate={msg => msg}
        votes={54}
      />
    );
    expect(comp.find('PollAnswer').props()).toMatchObject({
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
      votes: 53,
      votesTotal: 54,
    });
  });

  it('renders answer as voted', () => {
    const comp = shallow(
      <PollQuestions
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
        translate={msg => msg}
        votes={54}
        voted
      />
    );
    expect(comp.find('PollAnswer')).toHaveProp('disabled', true);
  });

  it('renders answer as loading', () => {
    const comp = shallow(
      <PollQuestions
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
        translate={msg => msg}
        votes={54}
      />
    );
    expect(comp.find('PollAnswer')).toHaveProp('loading', true);
  });

  it('renders poll closed', () => {
    const comp = shallow(
      <PollQuestions
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
        translate={msg => msg}
        votes={54}
      />
    );
    expect(comp.find('PollAnswer')).toHaveProp('closed', true);
  });

  it('triggers onVote on answer vote', () => {
    const voteSpy = sinon.spy();
    const comp = shallow(
      <PollQuestions
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
        translate={msg => msg}
        votes={54}
      />
    );
    comp.find('PollAnswer').simulate('vote', 687);
    expect(voteSpy.args).toEqual([
      [65, 687],
    ]);
  });
});
