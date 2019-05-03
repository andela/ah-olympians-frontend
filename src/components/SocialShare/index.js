import React from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  EmailShareButton,
  TwitterShareButton,
  FacebookIcon,
  EmailIcon,
  TwitterIcon,
} from 'react-share';
import './social.scss';

const SocialShare = ({ slug, title }) => (
  <div>
    <div>
      <TwitterShareButton
        url={`https://ah-olympians.herokuapp.com/article/${slug}`}
        quote={title}
        windowWidth={750}
        windowHeight={600}
        className="social"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
    <div>
      <FacebookShareButton
        url={`https://ah-olympians.herokuapp.com/article/${slug}`}
        quote={title}
        windowWidth={750}
        windowHeight={600}
        className="social"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
    </div>
    <div>
      <EmailShareButton
        windowWidth={750}
        windowHeight={600}
        url={`https://ah-olympians.herokuapp.com/article/${slug}`}
        quote={title}
        className="social"
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  </div>
);

export default SocialShare;

SocialShare.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
