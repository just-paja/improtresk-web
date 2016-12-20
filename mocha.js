import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiJsx from 'jsx-chai';

import './src/server/mainCss';

chai.use(chaiHttp);
chai.use(chaiJsx);
