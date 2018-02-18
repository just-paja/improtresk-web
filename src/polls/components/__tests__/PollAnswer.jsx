import React from 'react';
import sinon from 'sinon';

import { shallow } from 'enzyme';

import PollAnswer from '../PollAnswer';

describe('PollAnswer component', () => {
  it('renders image header when given image', () => {
    const comp = shallow(
      <PollAnswer
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
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('ImageHeader')).toHaveProp('image', 'http://example.com/image.png');
  });

  it('renders without image header when given no image', () => {
    const comp = shallow(
      <PollAnswer
        id={132}
        description="Answer description"
        links={[
          {
            address: 'http://example.com',
            service: 'web',
            name: 'Example link',
          },
        ]}
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('ImageHeader')).toHaveLength(0);
  });

  it('renders answer text', () => {
    const comp = shallow(
      <PollAnswer
        id={132}
        description="Answer description"
        links={[
          {
            address: 'http://example.com',
            service: 'web',
            name: 'Example link',
          },
        ]}
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find({ children: 'Answer text' })).toHaveLength(1);
  });

  it('renders service links when given', () => {
    const comp = shallow(
      <PollAnswer
        id={132}
        description="Answer description"
        links={[
          {
            address: 'http://example.com',
            service: 'web',
            name: 'Example link',
          },
        ]}
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('LinkServiceList')).toHaveProp('links', [
      {
        address: 'http://example.com',
        service: 'web',
        name: 'Example link',
      },
    ]);
  });

  it('renders without service links when not available', () => {
    const comp = shallow(
      <PollAnswer
        id={132}
        description="Answer description"
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('LinkServiceList')).toHaveLength(0);
  });

  it('renders answer score', () => {
    const comp = shallow(
      <PollAnswer
        id={132}
        description="Answer description"
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('.score')).toIncludeText('13/53');
  });

  it('renders vote button given the poll is open', () => {
    const comp = shallow(
      <PollAnswer
        id={132}
        description="Answer description"
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('Button').children()).toIncludeText('polls.vote');
  });

  it('renders without vote button when the poll is closed', () => {
    const comp = shallow(
      <PollAnswer
        closed
        description="Answer description"
        id={132}
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('Button')).toHaveLength(0);
  });

  it('renders markdown description when provided', () => {
    const comp = shallow(
      <PollAnswer
        closed
        description="Answer description"
        id={132}
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('ReactMarkdown')).toHaveProp('source', 'Answer description');
  });

  it('renders without markdown description when missing', () => {
    const comp = shallow(
      <PollAnswer
        closed
        id={132}
        onVote={() => {}}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    expect(comp.find('ReactMarkdown')).toHaveLength(0);
  });

  it('triggers onVote on button click', () => {
    const voteSpy = sinon.spy();
    const comp = shallow(
      <PollAnswer
        id={132}
        loading
        onVote={voteSpy}
        text="Answer text"
        translate={msg => msg}
        votes={13}
        votesTotal={53}
      />
    );
    comp.find('Button').simulate('click');
    expect(voteSpy.args).toEqual([
      [132],
    ]);
  });
});
