import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJsx from 'jsx-chai';
import cssHook from 'css-modules-require-hook';

cssHook({
  generateScopedName: '[name]-[local]',
});

chai.use(chaiHttp);
chai.use(chaiJsx);
