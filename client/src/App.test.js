import { render, screen } from '@testing-library/react';
import Enzyme, {shallow} from 'enzyme';
import nock from 'nock';
import waitUntil from 'async-wait-until';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

import CelestialBodies from './CelestialBodies'
// was attempting to build out a test using nock. Got an error I couldn't fix
describe('<CelestialBodies />', () => {
  beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() });
  nock.enableNetConnect('127.0.0.1')
  nock.enableNetConnect('localhost')
  const scope = nock('localhost:3001/api')
      .get('/bodies')
      .reply(200, [{Name: "Sun", ImgUrl: "/img/TheSun.jpg", Age: "4.603 billion years", SolarMass: "1000000"}])
      console.log(`ACTIVE ${scope.activeMocks()}`)
  })
  it('Does a thing with the nock', async () => {
    const root = shallow(<CelestialBodies />)

    await waitUntil(() => root.state('isLoaded') === true);

    // done();
  })
})
