import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../image/rob.png';

import FourZeroFourStyleWrapper from './404.style';

export default class extends Component {
    render() {
        return <FourZeroFourStyleWrapper className="iso404Page">
            <div className="iso404Content">
              <h1>404</h1>
              <h3>Looks like you got lost</h3>
              <p>
                The page youre looking for doesnt exist or has been
                moved.
              </p>
              <button type="button">
                <Link to="/manager/products">
                  Back home
                </Link>
              </button>
            </div>

            <div className="iso404Artwork">
              <img alt="#" src={Image} />
            </div>
          </FourZeroFourStyleWrapper>;
    }
}
