import Lightbox from 'react-images';
import React from 'react';
import ReactGallery from 'react-photo-gallery';
import sinon from 'sinon';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Gallery from '../../../src/web/components/gallery';

describe('Gallery component', () => {
  it('renders React Gallery', () => {
    expect(shallow(
      <Gallery
        photos={[
          {
            image: 'http://example.com/test1.jpg',
            caption: 'foo',
            height: 200,
            width: 400,
          },
          {
            image: 'http://example.com/test2.jpg',
            height: 400,
            width: 200,
          },
        ]}
      />
    ).node).to.eql(
      <div>
        <ReactGallery
          photos={[
            {
              src: 'http://example.com/test1.jpg',
              caption: 'foo',
              height: 200,
              width: 400,
              aspectRatio: 2,
            },
            {
              src: 'http://example.com/test2.jpg',
              caption: undefined,
              height: 400,
              width: 200,
              aspectRatio: 1 / 2,
            },
          ]}
        />
        <Lightbox
          images={[
            {
              src: 'http://example.com/test1.jpg',
              caption: 'foo',
              height: 200,
              width: 400,
              aspectRatio: 2,
            },
            {
              src: 'http://example.com/test2.jpg',
              caption: undefined,
              height: 400,
              width: 200,
              aspectRatio: 1 / 2,
            },
          ]}
          backdropClosesModal
          onClose={() => {}}
          onClickPrev={() => {}}
          onClickNext={() => {}}
          currentImage={undefined}
          isOpen={false}
        />
      </div>
    );
  });
  it('opens lightbox on image click', () => {
    const preventDefaultSpy = sinon.spy();
    const comp = shallow(
      <Gallery
        photos={[
          {
            image: 'http://example.com/test1.jpg',
            height: 200,
            width: 400,
          },
        ]}
      />
    );

    comp.find(ReactGallery).simulate('clickPhoto', 0, {
      preventDefault: preventDefaultSpy,
    });
    expect(comp.state()).to.eql({
      lightbox: true,
      image: 0,
    });
    expect(preventDefaultSpy.calledOnce).to.equal(true);
  });
  it('closes lightbox on close', () => {
    const comp = shallow(<Gallery photos={[]} />);
    comp.setState({ lightbox: true });
    comp.find(Lightbox).simulate('close');
    expect(comp.state()).to.eql({ lightbox: false });
  });
  it('goes next on nextclick', () => {
    const comp = shallow(<Gallery photos={[]} />);
    comp.setState({ lightbox: true, image: 1 });
    comp.find(Lightbox).simulate('clickNext');
    expect(comp.state()).to.eql({ lightbox: true, image: 2 });
  });
  it('goes prev on prev click', () => {
    const comp = shallow(<Gallery photos={[]} />);
    comp.setState({ lightbox: true, image: 1 });
    comp.find(Lightbox).simulate('clickPrev');
    expect(comp.state()).to.eql({ lightbox: true, image: 0 });
  });
});
