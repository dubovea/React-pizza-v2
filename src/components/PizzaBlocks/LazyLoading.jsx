import React from 'react';
import ContentLoader from 'react-content-loader';

const LazyLoading = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="135" cy="128" r="130" />
    <rect x="-3" y="276" rx="10" ry="10" width="280" height="29" />
    <rect x="-1" y="321" rx="10" ry="10" width="280" height="88" />
    <rect x="2" y="424" rx="15" ry="15" width="104" height="38" />
    <rect x="121" y="420" rx="30" ry="30" width="157" height="50" />
  </ContentLoader>
);

export default LazyLoading;
